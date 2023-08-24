import React,{useState} from 'react';
import axios from 'axios';

const App = () => {
    const [data,setData] = useState({});
    const [location,setLocation] =useState('');
    const loc = location;
    const API_KEY = '459372fa9fc1713078ef57ebb4dbf333';
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;
    
    const searchLocation = (event)=>{
        if(event.key==='Enter'){
            axios.get(url).then((response)=>{
                setData(response.data);
                console.log(response.data);
            
            })
            setLocation('')
            
        }
   
    }
  
    const speedfunc =() =>{
        const wind_speed = Math.floor((data.wind.speed*3600)/1000);
        return(
            <p className='bold'>{wind_speed} km/h</p>
        )
    }
  return (
    <div className="app">
        <div className="search">
            <input type="text" 
            value={location}
            onChange={event =>setLocation(event.target.value) }
            placeholder='Enter Location'
            onKeyDown={searchLocation}
            />
        </div>
        <div className="container">
            <div className="top">
                <div className="location">
                    <p>{data.name}</p>
                </div>
                <div className="temp">
                    {data.main ? <h1>{data.main.temp}&deg;C</h1>:null}
                </div>
                <div className="description">
                    {data.weather ? <p>{data.weather[0].main}</p> :null}
                </div>
            </div>
            <div className="bottom">
                <div className="feels">
                   {data.main ?  <p className='bold'>{data.main.feels_like}&deg;</p>:null}
                    <p>Feels Like</p>
                </div>
                <div className="humidity">
                    {data.main ? <p className='bold'>{data.main.humidity}%</p>:null}
                    <p>Humidity</p>
                </div>
                <div className="wind">
                   {data.wind? speedfunc():null}
                    <p>Wind Speed</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default App