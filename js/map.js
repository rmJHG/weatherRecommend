const container = document.querySelector("#map");
const btn = document.querySelector(".mapBtn");
const mapListUl = document.querySelector(".mapList");
const recommendBtnClick = document.querySelectorAll(".recommendBtnClick");
const moveAddress = document.querySelectorAll(".address");

const options = {
  center: new kakao.maps.LatLng(lat, lon),
  level: 3,
};
let places = new kakao.maps.services.Places();
let map = new kakao.maps.Map(container, options);
// let geocoder = new kakao.maps.services.Geocoder();
let markers = [];
function panTo() {
  const moveLatLon = new kakao.maps.LatLng(lat, lon);
  map.panTo(moveLatLon);
}
function delRecommendList() {
  while (mapListUl.hasChildNodes()) {
    mapListUl.removeChild(mapListUl.firstChild);
  }
}
function recommendList(result) {
  for (i = 0; i < result.length; i++) {
    const resultList = result[i];
    const x = resultList.x;
    const y = resultList.y;
    const resultPlaceName = JSON.stringify(resultList.place_name);
    const resultAddress = JSON.stringify(resultList.address_name);
    const resultCategory = JSON.stringify(resultList.category_name);
    const resultPhoneNum = JSON.stringify(resultList.phone);
    const resultUrl = JSON.stringify(resultList.place_url);
    const placeList = document.createElement("li");
    placeList.classList.add("LL");
    const placeUrl = document.createElement("a");
    placeUrl.href = resultUrl.substring(1, resultUrl.length - 1);
    placeUrl.target = "blink";
    const placeName = document.createElement("span");
    placeName.innerText = resultPlaceName.substring(1, resultPlaceName.length - 1);
    const placeAddress = document.createElement("span");
    // placeAddress.type = "button";
    placeAddress.innerText = resultAddress.substring(1, resultAddress.length - 1);
    // placeAddress.classList.add("address");
    placeAddress.name = "hi";
    const categoryName = document.createElement("span");
    categoryName.innerText = resultCategory.substring(1, resultCategory.length - 1);
    const phoneNum = document.createElement("span");
    phoneNum.innerText = resultPhoneNum.substring(1, resultPhoneNum.length - 1);
    addMarker(y, x);
    placeUrl.appendChild(placeName);
    placeList.appendChild(placeUrl);
    placeList.appendChild(categoryName);
    placeList.appendChild(placeAddress);
    placeList.appendChild(phoneNum);
    mapListUl.appendChild(placeList);
  }
}
function recommendSearch(value) {
  const callback = function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      // console.log(result);
      recommendList(result);
    }
  };
  places.keywordSearch(value, callback, {
    location: new kakao.maps.LatLng(lat, lon),
  });
}
function addMarker(yInfo, xInfo) {
  let markerPosition = new kakao.maps.LatLng(yInfo, xInfo);
  marker = new kakao.maps.Marker({
    position: markerPosition,
  });

  marker.setMap(map);
  markers.push(marker);
  console.log(marker);
}
function removeMarker() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

btn.addEventListener("click", panTo);
recommendBtnClick.forEach((target) =>
  target.addEventListener("click", () => {
    delRecommendList();
    removeMarker();
    recommendSearch(target.value);
  })
);
