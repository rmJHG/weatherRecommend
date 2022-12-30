const weatherInfo = document.querySelector(".weather");
const coord = document.querySelector(".coord");
const weatherIconForYou = document.querySelector(".weather-container_innerBox_icon");
const nowTemp = document.querySelector(".nowTemp");
const huTemp = document.querySelector(".huTemp");
const lowTemp = document.querySelector(".lowTemp");
const hgTemp = document.querySelector(".hgTemp");

const API_KEY = "b0cb44432057bee080d3e3db2ed3a68d";
const MAPAPI_KEY = "c19a0181393183574e358c5095a76439";
let lat;
let lon;

function weatherIcon(weather_data) {
  if (weather_data === "Clear") {
    weatherIconForYou.classList.add("fa-sun");
  } else if (weather_data === "Clouds") {
    weatherIconForYou.classList.add("fa-cloud");
  } else if (weather_data === "Wind") {
    weatherIconForYou.classList.add("fa-wind");
  } else if (weather_data === "Cloudrain") {
    weatherIconForYou.classList.add("fa-cloud-rain");
  } else if (weather_data === "Snowflake") {
    weatherIconForYou.classList.add("fa-cloud-rain");
  }
}

function addressInfo() {}

function onGeoOk(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      const weather_data = data.weather[0].main;
      nowTemp.innerText = data.main.temp + "℃";
      huTemp.innerText = data.main.feels_like + "℃";
      lowTemp.innerText = data.main.temp_min + "℃";
      hgTemp.innerText = data.main.temp_max + "℃";
      weatherIcon(weather_data);
    });
}

function onGeoError() {
  alert("Weather error");
}
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
