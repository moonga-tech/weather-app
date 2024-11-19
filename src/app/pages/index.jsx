'use client'

import { useState } from "react";
import "animate.css"
import weatherFore from '../data.json'
import Footer from "../components/footer";
import WeatherDisplay from "../components/weatherDisplay";
import swal from "sweetalert";

import axios from 'axios';


export default function Index() {

  /* API Keys */

  const apis = {

    /* Openweathermap API key */
    weatherKey: "36f1ce1a3346eec15332db285205290f",
    weatherURL: "https://api.openweathermap.org/data/2.5",

    /* Geolocation API key */
    geoKey: "a4aa95c76cc64611a49a3b792fad417d",
    geoTime: "https://timezone.abstractapi.com/v1/current_time/?api_key="

  }

  /* save data input */
  const [search, setSearch] = useState("");

  /* fetched data for weather */
  const [weather, setWeather] = useState("");

  /* fetched data for forecast weather */
  const [forecast, setForecast] = useState("")

  /* fetched data for geolocation */
  const [geoTime, setGeoTime] = useState("");

  /* click to search for weather location */
  const searchPressed = () => {

    if(search == "") {
      swal("Empty Field", "Enter a City or Town" ,"warning")
    } else {
      /* fetch weather data */
      fetch(`${apis.weatherURL}/weather?q=${search}&units=metric&appid=${apis.weatherKey}`).then(response => response.json()).then(responseData => {
        setWeather(responseData);
      }).catch(err => swal( "Oops" ,  "Something went wrong! - Check Your Internet Connection" ,  "error" ));
      
      /* fetch forecast weather */
      fetch(`${apis.weatherURL}/forecast?q=${search}&lat=33.44&lon=-94.04&exclude=current,hourly,minutely,daily&units=metric&appid=${apis.weatherKey}`).then(forecast => forecast.json()).then(forecastData => {
        setForecast(forecastData);
      });

      /* fetch geolocation */
      fetch(`${apis.geoTime}${apis.geoKey}&location=${search}`).then(response => response.json()).then(resData => {
      setGeoTime(resData);
      });
    }

  }

  
 

  /* render DOM */
  return (
    <>
        <div className="App bg-dark">
          <h1 className="text-5xl text-center text-white font-bold">
            Zed Weather App
          </h1>

          {/* form field to search for location */}
          <div className="search-form">
            <input type="text" className="search-input w-full rounded-md border-0 py-2 pl-4 pr-25 text-white ring-1 ring-gray-400 placeholder:text-gray-400 sm:text-sm sm:leading-6" placeholder="Enter City or Town" onChange={(e) => setSearch(e.target.value)}/>
            
            <button className="search-button h-10 px-6 font-semibold rounded-md border border-slate-200 text-white hover:bg-yellow-400 transition-all hover:text-slate-900 hover:border-yellow-400" type="submit" onClick={searchPressed}>Search</button>
          </div>
          
          {/* display weather data */}
          <WeatherDisplay weather={weather} geoTime={geoTime} forecast={forecast} search={search} />

          {/* footer */}
          {/* <Footer /> */}
        </div>
    </>
  );
}