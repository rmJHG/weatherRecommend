const weatherInfo = document.querySelector(".weather");
const coord = document.querySelector(".coord");
const weatherIconForYou = document.querySelector(".weather-container_innerBox_icon");
const nowTemp = document.querySelector(".nowTemp");
const ftTemp = document.querySelector(".ftTemp");
const huTemp = document.querySelector(".huTemp");
const loc = document.querySelector(".loc");
const updateTime = document.querySelector(".updateTime");
const announcement = document.querySelector(".announcement");

const API_KEY = "b0cb44432057bee080d3e3db2ed3a68d";
const MAPAPI_KEY = "c19a0181393183574e358c5095a76439";
let lat;
let lon;
let recommendNowTemp;
function weatherIcon(weather_data) {
  if (weather_data !== "Clear") {
    weatherIconForYou.classList.remove("fa-sun");
  } else if (weather_data !== "Clouds") {
    weatherIconForYou.classList.remove("fa-cloud");
  } else if (weather_data !== "Wind") {
    weatherIconForYou.classList.remove("fa-wind");
  } else if (weather_data !== "Cloudrain") {
    weatherIconForYou.classList.remove("fa-cloud-rain");
  } else if (weather_data !== "Snowflake") {
    weatherIconForYou.classList.remove("fa-snowflake");
  }
  if (weather_data === "Clear") {
    weatherIconForYou.classList.add("fa-sun");
  } else if (weather_data === "Clouds") {
    weatherIconForYou.classList.add("fa-cloud");
  } else if (weather_data === "Wind") {
    weatherIconForYou.classList.add("fa-wind");
  } else if (weather_data === "Cloudrain") {
    weatherIconForYou.classList.add("fa-cloud-rain");
  } else if (weather_data === "Snowflake") {
    weatherIconForYou.classList.add("fa-snowflake");
  }
  if (recommendNowTemp < 4) {
    fetch("season/winter").then(function (response) {
      response.text().then((text) => {
        announcement.innerText = text;
      });
    });
  } else if (4 <= recommendNowTemp < 8) {
    fetch("season/48").then(function (response) {
      response.text().then((text) => {
        announcement.innerText = text;
      });
    });
  } else if (8 <= recommendNowTemp < 15 && weather_data === "Clouds") {
    fetch("season/815Clouds").then(function (response) {
      response.text().then((text) => {
        announcement.innerText = text;
      });
    });
  } else if (8 <= recommendNowTemp < 15 && weather_data === "Wind") {
    fetch("season/815Wind").then(function (response) {
      response.text().then((text) => {
        announcement.innerText = text;
      });
    });
  } else if (8 <= recommendNowTemp < 15 && weather_data === "Clear") {
    fetch("season/815Clear").then(function (response) {
      response.text().then((text) => {
        announcement.innerText = text;
      });
    });
  } else if (16 <= recommendNowTemp < 23) {
    fetch("season/1623").then(function (response) {
      response.text().then((text) => {
        announcement.innerText = text;
      });
    });
  }
}

function onGeoOk(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      nowTemp.innerText = data.main.temp + "℃";

      recommendNowTemp = data.main.temp;
      ftTemp.innerText = data.main.feels_like + "℃";
      huTemp.innerText = data.main.humidity + "%";
      loc.innerText = `${data.sys.country}  ${data.name}`;
      weatherIcon(data.weather[0].main);
    });
}

function onGeoError() {
  alert("Weather error");
}

function updateGeoInfo() {
  const today = new Date();
  const updatehours = today.getHours();
  const updateMins = String(today.getMinutes()).padStart(2, "0");
  const updateSecs = String(today.getSeconds()).padStart(2, "0");

  updateTime.innerText = `${updatehours}:${updateMins}:${updateSecs}`;
  navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
}
updateGeoInfo();
setInterval(updateGeoInfo, 60000);
