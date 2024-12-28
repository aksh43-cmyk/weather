import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSearch = async () => {
    if (!location) {
      setError('Please enter a location');
      return;
    }
    setError('');
    try {
      // Using the API key directly here
      const apiKey = 'bc70985c0ae8e6c0221bdbe48590c3ef'; // Your actual API key
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
      const data = await response.json();
      if (data.cod === '404') {
        setError('Location not found');
        setWeatherData(null);
      } else {
        setWeatherData(data);
      }
    } catch (err) {
      setError('Error fetching weather data');
      setWeatherData(null);
    }
  };

  return (
    <div>
      <h1>WEATHER DETECTION APP</h1>
    <div style={{ width: '100%', minHeight: '59vh' }} className="weather-container">
      <div className="search-container">
        
        <input
          type="text"
          value={location}
          onChange={handleChange}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <div className="error">{error}</div>}

      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>{weatherData.weather[0].description}</p>
          <h3>{weatherData.main.temp}°C</h3>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default App;

