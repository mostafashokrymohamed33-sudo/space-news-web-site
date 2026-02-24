'use client'
import { useEffect, useState } from "react"
import Back from "./components/Back";
export default function Home() {
  const [news,setNews]=useState([]);
  useEffect(()=>{
    fetch("/api/news")
    .then(res=>res.json())
    .then(res=>{console.log(res.articles);setNews(res.articles)})
  },[])

  return (
    <>
    <div className="inrto"></div>
    <div className="news">
      <div className="main">
        {news?.map((item,i)=>{
          return <div key={i} className="card">
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
