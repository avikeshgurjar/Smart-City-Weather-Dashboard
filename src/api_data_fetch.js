async function getWeather(city) {
  const apiKey = "YOUR_API_KEY";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(url)
  const data = await response.json()

  return data
}


async function showWeather() {
  const data = await getWeather("Pune");
  console.log(data.main.temp);
}

showWeather();