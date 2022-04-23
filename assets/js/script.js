// API Key = 73eea34921fc05972219d902c215429f

// Global Variables

let key = "73eea34921fc05972219d902c215429f";
let inputCityName = document.getElementById("inputCityName")
let searchBtn = document.getElementById("searchBtn");
let cityName = document.getElementById("cityName")

// Variables for Main City Display

let cityTemp = document.getElementById("cityTemp");
let cityWind = document.getElementById("cityWind");
let cityHumidity = document.getElementById("cityHumidity");
let cityUv = document.getElementById("cityUv");
let iconContainer = document.getElementById("iconContainer")
let uvContainer = document.getElementById("uvContainer");

// Variables to get current day date

let today = new Date();
let date = today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear();

// Variables for 5 Day Forecast Icons

let iconContainerDayOne = document.getElementById("iconContainerDayOne")
let iconContainerDayTwo = document.getElementById("iconContainerDayTwo")
let iconContainerDayThree = document.getElementById("iconContainerDayThree")
let iconContainerDayFour = document.getElementById("iconContainerDayFour")
let iconContainerDayFive = document.getElementById("iconContainerDayFive")


// Variables for 5 Day Temperature, Wind and Humidity

let tempDayOne = document.getElementById("tempDayOne")
let tempDayTwo = document.getElementById("tempDayTwo")
let tempDayThree = document.getElementById("tempDayThree")
let tempDayFour = document.getElementById("tempDayFour")
let tempDayFive = document.getElementById("tempDayFive")


let windDayOne = document.getElementById("windDayOne")
let windDayTwo = document.getElementById("windDayTwo")
let windDayThree = document.getElementById("windDayThree")
let windDayFour = document.getElementById("windDayFour")
let windDayFive = document.getElementById("windDayFive")


let humidityDayOne = document.getElementById("humidityDayOne")
let humidityDayTwo = document.getElementById("humidityDayTwo")
let humidityDayThree = document.getElementById("humidityDayThree")
let humidityDayFour = document.getElementById("humidityDayFour")
let humidityDayFive = document.getElementById("humidityDayFive")


// Function that outputs City Info and UV Index


function getCityInfo() {
  let city = inputCityName.value;
  let weatherRequest = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&appid=" + key

  fetch(weatherRequest)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      let lat = data.coord.lat
      let lon = data.coord.lon

      let currentCityIcon = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
      let currentCityUv = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + key;

      iconContainer.innerHTML = "<img src=" + currentCityIcon + ">"

      cityName.innerHTML = data.name + " " + "(" + date + ")" + " "
      cityTemp.innerHTML = "Temperature: " + data.main.temp + " °C"
      cityWind.innerHTML = "Wind: " + data.wind.speed + " MPH"
      cityHumidity.innerHTML = "Humidity: " + data.main.humidity + " %"

      fetch(currentCityUv)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          cityUv.innerHTML = "UV Index: "
          // cityUv.innerHTML = "UV Index: " + data.current.uvi
          uvContainer.innerHTML = data.current.uvi
          uvIndex = Math.round(data.current.uvi)
          console.log(uvIndex);
          if (uvIndex === 0 || uvIndex <= 2) {
            uvContainer.classList.add("uv-container-low")
          } else if (uvIndex >= 3 || uvIndex <= 5) {
            uvContainer.classList.add("uv-container-moderate")
          } else if (uvIndex >= 6) {
            uvContainer.classList.add("uv-container-high")
          }
        })
    });
}

// Function that outputs 5 Day Forecast

function getFiveDays() {
  let city = inputCityName.value;
  let weatherRequest = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric" + "&APPID=" + key;

  fetch(weatherRequest)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      let lat = data.city.coord.lat
      let lon = data.city.coord.lon

      let currentCityFiveDays = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&exclude=current,minutely,hourly,alerts&appid=" + key;


      fetch(currentCityFiveDays)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          let cityIconOne = "https://openweathermap.org/img/wn/" + data.daily[0].weather[0].icon + ".png";
          let cityIconTwo = "https://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + ".png";
          let cityIconThree = "https://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + ".png";
          let cityIconFour = "https://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + ".png";
          let cityIconFive = "https://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + ".png";

          iconContainerDayOne.innerHTML = "<img src=" + cityIconOne + ">"
          iconContainerDayTwo.innerHTML = "<img src=" + cityIconTwo + ">"
          iconContainerDayThree.innerHTML = "<img src=" + cityIconThree + ">"
          iconContainerDayFour.innerHTML = "<img src=" + cityIconFour + ">"
          iconContainerDayFive.innerHTML = "<img src=" + cityIconFive + ">"


          tempDayOne.innerHTML = "Temperature: " + data.daily[0].temp.day + " °C"
          tempDayTwo.innerHTML = "Temperature: " + data.daily[1].temp.day + " °C"
          tempDayThree.innerHTML = "Temperature: " + data.daily[2].temp.day + " °C"
          tempDayFour.innerHTML = "Temperature: " + data.daily[3].temp.day + " °C"
          tempDayFive.innerHTML = "Temperature: " + data.daily[4].temp.day + " °C"


          windDayOne.innerHTML = "Wind: " + data.daily[0].wind_speed + " MPH"
          windDayTwo.innerHTML = "Wind: " + data.daily[1].wind_speed + " MPH"
          windDayThree.innerHTML = "Wind: " + data.daily[2].wind_speed + " MPH"
          windDayFour.innerHTML = "Wind: " + data.daily[3].wind_speed + " MPH"
          windDayFive.innerHTML = "Wind: " + data.daily[4].wind_speed + " MPH"


          humidityDayOne.innerHTML = "Humidity: " + data.daily[0].humidity + " %"
          humidityDayTwo.innerHTML = "Humidity: " + data.daily[1].humidity + " %"
          humidityDayThree.innerHTML = "Humidity: " + data.daily[2].humidity + " %"
          humidityDayFour.innerHTML = "Humidity: " + data.daily[3].humidity + " %"
          humidityDayFive.innerHTML = "Humidity: " + data.daily[4].humidity + " %"
        })
    });
}




inputCityName.addEventListener("keypress", function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    searchBtn.click();
  }
});


// function saveLastCity() {
//   let lastCity = cityName.textContent
//   localStorage.setItem("lastCity", JSON.stringify(lastCity));
// }

searchBtn.addEventListener('click', getCityInfo)
searchBtn.addEventListener('click', getFiveDays)