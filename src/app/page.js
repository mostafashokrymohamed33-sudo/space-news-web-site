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
  useEffect(()=>{
    filtringNews()
    fetch("/api/news").then(res=>res.json())
    .then(data=>{
      console.log(JSON.stringify(data.articles))
    })
  },[])
  const cardsRef=useRef([])
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
    <div className="intro">
      <div>welcome</div>
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
      <div className="side">
        <button onClick={()=>filtringNews()}>all </button>
        <button onClick={()=>filtringNews(0)}>NASA</button>
        <button onClick={()=>filtringNews(1)}>SOLAR SYSTEM</button>
        <button onClick={()=>filtringNews(2)}>COSMOS</button>
        <button onClick={()=>filtringNews(3)}>BLACK HOLES</button>
      </div>
    </div>
    <Back/>
    <div className="filter">
    </div>
    </>
  );
}
