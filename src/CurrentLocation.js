import React, { Component } from 'react'
import { base, key } from './apikeys';
import SearchCity from './SearchCity';
import locationLogo from './assets/locationLogo.jpg'
import cloudy from './assets/cloudy.jpg'
import sunny from './assets/sunnyLogo.png'
import wind from './assets/wind.jpg'
import rain from './assets/rain.jpg'
import snow from './assets/snow.png'
import sunCloud from './assets/sun_clouds.png'
import './Currentlocation.css'

const dateBuilder = (d) => {
    const option = {year:"numeric",month:"long",day:"numeric"}
    const date = d.toLocaleDateString("en-GB",option)
    return date
  };

const dayBuilder = (d) =>{
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
    let day = days[d.getDay()];
    // let date = d.getDate();
    // let month = months[d.getMonth()];
    // let year = d.getFullYear();
    return day
  }

  const dayBuilder1 = (d) =>{
    let days = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thur",
        "Fri",
        "Sat",
      ];
    
    let current_day = d.getDay()
    let nextDayIndex
    let fiveDays = []
    fiveDays.push(days[current_day])
    for(let i=1; i<7;i++){
      nextDayIndex= (current_day+i)%7
      fiveDays.push(days[nextDayIndex])
    }
    
    return fiveDays
  }

 class currentlocation extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        lat: undefined,
        lon: undefined,
        temperatureC: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        sunrise: undefined,
        sunset: undefined,
        weatherLogo: undefined,
        main:undefined,
        visibility:undefined,
        windSpeed:undefined,
        seaLevel:undefined,
        weatherData:[],
        searchCityData:null,
        loading:true
      };
    }

    componentDidMount() {
        if(navigator.geolocation){
            this.getPosition()
            .then((position)=>{
                this.getWeather(position.coords.latitude, position.coords.longitude)
            })
            .catch((err)=>{
                this.getWeather(28.67, 77.22)
               alert("You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather.") 
            })
            }
        else{
            alert("Geolocation not not supported by your browser")
        }
    }  
        
    getPosition = (options) =>{
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject, options);
          });        
    }

    getWeather = async(lat,lon) =>{
      try{
        const api_call = await fetch(`${base}forecast?lat=${lat}&lon=${lon}&appid=${key}`)
        const data = await api_call.json()
        console.log(data)
  
        this.setState(
            {
                lat: lat,
                lon: lon,
                city: data.city.name,
                country: data.city.country,
                temperatureC: Math.round((data.list[0].main.temp)-273.15 ),
                humidity: data.list[0].main.humidity,
                main: data.list[0].weather[0].main,
                visibility: data.list[0].visibility,
                windSpeed: data.list[0].wind.speed,
                seaLevel: data.list[0].main.sea_level,
                weatherData: data,
                loading:false,
              })  

          if(!data){
            throw new Error(`HTTP error! Status ${data.status}`)
          }
      }catch(error){
        this.setState({
          loading:false
        })
      }
     
     }      
   
  render() {
 
    const {weatherData} = this.state
    const temperature = weatherData.list?.slice(0,6).map(item => item.main.temp) || []
   
    const mainValues = () =>{
      const mainValues =    Array.isArray(weatherData.list)?
      weatherData.list?.slice(0,6).reduce((acc,item)=>{
        if(item.weather && Array.isArray(item.weather)){
          const keys = item.weather.map(innerItem => innerItem.main)
          return acc.concat(keys)
        }
        return acc
      },[]): []
      return mainValues
      } 

      const descriptionValues = () =>{
        const mainValues =    Array.isArray(weatherData.list)?
        weatherData.list?.slice(0,6).reduce((acc,item)=>{
          if(item.weather && Array.isArray(item.weather)){
            const keys = item.weather.map(innerItem => innerItem.description)
            return acc.concat(keys)
          }
          return acc
        },[]): []
        return mainValues
        } 

    // Array.isArray checks if weatherData is array or not, if its not array it will be assigned to empty array.
    //If it is an array, it will take first 5 values of weatherData.list and reduce it to single array.
    //First it will check if item.weather is present and it is an array, it will map item.weather.
    //Each item in item.weather is mapped to innerItem.main.
    //Finally the that value is assigned to keys and is concatenated with acc where acc initially is emptry array.

      let weatherLogo;   
      const weatherLogoFind = (item) =>{
          if(item === "Clouds"){
            weatherLogo = cloudy
            return weatherLogo 
          }
          else if(item === "Wind"){
            weatherLogo = wind
            return weatherLogo 
          }
          else if(item === "Rain"){
            weatherLogo = rain
            return weatherLogo 
          }
          else if(item === "Snow"){
            weatherLogo = snow
            return weatherLogo 
          }
          else{
            weatherLogo = sunny
            return weatherLogo 
          }  
    }    
   
    return (
      <div className='container'>
      {this.state.loading ? 
      <>
      <div className='loader-container'>
        <img src={sunCloud} className='loader-img' alt='weather loading' style={{width:'200px',height:'200px'}}></img>
        <div className='loader'></div>
      </div>
      </>
      :
      <>
          <div className='left-container'>
          <div className='left-top'>
            <div className='day'>{dayBuilder(new Date())}</div>
            <div className='date-loca'>
            <div className='date'> {dateBuilder(new Date())}</div>
            <div className='location '>
              <img src={locationLogo} alt="location-logo" style={{width:'35px',height:'35px'}}></img>
              <div>{this.state.city}, {this.state.country}</div>              
            </div>
            </div>       
          </div>
          
          <div className='left-bottom'>
            <div className='weatherTypelogo'>
              <img src={weatherLogoFind(this.state.main)} alt='weatherLogo' style={{width:'75px',height:'75px'}} className='invert-logo'></img>
              <div >{this.state.main}</div>  
            </div>
            <div className='temp'>{this.state.temperatureC}°C</div>      
        </div>

          </div>          
        <div className='right-container'>
          <SearchCity></SearchCity>
          
          <div className='right-bottom'>        
              {temperature.map((temp,index)=>                     
                  (<div className='weekcontainer'>
                        <img src={weatherLogoFind(mainValues()[index])} alt='weatherLogo'  className='invert-logo images'></img>

                        {/* mainValues() function returns the array of main like ['clouds','rain']
                        mainValues()[index] gives the value at that particular index like 'clouds'
                        weatherLogoFind() function returns the logo name based on the value passed i.e,clouds */}

                        <li key={index}>{Math.round(temp-273.15)} °C</li>
                        <li key={index} className='description'>{descriptionValues()[index]}</li>
                        <li>{dayBuilder1(new Date())[index]}</li>
                    </div>                  
                ))}              
          </div>
        </div>        
   </> 
      }
       </div>
    )

  }}
export default currentlocation