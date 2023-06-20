function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

//Challenge 1
function displayWeatherLocation(response) {
  let h1 = document.querySelector("#city");
  let cityInput = response.data.name;
  h1.innerHTML = cityInput;
  let temperature = document.querySelector("#temperature");
  let temp = Math.round(response.data.main.temp);
  temperature.innerHTML = temp;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
function search(city) {
  let apiKey = "aa851b44fbd99753d43ed1d333312814";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  let apiUrl = `${apiEndpoint}&q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherLocation);
}
function handleSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#search-input-text").value;
  search(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function toCelcius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = 39;
}
function toFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = 102;
}

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", toCelcius);
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", toFahrenheit);

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);
//Bonus
function showPosition(position) {
  let apiKey = "fe7401e9bafa60abd44824500bb94f5f";

  let units = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}&lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherLocation);
}

function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

//Bonus
let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", currentPosition);

search("Yangon");
