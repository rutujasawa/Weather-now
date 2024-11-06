import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 
import WeatherDisplay from './components/WeatherDisplay';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const getWeather = async () => {
    if (!city) {
      alert('Please enter a city');
      return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const weatherResponse = await axios.get(currentWeatherUrl);
      const forecastResponse = await axios.get(forecastUrl);

      setWeather({
        current: weatherResponse.data,
        hourly: forecastResponse.data.list,
      });
      setError('');
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Error fetching weather data. Please try again.');
      setWeather(null);
    }
  };

  return (
    <div id="weather-container">
      <h1>Weather Now</h1>
      <div className="input-container">
        <input 
          type="text" 
          placeholder="Enter city" 
          value={city} 
          onChange={handleCityChange}
        />
        <button onClick={getWeather}>Get Weather</button>
      </div>
      {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
      <WeatherDisplay weather={weather} />
    </div>
  );
};

export default WeatherApp;
