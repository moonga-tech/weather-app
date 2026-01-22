import { useState, useEffect } from "react";

import "animate.css"
import Footer from "../components/footer";
import WeatherDisplay from "../components/weatherDisplay";
import swal from "sweetalert";

export default function Index() {
  
  /* save data input */
  const [search, setSearch] = useState("");

  /* fetched data for weather */
  const [weather, setWeather] = useState("");

  /* fetched data for forecast weather */
  const [forecast, setForecast] = useState("");

  /* fetched data for geolocation */
  const [geoTime, setGeoTime] = useState("");

  /* window.load */
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/');
      });
    }
  },[])

  /* Load saved weather data from localStorage on mount */
  useEffect(() => {
    const savedData = localStorage.getItem('weatherData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setSearch(parsedData.search || "");
        setWeather(parsedData.weather || "");
        setForecast(parsedData.forecast || "");
        setGeoTime(parsedData.geoTime || "");
      } catch (err) {
        console.error("Error loading saved weather data:", err);
      }
    }
  }, [])

  /* API Keys */
  const apis = {

    /* Openweathermap API key */
    weatherKey: process.env.API_KEY_OWM,
    weatherURL: "https://api.openweathermap.org/data/2.5",

    /* Geolocation API key */
    geoKey: process.env.API_KEY_A,
    geoTime: "https://timezone.abstractapi.com/v1/current_time/?api_key="

  }

  /* click to search for weather location */
  const searchPressed = () => {
    /* if search field is empty */
    if(search == "") {
      swal("Empty Field", "Enter a City or Town" ,"warning")
    } else {
      let weatherData = null;
      let forecastData = null;
      let geoTimeData = null;

      const saveToStorage = () => {
        if (weatherData && forecastData && geoTimeData) {
          localStorage.setItem('weatherData', JSON.stringify({
            search: search,
            weather: weatherData,
            forecast: forecastData,
            geoTime: geoTimeData
          }));
        }
      };

      /* fetch weather data */
      fetch(`${apis.weatherURL}/weather?q=${search}&units=metric&appid=${apis.weatherKey}`).then(response => response.json()).then(responseData => {
        setWeather(responseData);
        weatherData = responseData;
        saveToStorage();
      }).catch(err => swal( "Oops" ,  "Something went wrong! - Check Your Internet Connection" ,  "error" ));
      
      /* fetch forecast weather */
      fetch(`${apis.weatherURL}/forecast?q=${search}&lat=33.44&lon=-94.04&exclude=current,hourly,minutely,daily&units=metric&appid=${apis.weatherKey}`).then(forecast => forecast.json()).then(data => {
        setForecast(data);
        forecastData = data;
        saveToStorage();
      });

      /* fetch geolocation */
      fetch(`${apis.geoTime}${apis.geoKey}&location=${search}`).then(response => response.json()).then(data => {
        setGeoTime(data);
        geoTimeData = data;
        saveToStorage();
      });
    }
  } 

  /* render DOM */
  return (
    <>
      <div className="App">
        {/* title */}
        <h1 className="text-5xl text-center text-white font-bold">
          <span>Zed Weather App</span>
        </h1>
        
        {/* form field to search for location */}
        <div className="search-form">
          <input type="text" className="search-input w-full rounded-md border-0 py-2 pl-4 pr-25 text-white ring-1 ring-gray-400 placeholder:text-gray-400 sm:text-sm sm:leading-6" placeholder="Enter City or Town" value={search} onChange={(e) => setSearch(e.target.value)}/>
          <button className="search-button px-10 font-semibold rounded-md border border-slate-200 text-white hover:bg-yellow-400 transition-all hover:text-slate-200 hover:border-yellow-400" type="submit" onClick={searchPressed}>Search</button>
        </div>
        
        {/* display weather data */}
        <WeatherDisplay weather={weather} geoTime={geoTime} forecast={forecast} search={search} />

        {/* footer */}
        <Footer />
      </div>
    </>
  );
}