import { createRoot } from 'react-dom/client'
import "./index.css"

async function getWeather(city) {
  const apiKey = "77f6d576b99dc6322f66857c32bf71e1";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  return await response.json();
}

function WeatherApp() {

  async function showWeather() {
    const resultDiv = document.getElementById("weatherResult");
    const cityInput = document.getElementById('searchInput').value;
    
    if (!cityInput) {
      resultDiv.innerText = "Please enter a city name.";
      return;
    }
    
    resultDiv.innerText = "Fetching weather...";

    const weatherData = await getWeather(cityInput);
    
    if (weatherData.main) {
      resultDiv.innerText = `${weatherData.name} - Temperature: ${weatherData.main.temp}°C`;
    } else {
      resultDiv.innerText = "City not found.";
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      <div className="container">
        <input type="text" id="searchInput" className="search-input" placeholder="Enter city name..."/>
        <button  id="searchBtn"className="search-button" onClick={showWeather}>Search</button> </div>
      <div id="weatherResult" style={{ marginTop: "30px", fontSize: "24px", color: "white", fontWeight: "bold", textAlign: "center", minHeight: "30px" }}> </div>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<WeatherApp />)
