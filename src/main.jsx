import { createRoot } from 'react-dom/client'
import "./index.css"

async function getWeather(city){
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  return await response.json();
}

function WeatherApp(){

  async function showWeather() {
    const resultDiv = document.getElementById("weatherResult")
    const cityInput = document.getElementById('searchInput').value

    if (!cityInput){
      resultDiv.innerText = "Please enter a city name.";
      return
    }

    resultDiv.innerText = "Fetching weather..."

    const weatherData = await getWeather(cityInput)

    if (weatherData.main) {
      const temp = weatherData.main.temp
      const condition = weatherData.weather[0].main.toLowerCase()
      const rain = weatherData.rain ? (weatherData.rain['1h'] || 0) : 0

      let advice = ""

      if (condition.includes('rain') || rain > 0.2){
        advice = "Bring an umbrella ☂️."
      }else if(condition.includes('snow')){
        advice = "Wear a winter coat 🧥."
      }else if(temp>35) {
        advice="wear light cloths and drink water!!"

      }
      else if(30>=temp > 25){
        advice = "Warm weather not bad you can still enjoy!"
      }else if (15<=temp<=25){
        advice = "enjoy it's best weather for hangout!!😜🧤."
      }else if (5<=temp<15){
        advice="wear coat or jacket"
      }else{
        advice = "Wear a winter coat 🧥."

      }

      resultDiv.innerHTML = `
        <div class="weather-city">${weatherData.name}</div>
        <div class="weather-temp">${temp}°C</div>
        
        <div class="weather-condition">${condition}</div>
        <div class="weather-advice">
          Advice: ${advice}
        </div>
       `


      document.body.style.backgroundImage = "none";
      if (temp >= 25) {
        document.body.style.background = "linear-gradient(135deg, #c69765, #feb47b)"
      } else if (temp <= 15) {
        document.body.style.background = "linear-gradient(135deg, #0cadda, #1b6dd1)"
      } else {
        document.body.style.background = "linear-gradient(135deg, #30cfd0, #619fbb)"
      }
    } else {
      resultDiv.innerText = "City not found.";
    }
  }

  return (
    <div className="weather">
      <h1 className="title">Weather App</h1>
      <div className="container">
        
        <input type="text" id="searchInput" className="search-input" placeholder="Enter city name..." />
        <button id="searchBtn" className="search-button" onClick={showWeather}>Search</button>
      </div>
      <div id="weatherResult" className="weather-result"></div>
      
    </div>
      )
}
      createRoot(document.getElementById('root')).render(<WeatherApp />)
