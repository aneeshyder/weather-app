import React, {useEffect, useState} from 'react';
import "./css/style.css";

const Tempapp = () => {
    const [city, setCity] = useState(null);
    const [sysinfo, setSysinfo] = useState(null);
    const [weainfo, setWeainfo] = useState(null);
    const [search, setSearch] = useState("Mumbai");
    useEffect ( () => {               
        const fetchApi = async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=c5dac860e4358adefaac387c2ed817ff            `;
            const response = await fetch(url);            
            const resJson = await response.json();
            setCity(resJson.main);
            setSysinfo(resJson.sys);
            setWeainfo(resJson.weather);            
        }

        fetchApi();
    },[search])

    return (
        <>
        <h1>Weather App</h1>
            <div className="box">
                <div className="inputData">
                    <input
                     type="search"
                     value={search}
                    className="inputFeild"
                    onChange = { (event) => {setSearch(event.target.value)}}
                    />
                </div>
            </div>
            {!city || !sysinfo || !weainfo ? (
                <p className="no-data"> No data found</p>
            ) : (
                <>
                <div className="info">
                    <h2 className="location"><i class="fas fa-map-marker-alt"></i> {search}, {sysinfo.country}</h2>                    
                    <div className="weather-img"><img src={"http://openweathermap.org/img/wn/" + weainfo[0].icon + "@2x.png"} alt="weather" /></div>
                    <p className="weather-name">{weainfo[0].description}</p>
                    
                    <h1 className="temp">{city.temp}°cel</h1>
                    <p className="temp_min_max">Feel like {city.feels_like}°cel</p>

                </div>
                </>
            )

            }
            
        </>
    )
}

export default Tempapp;