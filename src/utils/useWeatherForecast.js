import React, { useState, useEffect } from 'react';
import { RESULTS } from 'react-native-permissions';
import WeatherForecastService from '../services/WeatherForecast';
import getGeolocation from './getGeolocation';
import getPermission from './getPermission';

const useWeatherForecast = () => {

    const [forecast, setForecast] = useState(null);
    const  [refresh, setRefresh] = useState(false);

    const getForecast = async () => {

        const locationPermission = await getPermission();
        
        if (locationPermission === RESULTS.GRANTED) {
            const {coords} = await getGeolocation();

            const response = await WeatherForecastService.getWeather({...coords});
            const forecast = await response.json();
            const filteredForecast = filterForecast(forecast); 

            if(!response.ok) {
                console.log(`Error: ${forecast.message}`)
            } else {
                setForecast(filteredForecast)
            }
        } else {
            setRefresh(true)
        }
        
    }

    useEffect(() => { 
        if (!forecast) {
            getForecast(); 
        }
    })

    return forecast;
}

const filterForecast = (data) => {
    return {
        id: data.city.id,
        name: data.city.name,
        country: data.city.country,
        timezone: data.city.timezone,
        list: data.list,
    };
};

export default useWeatherForecast;