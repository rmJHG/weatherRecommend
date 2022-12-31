const clock = document.querySelector(".clock");
const nowDates = document.querySelector(".nowdates");

function getClock() {
  const today = new Date();
  const hours = String(today.getHours()).padStart(2, "0");
  const min = String(today.getMinutes()).padStart(2, "0");
  const sec = String(today.getSeconds()).padStart(2, "0");
  clock.innerText = `${hours} : ${min} : ${sec}`;
}

function date() {
  const today = new Date();
  const years = String(today.getFullYear());
  const mons = String(today.getMonth() + 1).padStart(2, "0");
  const dates = String(today.getDate()).padStart(2, "0");
  const days = String(today.getDay());
  const daysList = ["일", "월", "화", "수", "목", "금", "토"];
  const getDays = daysList[days];
  nowDates.innerText = `${years}.${mons}.${dates} (${getDays})`;
}
getClock();
setInterval(getClock, 1000);
date();
