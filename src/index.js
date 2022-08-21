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

function formatDay(timeindex) {
  let date = new Date(timeindex * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2 forecast-column">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function turnCoordinates(coordinates) {
  let apiKey = `8a1943482a34a88b396522ac81951d3a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
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
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#weather-icon")
    .setAttribute("alt", response.data.weather[0].description);
  celsiusTemp = Math.round(response.data.main.temp);

  turnCoordinates(response.data.coord);
}

function search(cityName) {
  let apiKey = `8a1943482a34a88b396522ac81951d3a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function findCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city-input").value;
  search(inputCity);
}

let currentCity = document.querySelector("#searchTab");
currentCity.addEventListener("submit", findCity);

search("Odesa");

/* function switchToF(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahreinheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}
function switchToC(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahreinheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

displayForecast();


let fahreinheitLink = document.querySelector("#fahrenheit");
fahreinheitLink.addEventListener("click", switchToF);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", switchToC); */
