import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/weather/${city}`);
      const data = await response.json();
      if (response.ok) {
        setWeather(data);
        setError('');
      } else {
        setError('City not found');
        setWeather(null);
      }
    } catch (err) {
      setError('Error fetching weather data');
      setWeather(null);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Weather App</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            required
          />
          <button type="submit">Search</button>
        </form>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-card">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <div className="weather-info">
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
              <div className="temperature">{Math.round(weather.main.temp)}°C</div>
            </div>
            <div className="weather-details">
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind Speed: {weather.wind.speed} m/s</p>
              <p>Description: {weather.weather[0].description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
