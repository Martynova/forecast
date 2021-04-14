import React from 'react';

const URL = 'https://api.openweathermap.org/data/2.5/forecast'

class WeatherForecastService extends React.Component {
    
    getWeather({latitude, longitude}) {
        return fetch(`${URL}?lat=${latitude}&lon=${longitude}&appid=955932fc4909ccd7c9c74db997bb2b16&units=metric`)
    }
}

export default new WeatherForecastService();