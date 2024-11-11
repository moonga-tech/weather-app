import moment from "moment";

import Image from "next/image";
import Humidity from "../images/humidity.png"
import WindSpeed from "../images/storm.png"


import Rain from "../images/rain-1.png"
import Clear from "../images/clear.png"
import Cloud from "../images/cloud.png"


export default function weatherDisplay({weather, geoTime, forecast}) {

    return (
        <>
          <div className="display">
            {/* location name */}
            <div className="location-name text-center">
              <span className="my-0 mx-auto text-4xl animate__animated animate__fadeInRight">{weather.name}</span>
            </div>

            {/* if weather.main is undefined */}
            {typeof weather.main !== "undefined" ? (
              <>
                <hr className="title-line my-4 mx-auto"/>
                <div className="display-data flex gap-6 justify-center flex-wrap text-center">
                  <div className="animate__animated animate__fadeInUp">
                    <span>
                      <h4 className="datetime">Current Date and Time</h4>
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
                          ) : (<></>)
                          }
                          <span>{weather.weather[0].main}</span>
                        </section>
                        <h2 className="text-2xl temp">{weather.main.temp} <sup>o</sup>C</h2>                  
                      </section>
                    <p>( Feels Like {weather.main.feels_like}  <sup>o</sup>C )</p>
                  </div>

                  {/* humidity */}
                  <div className="animate__animated animate__fadeInDown">
                    <h4>humidity</h4>
                    <p className="text-4xl">{weather.main.humidity}%</p>
                    <p>( {weather.weather[0].description} )</p>
                    <span>
                      <Image className="my-0 mx-auto" src={Humidity} width={50} height={50} alt="weather-icon" />
                    </span>
                  </div>

                  {/* weather speed */}
                  <div className="animate__animated animate__fadeInRight">
                    <h4>wind speed</h4>
                    <p className="text-2xl">{weather.wind.speed} M/S</p>
                    <p>{weather.wind.deg}<sup>o</sup></p>
                    <span>
                      <Image className="my-0 mx-auto" src={WindSpeed} width={50} height={50} alt="weather-icon" />
                    </span>
                  </div>
                </div>

                {/* 5 day forecase - display weather condition in 5 days time */}
                <div className="5day-forcest">
                {forecast.list && (
                  <div className="forecast-div flex gap-5 text-center flex-wrap justify-center text-1xl w-full my-3">
                    {forecast.list.slice(0, 40).filter((_, index) => index % 8 === 0).map((day, index) => (
                      <div key={index} className="border-slate-300 border-2 ">
                        <h2>{moment.unix(day.dt).format('dddd')}</h2>
                        <p>High: {day.main.temp_max}°C</p>
                        <p>Low: {day.main.temp_min}°C</p>
                        <p>Conditions: {day.weather[0].description}</p>
                        <p>Precipitation: {day.pop}%</p>
                        <p>Wind: {day.wind.speed} m/s</p>
                      </div>
                    ))}
                  </div>
                )}
                </div>
              </>
            ) : weather.message ? (
              <p>{weather.message}</p>
            ) : ( 
              
            /* if no city has been inputed */
            <div className="location-name text-center my-5">
              <span className="my-0 mx-auto text-4xl animate__animated animate__fadeInRight">Enter a city</span>
            </div> )
            }
          </div>
        </>
    )
}