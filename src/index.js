let now = new Date();
let currentDay = now.getDay();
let currentHour = now.getHours();
let currentMinute = now.getMinutes();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let today = document.querySelector("#current-day");
today.innerHTML = days[currentDay];

let hour = document.querySelector("#current-hour");
hour.innerHTML = currentHour;

let minute = document.querySelector("#current-minute");
minute.innerHTML = currentMinute;

let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  sanFrancisco: {
    temp: 20.9,
    humidity: 100,
  },
  moscow: {
    temp: -5,
    humidity: 20,
  },
};

function forecast() {
  let city = prompt("Enter a city");

  if (city === "Paris") {
    alert(
      "It is currently " +
        weather.paris.temp +
        " in Paris with a humidity of " +
        weather.paris.humidity +
        "%"
    );
  } else if (city === "Tokyo") {
    alert(
      "It is currently " +
        weather.tokyo.temp +
        " in Tokyo with a humidity of " +
        weather.tokyo.humidity +
        "%"
    );
  } else if (city === "Lisbon") {
    alert(
      "It is currently " +
        weather.lisbon.temp +
        " in Lisbon with a humidity of " +
        weather.lisbon.humidity +
        "%"
    );
  } else if (city === "San Francisco") {
    alert(
      "It is currently " +
        weather.sanFrancisco.temp +
        " in San Francisco with a humidity of " +
        weather.sanFrancisco.humidity +
        "%"
    );
  } else if (city === "Moscow") {
    alert(
      "It is currently " +
        weather.moscow.temp +
        " in Moscow with a humidity of " +
        weather.moscow.humidity +
        "%"
    );
  } else {
    city = city.toLowerCase();
    alert(
      "Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+" +
        city
    );
  }
}

function changeTemperature(response) {
  let temperature = document.querySelector(".currentTemperature");
  temperature.innerHTML = Math.round(response.data.main.temp) + "°C";
}

function changeCityName(event) {
  event.preventDefault();

  let newCityName = document.querySelector("#city-name");
  let h1 = document.querySelector("h1");
  h1.innerHTML = newCityName.value;
  let units = "&units=metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${newCityName.value}&appid=b0c4e3d6536928938df05e87e36cbcb5${units}`;

  axios.get(apiURL).then(changeTemperature);
}

let submitButton = document.querySelector("#weather-form");
submitButton.addEventListener("submit", changeCityName);

function celsiusTemp() {
  let celsiusTemperature = document.querySelector(".currentTemperature");

  celsiusTemperature.innerHTML = 18 + "°C";
}
let celsiusLink = document.querySelector("#celsius-temp");
celsiusLink.addEventListener("click", celsiusTemp);

function fahrenheitTemp() {
  let h3 = document.querySelector("h3");
  h3.innerHTML = 64 + "°F";
}
let fahrenheitLink = document.querySelector("#fahrenheit-temp");
fahrenheitLink.addEventListener("click", fahrenheitTemp);

function displayLocation(response) {
  let newCityName = document.querySelector("h1");
  newCityName.innerHTML = response.data.name;

  let temperature = document.querySelector(".currentTemperature");
  temperature.innerHTML = Math.round(response.data.main.temp) + "°C";
}

function mapLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b0c4e3d6536928938df05e87e36cbcb5&units=metric`;
  axios.get(apiLocation).then(displayLocation);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(mapLocation);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getLocation);
