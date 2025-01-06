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
      
        <div className='titles'>
        <div className='title'> City name </div>
          <hr></hr>
          <div className='title'>Temperature</div>
          <hr></hr>
          <div className='title'>Humidity</div>
          <hr></hr>
          <div className='title'>Visibility</div>
          <hr></hr>
          <div className='title'>Wind Speed</div>
          <hr></hr> 
          <div className='title'>Sea Level</div>
        </div>
         <div className='values'>
          <div className='value'>  {cityName}</div>
         <hr></hr>
          <div className='value'> {temperatureC} °C</div>
          <hr></hr>
          <div className='value'> {humidity} %</div>
          <hr></hr>
          <div className='value'> {visibility} Km</div>
          <hr></hr>
          <div className='value'> {windSpeed} m/s</div>
          <hr></hr>
          <div className='value'>{seaLevel} hPa</div>
        </div>
          
        </div>     
    </div>
  )
}

export default SearchCity

