import { use, useState } from "react";
import React from 'react'
import  './Weather.css'
const API_KEY = "41cbdfb2c95e1ad1668b93b74623fd73";
function Weather() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    

    const fetchWeather = async () => {
        if (city === ""){
            alert("Enter valid city name");
            return;
        }
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            const data = await response.json();
            if(response.ok){
                setWeather(data);
            }
            else{
                alert("Invalid city name. Enter a valid city")
            }
            

            //console.log(weather)
            //console.log(weather.weather[0].icon)
        }
        catch {
            alert('Failed to fetch weather data ... Please try again later')
        }
    }

    return (
        <div className="weather-container">
        <div className="search-box">
            <h1>Weather Application</h1>
            <input
                type="text"
                placeholder="Enter City Name"
                value={city}
                onChange={(e) =>setCity(e.target.value)}
                onKeyDown={(e)=> e.key=== "Enter" && fetchWeather()}
             />
            <button
                onClick={fetchWeather}
            >Search</button>
        </div>
        <div className="weather-info">
            {weather && (
                <div>
                    <h2>{weather.name}</h2>
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].main}
                        className="weather-icon"
                    />
                    <p className="temperature">{Math.floor(weather.main.temp)}°C</p>
                    <p>{weather.weather[0].description}</p>
                    <p>{weather.wind.speed}</p>


                </div>
            )}
        </div>
        </div>
    );
}

export default Weather