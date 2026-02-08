import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState([]);

  const fetchWeather = async () => {
    if (!city) return alert("Please enter a city name");

    try {
      const res = await fetch(
        `http://localhost:5000/api/weather?city=${city}`
      );
      const data = await res.json();

      const dailyData = data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
      );

      setForecast(dailyData);
    } catch (err) {
      alert("City not found");
    }
  };

  return (
    <div className="app">
      <h1>🌦 Weather Dashboard</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Enter city (e.g. Hyderabad)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      <div className="grid">
        {forecast.map((day, index) => (
          <div className="card" key={index}>
            <h3>{new Date(day.dt_txt).toDateString()}</h3>

            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt="weather icon"
            />

            <p className="desc">{day.weather[0].description}</p>
            <h2>{day.main.temp}°C</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
