const container = document.querySelector("#map");
const btn = document.querySelector(".mapBtn");
const mapListUl = document.querySelector(".mapList");
let places = new kakao.maps.services.Places();

const options = {
  center: new kakao.maps.LatLng(lat, lon),
  level: 3,
};
function panTo() {
  var moveLatLon = new kakao.maps.LatLng(lat, lon);
  map.panTo(moveLatLon);
}
const callback = function (result, status) {
  if (status === kakao.maps.services.Status.OK) {
    console.log(result);
    recommendList(result);
  }
};

function recommendList(result) {
  for (i = 0; i < result.length; i++) {
    const resultList = result[i];
    const resultPlaceName = JSON.stringify(resultList.place_name);
    const resultAddress = JSON.stringify(resultList.address_name);
    const resultCategory = JSON.stringify(resultList.category_name);
    const resultPhoneNum = JSON.stringify(resultList.phone);
    const resultUrl = JSON.stringify(resultList.place_url);

    const placeList = document.createElement("li");
    const placeUrl = document.createElement("a");
    placeUrl.href = resultUrl.substring(1, resultUrl.length - 1);
    const placeName = document.createElement("span");
    placeName.innerText = resultPlaceName.substring(1, resultPlaceName.length - 1);
    const placeAddress = document.createElement("span");
    placeAddress.innerText = resultAddress.substring(1, resultAddress.length - 1);
    const categoryName = document.createElement("span");
    categoryName.innerText = resultCategory.substring(1, resultCategory.length - 1);
    const phoneNum = document.createElement("span");
    phoneNum.innerText = resultPhoneNum.substring(1, resultPhoneNum.length - 1);

    placeUrl.appendChild(placeName);
    placeList.appendChild(placeUrl);
    placeList.appendChild(categoryName);
    placeList.appendChild(placeAddress);
    placeList.appendChild(phoneNum);
    mapListUl.appendChild(placeList);
  }
}

places.keywordSearch("놀이공원", callback, {
  location: new kakao.maps.LatLng(lat, lon),
});
const map = new kakao.maps.Map(container, options);
btn.addEventListener("click", panTo);
