const mapContainer = document.querySelector(".maplist-container");
const toDoContainer = document.querySelector(".todo-container");

if (window.matchMedia("(min-width: 769px)").matches) {
    mapContainer.style.display = "";
  } else {
    // mapContainer.style.display = "none"
    toDoContainer.style.display = "none";
  }