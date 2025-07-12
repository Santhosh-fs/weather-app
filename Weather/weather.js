// Declare DOM Elements
const search = document.querySelector(".search");
const searchbtn = document.querySelector(".searchbtn");
const weatherimg = document.querySelector(".weatherimg");
const tempElement = document.querySelector(".temp");
const cityElement = document.querySelector(".city");
const humElement = document.querySelector(".hum");
const winElement = document.querySelector(".win");
const error = document.querySelector("#error");
const countryElement = document.querySelector("#counth2");

// API Initialization
const apikey = "bd3bedd8aa3f86b990702c01e9f87955";
const apiurl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Async function to Fetch Weather Data
async function Getweather(city) {
  const response = await fetch(apiurl + city + `&appid=${apikey}`);
  const data = await response.json();
  console.log(data);

  if (response.ok) {
    error.innerHTML = "";
    cityElement.innerHTML = data.name;
    countryElement.innerHTML = data.sys.country;
    tempElement.innerHTML = Math.trunc(data.main.temp) + "°C";
    humElement.innerHTML = data.main.humidity + " " + "%";
    winElement.innerHTML = data.wind.speed + " " + "Km/h";
  } else if (!response.ok) {
    error.style.display = "block";
    cityElement.innerHTML = "Invaid";
    countryElement.innerHTML = "";
    tempElement.innerHTML = "°C";
    humElement.innerHTML = "%";
    winElement.innerHTML = "Km/h";
  }

  if (data.weather[0].main == "Clouds") {
    weatherimg.src = "./asset/cloud.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherimg.src = "./asset/fog.png";
  } else if (data.weather[0].main == "Rain") {
    weatherimg.src = "./asset/rainy.png";
  } else if (data.weather[0].main == "Clear") {
    weatherimg.src = "./asset/sunny.png";
  }
  console.error("Error fetching weather data:", error.message);
}
searchbtn.addEventListener("click", function () {
  Getweather(search.value);
  search.value = "";
});
