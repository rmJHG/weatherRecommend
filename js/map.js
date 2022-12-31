const container = document.querySelector("#map");
const btn = document.querySelector(".mapBtn");
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
  }
};
places.keywordSearch("놀이공원", callback, {
  location: new kakao.maps.LatLng(lat, lon),
});
const map = new kakao.maps.Map(container, options);
btn.addEventListener("click", panTo);
