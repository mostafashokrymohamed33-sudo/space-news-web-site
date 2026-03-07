'use client'

import { useEffect, useState } from "react"

export default function Slider(){
    const [cards,setCards]=useState([])
     const KEY = `VFagih4RXPlVmIfiHJha0LCZL25hdQJfjcwziul2`;
     const cardscounte=50;
    const url = `https://api.nasa.gov/planetary/apod?api_key=${KEY}&count=${cardscounte}`;
    useEffect(()=>{
        console.log("fetching news")
        fetch(url)
        .then(res=>res.json())
        .then(data=>{setCards(data)}) 
    },[])
    useEffect(()=>{
        console.log(cards)
    },[cards])
    return<>
     <div className="slider">
        {
            cards?.map((item,i)=>{
                return <div key={i} className="card" style={{backgroundImage:`linear-gradient(rgba(0, 0, 0,.9),rgba(0, 0, 0,.6)),url(${item.url})`}}>
                    <img src={item.url} alt="" />
                    <div className="title">{item.title}</div>
                    <div className="content">{item.explanation}</div>
                    <div>copy right</div>
                </div>
            })
        }
     </div>
    </>
}