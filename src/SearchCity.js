import React, { useEffect, useState } from 'react'
import { base, key } from './apikeys'
import './SearchCity.css'
import axios from 'axios'

function SearchCity() {

    const[city,setCity] = useState('')
    const[temperatureC,setTemperatureC] = useState(undefined)
    const[humidity,setHumidity]=useState(undefined)
    const[visibility,setVisisbility]=useState(undefined)
    const[windSpeed,setwindSpeed]=useState(undefined)
    const[seaLevel,setseaLevel]=useState(undefined)
    const[cityName,setCityName] = useState(undefined)
    const inputRef = React.createRef()

    // const searchTheCity = async(city) =>{
    //     const api_call = await fetch(`${base}weather?q=${city}&units=metric&APPID=${key}`)
    //     const res = await api_call.json()
    //         setTemperatureC(res.main.temp)
    //         setHumidity(res.main.humidity)
    //         setVisisbility(res.visibility)
    //         setwindSpeed(res.wind.speed)
    //         setseaLevel(res.main.sea_level)
    //         setCityName(res.name)     
    // }    
    const searchTheCity = (city) => {
        axios
          .get(`${base}weather?q=${city}&units=metric&APPID=${key}`)
          .then((response) => {
            const res = response.data
            console.log(res)
            setTemperatureC(res.main.temp)
            setHumidity(res.main.humidity)
            setVisisbility(res.visibility)
            setwindSpeed(res.wind.speed)
            setseaLevel(res.main.sea_level)
            setCityName(res.name) 
          })
          .catch((error) => {
            alert("City not found");
          });
      };

    useEffect(()=>{
        searchTheCity("Davangere")       
    },[])
    useEffect(()=>{
      inputRef.current.focus()
    })


  return (
    <div className='right-top'>
        <div className='input'>
          <input type="text" value={city} onChange={e => setCity(e.target.value)} 
          placeholder='Enter city name' className='inputarea' ref={inputRef}></input>
          <button onClick={()=>searchTheCity(city)} className='button'>Search</button>
        </div>

      <div className='weatherDetails'>
        <div className='title-container'>
          <div> City name </div>
          <div>  {cityName}</div>
          </div>
        <hr></hr> 
        <div className='title-container'>
          <div>Temperature</div>
          <div> {temperatureC} °C</div>
        </div>  
        <hr></hr> 
        <div className='title-container'>
          <div>Humidity</div>
          <div> {humidity} %</div>
        </div> 
        <hr></hr> 
        <div className='title-container'>
          <div >Visibility</div>
          <div> {visibility} Km</div>
        </div>
        <hr></hr> 
        <div className='title-container'>
          <div>Wind Speed</div>
          <div> {windSpeed} m/s</div>
        </div>
        <hr></hr> 
        <div className='title-container'>
          <div>Sea Level</div>
          <div>{seaLevel} hPa</div>
        </div>

      </div>  
        
    </div>
  )
}

export default SearchCity

