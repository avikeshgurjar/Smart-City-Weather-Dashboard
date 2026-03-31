import { createRoot } from 'react-dom/client'

import "./index.css"

async function getWeather(city) {
  const apiKey = "77f6d576b99dc6322f66857c32bf71e1";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(url)
  const data = await response.json()

  return data
}

function WeatherApp() {

  async function showWeather() {
    const city = document.getElementById('searchInput').value;
    if (!city) return;
    const data = await getWeather(city);
    console.log(data); 
    const resultDiv = document.getElementById("weatherResult");
    if(data.main) {
      resultDiv.innerText = `${data.name} - Temperature: ${data.main.temp}°C`;
    } else {
      resultDiv.innerText = "City not found.";
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      <div className="container">
        <input 
          type="text" 
          id="searchInput" 
          className="search-input"
          placeholder="Enter city name" 
        />
        <button 
          id="searchBtn" 
          className="search-button"
          onClick={showWeather}
        >
          Search
        </button>
      </div>
      
      <div id="weatherResult" style={{ marginTop: "30px", fontSize: "24px", color: "white", fontWeight: "bold", textAlign: "center" }}>
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')).render(WeatherApp())
