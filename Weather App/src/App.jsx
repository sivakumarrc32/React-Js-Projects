import './App.css'
import PropsTypes from "prop-types";
import searchIcon from "./assets/search.png";
import clearIcon from "./assets/DayIcon/1d.png";
import clearNightIcon from "./assets/NightIcon/1n.png";
import fewcloudsIcon from "./assets/DayIcon/2d.png";
import fewcloudsNightIcon from "./assets/NightIcon/2n.png";
import scatteredIcon from "./assets/DayIcon/3d.png";
import scatteredNightIcon from "./assets/NightIcon/3n.png";
import brokenIcon from "./assets/DayIcon/4d.png";
import brokenNightIcon from "./assets/NightIcon/4n.png";
import showerrainIcon from "./assets/DayIcon/9d.png";
import showerrainNightIcon from "./assets/NightIcon/9n.png";
import rainIcon from "./assets/DayIcon/10d.png";
import rainINightcon from "./assets/NightIcon/10n.png";
import thunderIcon from "./assets/DayIcon/11d.png";
import thunderNightIcon from "./assets/NightIcon/11n.png";
import windIcon from "./assets/wind.png";
import snowIcon from "./assets/DayIcon/13d.png";
import snowNightIcon from "./assets/NightIcon/13n.png";
import humidityIcon from "./assets/humidity.png";
import mistIcon from "./assets/50.png";
import { useEffect, useState } from 'react';


const WeatherDetails = ({icon,temp,city,country,lat,log,humidity,speed}) => {
  return(
    <>
      <div className="image">
        <img src={icon} alt="" className='icon'/>
      </div>
      <div className="temp">{temp}°C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className='lat'>Latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className='log'>Longitude</span>
          <span>{log}</span>
          </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="humidity" className='icons img'/>
          <div className="data">
            <div className="humidity-percent">{humidity} %</div>
            <div className="txt">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windIcon} alt="" className='icons img'/>
          <div className="data">
            <div className="wind-percent">{speed} km/h</div>
            <div className="txt">Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  )
}

WeatherDetails.propsTypes ={
  icon :PropsTypes.string.isRequired,
  temp:PropsTypes.number.isRequired,
  city:PropsTypes.string.isRequired,
  country:PropsTypes.string.isRequired,
  humidity:PropsTypes.number.isRequired,
  wind:PropsTypes.number.isRequired,
  lat:PropsTypes.number.isRequired,
  log:PropsTypes.number.isRequired,


};



function App() {
  let api_key = "3a61fb93a371a70ad1670d5d89d43fbf";

  const [text,setText] = useState("madurai");

  const [icon,setIcon]=useState();
  const [temp,setTemp]=useState(0);
  const [city,setCity]=useState("");
  const [country,setCountry]=useState("IN");
  const [lat,setLat]=useState(0);
  const [log,setLog]=useState(0);
  const [humidity,setHumidity]=useState(0);
  const [speed,setSpeed]=useState(0);
  
  const [cityNotFound,setCityNotFound]=useState(false);
  const [loading,setloading]=useState(false);
  const [error,setError]=useState(null);

  const weatherIconMap ={
    "01d": clearIcon,
    "01n": clearNightIcon,
    "02d": fewcloudsIcon,
    "02n": fewcloudsNightIcon,
    "03d": scatteredIcon,
    "03n": scatteredNightIcon,
    "04d": brokenIcon,
    "04n": brokenNightIcon,
    "09d": showerrainIcon,
    "09n": showerrainNightIcon,
    "10d": rainIcon,
    "10n": rainINightcon,
    "11d": thunderIcon,
    "11n": thunderNightIcon,
    "13d": snowIcon,
    "13n": snowNightIcon,
    "50d": mistIcon,
    "50n": mistIcon,
  };

  const search=async()=>{
    setloading(true);
    let url =`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

    try{
      let res = await fetch(url);
      let data = await res.json();
      console.log(data)
      if(data.cod === "404"){
        console.error("City Not Found");
        setCityNotFound(true);
        setloading(false);
        return;
      }
      setHumidity(data.main.humidity);
      setSpeed(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcon);
      setCityNotFound(false);

    }catch(error)
    {
      console.error("An Error Occurred :",error.message);
      setError("Error Ocurred while fetching Data");
    }finally{
      setloading(false);
    }
  }

  const handleCity = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown =(e) =>{
    if(e.key == "Enter"){
      search();
    }
  }

  useEffect(function(){
    search();
  },[])

  return(
    <>
      <div className="container">
        <div className="input-container">
          <input type="text" className='cityInput' placeholder='Search City' onChange={handleCity} value={text} onKeyDown={handleKeyDown} />
          <div className="search-icon">
            <img src={searchIcon} alt="" className='searchIcon' onClick={() => search()} />
          </div>
        </div>
        
        {loading && <div className="loading-message">Loading...</div>}
        {error && <div className="error-message">{error}</div>}
        {cityNotFound && <div className="city-not-found">City Not Found</div>}

        {!loading && !cityNotFound && <WeatherDetails  icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} speed={speed} />}

        <p className="copyright">
          &copy; Designed By <span>Sivakumar</span>
        </p>
      </div>
    </>
  )
}

export default App
