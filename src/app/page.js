'use client'
import { useEffect, useRef, useState } from "react"
import Back from "./components/Back";
import Assets from "./assets";
export default function Home() {

  const [news,setNews]=useState([]);
  function filtringNews(num){
    if(isNaN(num)){
      for(let arry of Assets){
        setNews(prev=>[...prev,...arry])
      }
    }else{
      setNews(Assets[num])
    }
  }
  const cardsRef=useRef([])
  useEffect(()=>{
    filtringNews()
  },[])
  useEffect(()=>{
    const observer = new IntersectionObserver((entries)=>{
        entries.forEach((intry)=>{
            if (intry.isIntersecting){
              intry.target.classList.add("show")
            }
          })
        },{threshold:0.3}
   )
   cardsRef.current.forEach((card)=>{
    if(card) observer.observe(card)
   })
   return ()=>observer.disconnect()
  },[news])


  return (
    <>
    <div className="inrto">
    </div>
    <div className="news">
      <div className="main">
        {news?.map((item,i)=>{
          return <div
           ref={(el)=>(cardsRef.current[i]=el)}
           key={i} className="card ops"
           >
            <a href={item.url}>{item.source.name}</a>
            <div className="title">{item.title}.</div>
            <div className="content" style={{backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.22),rgb(0, 0, 0)),url(${item.image})`}}>{item.content}...</div>
          </div>
        })}
      </div>
      <div className="side"></div>
    </div>
    <Back/>
    <div className="filter">
    </div>
    </>
  );
}
