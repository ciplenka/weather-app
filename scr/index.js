let now = new Date();

let time = document.querySelector(".time");
let todayDate = document.querySelector(".todayDate");
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();
let precipitation = document.querySelector("#precipitation");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let currentButton = document.querySelector("#current-button");
let apiKey = "ff19773665825f3257a251f0f13e66cd";
let dayMax = document.querySelector(".dayMax");
let dayMin = document.querySelector(".dayMin");

let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

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

let month = months[now.getMonth()];
time.innerHTML = `${hours}:${minutes}`;
todayDate.innerHTML = `${day} ${month} ${date}, ${year}`;

function getWeather(response) {
  console.log(response);
  let cityElement = document.querySelector(".myCity");
  cityElement.innerHTML = response.data.name;
  let cityElement1 = document.querySelector(".location");
  cityElement1.innerHTML = response.data.name;
  let country = document.querySelector(".country");
  country.innerHTML = response.data.sys.country;
  let temperature = document.querySelector(".mainTemperature");
  let temp = Math.round(response.data.main.temp);
  temperature.innerHTML = `${temp}°C`;
  precipitation.innerHTML = `Precipitation: ${response.data.main.temp}%`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${response.data.wind.speed}mph`;
  let maxTemp = Math.round(response.data.main.temp_max);
  dayMax.innerHTML = `Day | ${maxTemp}°C`;
  let minTemp = Math.round(response.data.main.temp_min);
  dayMin.innerHTML = `Night | ${minTemp}°C`;
}
function search(event) {
  event.preventDefault();
  let searchElement = document.querySelector("#search-city");
  let city = searchElement.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showCurrentLocation(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let apiKey = "ff19773665825f3257a251f0f13e66cd";

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(getWeather);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

currentButton.addEventListener("click", getCurrentLocation);
