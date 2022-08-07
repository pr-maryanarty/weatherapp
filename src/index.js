function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("#cityName").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity-rate").innerHTML =
    response.data.main.humidity;
  document.querySelector("#wind-rate").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function search(inputCity) {
  let apiKey = `8a1943482a34a88b396522ac81951d3a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function findCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city-input").value;
  search(inputCity);
}

let currentCity = document.querySelector("#searchTab");
currentCity.addEventListener("submit", findCity);

let currentTime = new Date();
let challenge = document.querySelector("#timeCode");
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednseday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentYear = currentTime.getFullYear();
let currentMonth = months[currentTime.getMonth()];
let currentDay = days[currentTime.getDay()];
let currentDate = currentTime.getDate();
let currentHour = currentTime.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMin = currentTime.getMinutes();
if (currentMin < 10) {
  currentMin = `0${currentMin}`;
}
let currentClock = `${currentHour}:${currentMin}`;
let formatDate = `${currentMonth} ${currentDate}, ${currentYear}`;

challenge.innerHTML = `${currentClock} <br /> ${formatDate} <br /> ${currentDay}`;
console.log(currentClock);

function switchToF(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}
function switchToC(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 21;
}
let fahreinheitLink = document.querySelector("#fahrenheit");
fahreinheitLink.addEventListener("click", switchToF);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", switchToC);
search("Odesa");
