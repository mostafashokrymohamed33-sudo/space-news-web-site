'use client'
import { useEffect, useRef, useState } from "react"
import Assets from "./assets";
import Slider from "./components/Slider";
import Back from "./components/Back";
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


  return (
    <div className="home-page">
      <div className="intro">
        <div>
          welcome 
        </div>
      </div>
      <Slider/>
    </div>
  );
}
