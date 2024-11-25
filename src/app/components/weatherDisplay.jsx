import { useState, useEffect } from "react";
import moment from "moment";
import Image from "next/image";
import styles from "../styles/styles.module.css"

/* weather images */
import Humidity from "../images/humidity.png"
import WindSpeed from "../images/wind.png"
import Rain from "../images/rain-1.png"
import Clear from "../images/clear.png"
import Cloud from "../images/cloud.png"
import Snow from "../images/snow.png"
import Fog from "../images/fog.png"
import Precipt from "../images/precipitation.png"
import TempHigh from "../images/temp-high.png"
import TempLow from "../images/temp-low.png"

export default function weatherDisplay({weather, geoTime, forecast, search}) {  
  
  return (
    <>
      <div className="display">
        {/* location name */}
        <div className="location-name text-center animate__animated animate__fadeInRight">
          <span className="my-0 mx-auto text-4xl font-bold">{weather.name}</span>
        </div>

        {/* if weather.main is undefined */}
        {typeof weather.main !== "undefined" ? (
          <>
            <hr className="title-line my-4 mx-auto"/>
            <div className="display-data flex gap-6 justify-center flex-wrap text-center">
              <div className="animate__animated animate__fadeInUp">
                <span>
                  <h4 className="datetime">Geolocation Date and Time</h4>
                  <p>{geoTime.datetime}</p>   
                  
                  <p className="my-2"><span className="timezone">{geoTime.requested_location}</span> - {geoTime.timezone_abbreviation} {geoTime.timezone_location}</p>                   
                  <p>Longitude: {weather.coord.lon}° W</p>
                  <p>Latitude: {weather.coord.lat}° N</p>
                </span>
              </div>

              {/* tempeture */}
              <div className="temp-div animate__animated animate__fadeInLeft">
                <h4>temp</h4>
                  <section className="temp-icon">
                    <section className="text-center icon">
                      {/* <Image src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`} width={50} height={50} alt="weather-icon" /> */}
                      {
                        weather.weather[0].main == "Clear" ? (
                          <Image src={Clear} width={50} height={50} alt="weather-icon" />
                      ) : weather.weather[0].main == "Rain" ? (
                            <Image src={Rain} width={50} height={50} alt="weather-icon" />
                      ) : weather.weather[0].main == "Clouds" ? (
                            <Image src={Cloud} width={50} height={50} alt="weather-icon" />
                      ) : weather.weather[0].main == "Snow" ? (
                            <Image src={Snow} width={50} height={50} alt="weather-icon"/>
                      ) : weather.weather[0].main == "Smoke" ? (
                            <Image src={Fog} width={50} height={50} alt="weather-icon"/> 
                      ) : (<></>)
                      }
                      <span>{weather.weather[0].main}</span>
                    </section>
                    <h2 className="text-3xl font-bold temp">{weather.main.temp} <sup>o</sup>C</h2>                  
                  </section>
                <p>( Feels Like {weather.main.feels_like}  <sup>o</sup>C )</p>
                <span className="flex justify-center my-1">
                  {
                    weather.main.temp > 15 ? (
                      <Image src={TempHigh} width={50} height={50} alt="weather-icon" />
                    ) : (
                      <Image src={TempLow} width={50} height={50} alt="weather-icon" />
                    )
                  }
                </span>
              </div>

              {/* humidity */}
              <div className="animate__animated animate__fadeInDown">
                <h4>humidity</h4>
                <p className="text-4xl font-bold">{weather.main.humidity}%</p>
                <p>( {weather.weather[0].description} )</p>
                <span>
                  <Image className="my-0 mx-auto" src={Humidity} width={70} height={70} alt="weather-icon" />
                </span>
              </div>

              {/* weather speed */}
              <div className="animate__animated animate__fadeInRight">
                <h4>wind speed</h4>
                <p className="text-2xl font-bold">{weather.wind.speed} M/S</p>
                <p>{weather.wind.deg}<sup>o</sup></p>
                <span>
                  <Image className="my-0 mx-auto" src={WindSpeed} width={70} height={70} alt="weather-icon" />
                </span>
              </div>
            </div>

            {/* 5 day forecast - display weather condition in 5 days time */}
            <div className="day-forcast">
            <div>
              <h1 className="text-center 5day text-4xl font-bold px-2">5 Day Weather Forecast</h1>
            </div>
            <hr className="title-line my-4 mx-auto"/>
            {forecast.list && (
              <div className="forecast-div flex gap-5 text-center flex-wrap justify-center text-1xl w-full my-3">
                {forecast.list.slice(0, 40).filter((_, index) => index % 8 === 0).map((day, index) => (
                  <div key={index} className="border-slate-500 border-2 rounded-xl w-50 px-2 py-2">
                    <h2 className="text-2xl text-sky-300">{moment.unix(day.dt).format('dddd')}</h2>
                    <div className="flex my-2 justify-center gap-2">
                      <p><span className="text-red-500 font-bold">High:</span> {day.main.temp_max}°C</p>
                      <p><span className="text-sky-600 font-bold">Low:</span> {day.main.temp_min}°C</p>
                    </div>
                    <p>Conditions - ({day.weather[0].description})</p>
                    <div className="flex justify-evenly my-2">
                      <p>Precipitation <br />{day.pop}%</p>
                      <Image src={Precipt} width={50} height={50} alt="weather-icon" className="img-fluid" />
                    </div>
                    <div className="flex justify-evenly flex-row-reverse items-center mb-1">
                      <p>Wind: {day.wind.speed} m/s</p>
                      <Image src={WindSpeed} width={50} height={20} alt="weather-icon" className="img-fluid wind" />
                    </div>
                  </div>
                ))}
              </div>
            )}
            </div>
          </>
          /* error if city not found */
        ) : search == "" ? (
          <div className="location-name text-center my-5">
            <span className="my-0 mx-auto text-4xl animate__animated animate__fadeInRight">Enter a City or Town</span>
          </div> 
        ) : weather.message ? (
            <p className="animate__animated animate__fadeInRight text-center capitalize text-6xl p-10 text-red-500">{weather.message}</p>
        ) : ( 
          
        /* if no city has been entered in the input */
        <div className="location-name text-center my-5">
          <span className="my-0 mx-auto text-4xl animate__animated animate__fadeInRight">Enter a City or Town</span>
        </div> )
        }
      </div>
    </>
  )
}