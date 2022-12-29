const weatherInfo = document.querySelector(".weather");
const wind = document.querySelector(".wind");
const cloud = document.querySelector(".cloud");
const coord = document.querySelector(".coord");

const API_KEY = "b0cb44432057bee080d3e3db2ed3a68d";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      const weather_data = data.weather[0].main;
      // weatherInfo.value = weather_data.main;
      console.log(weather_data);
      if (weather_data === "clear") {
        weatherInfo.value = "맑음";
      } else if (weather_data === "Clouds") {
        weatherInfo.value = "흐림";
      }
    });
}

function onGeoError() {
  alert("Weather error");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
