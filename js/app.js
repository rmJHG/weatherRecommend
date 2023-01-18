const weatherInfo = document.querySelector(".weather");
const coord = document.querySelector(".coord");
const weatherIconForYou = document.querySelector(".weather-container_innerBox_icon");
const nowTemp = document.querySelector(".nowTemp");
const ftTemp = document.querySelector(".ftTemp");
const huTemp = document.querySelector(".huTemp");
const loc = document.querySelector(".loc");
const updateTime = document.querySelector(".updateTime");
const announcement = document.querySelector(".announcement");
const seasonRecommend = document.querySelector(".seasonRecommend");
const seasonBtnContainer = document.querySelector(".seasonBtn-container");
const recommendBtnClick = document.querySelectorAll(".recommendBtnClick");
//API 인증키
const API_KEY = "b0cb44432057bee080d3e3db2ed3a68d";
const MAPAPI_KEY = "c19a0181393183574e358c5095a76439";
let lat;
let lon;
let recommendNowTemp;
function removeAllChild(div) {
  while (div.hasChildNodes()) {
    div.removeChild(div.firstChild);
  }
}
function removeIcon(name) {
  weatherIconForYou.classList.remove(name);
}
function addIcon(name) {
  weatherIconForYou.classList.add(name);
}
//날씨별 멘트
function fetchPage(name) {
  fetch(name).then(function (response) {
    response.text().then((text) => {
      announcement.innerText = text;
    });
  });
}

//날씨별 추천버튼
function fetchBtn(name) {
  fetch(name).then(function (response) {
    response.text().then((text) => {
      btnArray = text.split(",");
      removeAllChild(seasonRecommend);
      for (i = 0; i < btnArray.length; i++) {
        const makeBtn = document.createElement("input");
        makeBtn.type = "button";
        makeBtn.value = btnArray[i];
        seasonRecommend.appendChild(makeBtn);
        seasonBtnContainer.appendChild(seasonRecommend);
        makeBtn.classList.add("recommendBtnClick");
      }
    });
  });
}

//날씨별 아이콘 변경 및 날씨별 멘트 변경
function weatherIcon(weather_data) {
  // console.log(weather_data);
  if (weather_data !== "Clear") {
    removeIcon("fa-sun");
  } else if (weather_data !== "Clouds") {
    removeIcon("fa-cloud");
  } else if (weather_data !== "Wind") {
    removeIcon("fa-wind");
  } else if (weather_data !== "Cloudrain") {
    removeIcon("fa-cloud-rain");
  } else if (weather_data !== "Snow") {
    removeIcon("fa-snowflake");
  }else if (weather_data === "Rain") {
    addIcon("fa-Rain");
  }
  if (weather_data === "Clear") {
    addIcon("fa-sun");
  } else if (weather_data === "Clouds") {
    addIcon("fa-cloud");
  } else if (weather_data === "Wind") {
    addIcon("fa-wind");
  } else if (weather_data === "Cloudrain") {
    addIcon("fa-cloud-rain");
  } else if (weather_data === "Snow") {
    addIcon("fa-snowflake");
  }else if (weather_data === "Rain") {
    addIcon("fa-rain");
  }
  let seasonOfMons;
  if (2 < mons < 6) {
    seasonOfMons = "봄";
  } else if (8 < mons < 12) {
    seasonOfMons = "가을";
  }
  if (weather_data === "Cloudrain") {
    fetchPage("season/rain");
    fetchBtn("season/rainBtn");
  } else if (recommendNowTemp < 4) {
    fetchPage("season/winter");
    fetchBtn("seasonBtn/winterBtn");
  } else if (4 <= recommendNowTemp < 8) {
    fetchPage("season/48");
    fetchBtn("seasonBtn/48Btn");
  } else if (8 <= recommendNowTemp < 15 && weather_data === "Clouds") {
    fetchPage("season/815Clouds");
    fetchBtn("seasonBtn/815Btn");
  } else if (8 <= recommendNowTemp < 15 && weather_data === "Wind") {
    fetchPage("season/815Wind");
    fetchBtn("seasonBtn/815Btn");
  } else if (8 <= recommendNowTemp < 15 && weather_data === "Clear") {
    fetchPage("season/815Clear");
    fetchBtn("seasonBtn/815Btn");
  } else if (15 <= recommendNowTemp < 23) {
    fetchPage("season/1523");
    fetchBtn("seasonBtn/1523Btn");
  } else if (23 <= recommendNowTemp < 33) {
    fetchPage("season/2333");
    fetchBtn("seasonBtn/2333Btn");
  } else if (33 <= recommendNowTemp) {
    fetchPage("season/summer");
    fetchBtn("seasonBtn/summerBtn");
  }
}
//좌표를 기준으로 현재 날씨정보 구하기
function onGeoOk(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      nowTemp.innerText = data.main.temp + "℃";
      recommendNowTemp = data.main.temp;
      ftTemp.innerText = data.main.feels_like + "℃";
      huTemp.innerText = data.main.humidity + "%";
      loc.innerText = `${data.sys.country}  ${data.name}`;
      weatherIcon(data.weather[0].main);
    });
}

// 에러가 났을 경우
function onGeoError() {
  alert("Weather error");
}

//날씨업데이트가 된 시간
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

//새로운 추천버튼 만들기
function hello(target) {
  // console.log(target.target.value)
  // console.log(target.path[0].value);
  delRecommendList();
  removeMarker();
  recommendSearch(target.target.value);
}
seasonBtnContainer.addEventListener("click", hello);
