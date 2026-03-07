'use client'
import { use, useEffect, useState } from "react"
import test from'../test.json'

 
export default function eonet(){
    console.log(test)
    const [cards,setcards]=useState({})
    useEffect(()=>{
        setcards(test)
        fetch("https://eonet.gsfc.nasa.gov/api/v3/events?limit=30").then(res=>res.json())
        .then(data=>{
            if(data.retry_after)return
            console.log(JSON.stringify(data));setcards(data)
        })
        .catch(err=>{console.log(err)})
    },[])
    return <div className="eonet-page">
        <h1>
            {cards?cards.title:''}
        </h1>
        <h3>{cards?cards.description:''}</h3>
        {
            cards?.events?.map((item,i)=>{
                return <div key={i} className="card">
                    <div className="title">{item.title}</div>
                    <div className="description">{item.description}</div>
                    <div className="category">
                        {item.categories.map((cat,i)=>{
                            return <span key={i} className="cat">{cat.title}</span>
                        })}
                    </div>
                    <div className="link"><a href={item.link}>more</a></div>
                </div>
            })
        }
         
    </div>
}