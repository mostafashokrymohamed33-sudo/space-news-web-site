'use client'
import { useEffect, useState } from "react"
export default function Neo(){
    const KEY = `VFagih4RXPlVmIfiHJha0LCZL25hdQJfjcwziul2`;
    const [neoID,setNeoId]=useState(3542519);
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=2024-01-01&end_date=2024-01-07&api_key=${KEY}`;
    const [dataa,setdataa]=useState({});
    const [cards,setcards]=useState([]);
    useEffect(()=>{
            console.log("fetching news")
            fetch(url)
            .then(res=>res.json())
            .then(data=>{
                Object.entries(data.near_earth_objects).forEach(([Key,Value])=>{
                    setcards(prevCards=>[...prevCards,...Value])
                })
                setdataa(data)
            }) 
    },[])
    useEffect(()=>{
        if(! dataa.element_count) return
        console.log(cards)
    },[dataa])
    return <div className="neo-page">
        <h1>Near Earth Objects</h1>

        <div className="intro">
            <p>Near Earth Objects (NEOs) are asteroids and comets that have orbits that bring them close to Earth's orbit. They are of great interest to scientists and space agencies because they can provide valuable information about the early solar system and the potential for future space exploration. NEOs can also pose a threat to Earth if they were to collide with our planet, which is why monitoring and studying them is important for planetary defense.</p>   
        </div>  
        <div className="inputs">
            <label htmlFor="">start date</label>
            <input type="date" placeholder="ok"/>
            <label htmlFor="">end date</label>
            <input type="date" placeholder="ok"/>
        </div>
        <div style={{fontSize:"300%"}}>
           {dataa?.element_count} Neos founded;
        </div>
        <table >
            <thead>
                <tr>
                        <td>NEO Name</td>
                        <td>Absolute Magnitude</td>
                        <td>MAX Diameter (km)</td>
                        <td>MIN Diameter (km)</td>
                        <td>Is Potentially Hazardous</td>
                </tr>
            </thead>
            <tbody>
                {
                    cards?.map((item,i)=>{
                        return <tr key={i}>
                                    <td>NEO Name</td>
                                    <td>Absolute Magnitude</td>
                                    <td>MAX Diameter (km)</td>
                                    <td>MIN Diameter (km)</td>
                                    <td>Is Potentially Hazardous</td>
                            </tr>
                    })
                }
            </tbody>
        </table>  
    </div>
}