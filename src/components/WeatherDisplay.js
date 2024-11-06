import React from 'react';

const WeatherDisplay = ({ weather }) => {
  if (!weather) return null;

  const { current, hourly } = weather;
  const temperature = Math.round(current.main.temp);
  const description = current.weather[0].description;
  const iconCode = current.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  return (
    <div className="weather-info">
      <h2>{current.name}, {current.sys.country}</h2>
      <p>Temperature: {temperature}°C</p>
      <p>Weather: {description}</p>
      <img id="weather-icon" src={iconUrl} alt={description} style={{ display: 'block', margin: '0 auto' }} />
      <div id="temp-div">
        <p style={{ fontSize: '60px', marginTop: '-30px' }}>{temperature}°C</p>
      </div>
      <div id="hourly-forecast">
        {displayHourlyForecast(hourly)}
      </div>
    </div>
  );
};

const displayHourlyForecast = (hourlyData) => {
  const next24Hours = hourlyData.slice(0, 8); 

  return next24Hours.map(item => {
    const dateTime = new Date(item.dt * 1000); 
    const hour = dateTime.getHours();
    const temperature = Math.round(item.main.temp);
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    return (
      <div className="hourly-item" key={item.dt}>
        <span>{hour}:00</span>
        <img src={iconUrl} alt="Hourly Weather Icon" />
        <span>{temperature}°C</span>
      </div>
    );
  });
};

export default WeatherDisplay;
