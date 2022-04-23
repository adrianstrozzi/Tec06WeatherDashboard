// API Key = 73eea34921fc05972219d902c215429f

// Global Variables

let key = "73eea34921fc05972219d902c215429f";
let inputCityName = document.getElementById("inputCityName")
let searchBtn = document.getElementById("searchBtn");
let cityNameTitle = document.getElementById("cityNameTitle")

// Variables for Main City Display

let cityTemp = document.getElementById("cityTemp");
let cityWind = document.getElementById("cityWind");
let cityHumidity = document.getElementById("cityHumidity");
let cityUv = document.getElementById("cityUv");
let iconContainer = document.getElementById("iconContainer")
let uvContainer = document.getElementById("uvContainer");

// Variables to get current day date

let today = new Date();

// Variables to get 5 days future dates

let tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)

let tomorrowOne = new Date()
tomorrowOne.setDate(tomorrowOne.getDate() + 2)

let tomorrowTwo = new Date()
tomorrowTwo.setDate(tomorrowTwo.getDate() + 3)

let tomorrowThree = new Date()
tomorrowThree.setDate(tomorrowThree.getDate() + 4)

let tomorrowFour = new Date()
tomorrowFour.setDate(tomorrowFour.getDate() + 5)

// Variables for Day Date

let dayOneDate = document.getElementById("dayOneDate")
let dayTwoDate = document.getElementById("dayTwoDate")
let dayThreeDate = document.getElementById("dayThreeDate")
let dayFourDate = document.getElementById("dayFourDate")
let dayFiveDate = document.getElementById("dayFiveDate")


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


function getCityWeather() {
  let city = inputCityName.value;

  // Fetch Data by City Name

  let weatherRequest = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&appid=" + key

  fetch(weatherRequest)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      // Once data from City is fetched get correspoding "lat" and "lon" to use in next API call

      let lat = data.coord.lat
      let lon = data.coord.lon

      // Get current city icon

      let currentCityIcon = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";

      let currentCityUv = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + key;

      iconContainer.innerHTML = "<img src=" + currentCityIcon + ">"

      cityNameTitle.innerHTML = data.name + " " + "(" + today.toLocaleDateString("en-US") + ")" + " "
      cityTemp.innerHTML = "Temperature: " + data.main.temp + " °C"
      cityWind.innerHTML = "Wind: " + data.wind.speed + " MPH"
      cityHumidity.innerHTML = "Humidity: " + data.main.humidity + " %"

      fetch(currentCityUv)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          // cityUv.innerHTML = "UV Index: "
          // cityUv.innerHTML = "UV Index: " + data.current.uvi
          uvContainer.innerHTML = data.current.uvi
          uvIndex = Math.round(data.current.uvi)
          console.log(uvIndex);
          if (uvIndex === 0 && uvIndex <= 2) {
            uvContainer.classList.remove("uv-container-moderate", "uv-container-high")
            uvContainer.classList.add("uv-container-low")
          } else if (uvIndex >= 3 && uvIndex <= 5) {
            uvContainer.classList.remove("uv-container-high", "uv-container-low")
            uvContainer.classList.add("uv-container-moderate")
          } else if (uvIndex >= 6) {
            uvContainer.classList.remove("uv-container-moderate", "uv-container-low")
            uvContainer.classList.add("uv-container-high")
          }
        })
    });
}

// Function that outputs 5 Day Forecast

function getFiveDaysWeather() {
  let city = inputCityName.value;

  // Fetch Data by City Name

  let weatherRequest = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric" + "&APPID=" + key;

  fetch(weatherRequest)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      // Once data from City is fetched get correspoding "lat" and "lon" to use in next API call

      let lat = data.city.coord.lat
      let lon = data.city.coord.lon

      // Fetch Daily data with "lat" and "lon" and exclude other searches like hourly data.

      let currentCityFiveDays = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&exclude=current,minutely,hourly,alerts&appid=" + key;


      fetch(currentCityFiveDays)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);

          // Add date and change to String

          dayOneDate.innerHTML = tomorrow.toLocaleDateString("en-US")
          dayTwoDate.innerHTML = tomorrowOne.toLocaleDateString("en-US")
          dayThreeDate.innerHTML = tomorrowTwo.toLocaleDateString("en-US")
          dayFourDate.innerHTML = tomorrowThree.toLocaleDateString("en-US")
          dayFiveDate.innerHTML = tomorrowFour.toLocaleDateString("en-US")

          // Variables to define how to get weather icon

          let cityIconOne = "https://openweathermap.org/img/wn/" + data.daily[0].weather[0].icon + ".png";
          let cityIconTwo = "https://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + ".png";
          let cityIconThree = "https://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + ".png";
          let cityIconFour = "https://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + ".png";
          let cityIconFive = "https://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + ".png";

          // Add corresponding weather icon for 5 Days

          iconContainerDayOne.innerHTML = "<img src=" + cityIconOne + ">"
          iconContainerDayTwo.innerHTML = "<img src=" + cityIconTwo + ">"
          iconContainerDayThree.innerHTML = "<img src=" + cityIconThree + ">"
          iconContainerDayFour.innerHTML = "<img src=" + cityIconFour + ">"
          iconContainerDayFive.innerHTML = "<img src=" + cityIconFive + ">"

          // Get 5 Days Temperature


          tempDayOne.innerHTML = "Temperature: " + data.daily[0].temp.day + " °C"
          tempDayTwo.innerHTML = "Temperature: " + data.daily[1].temp.day + " °C"
          tempDayThree.innerHTML = "Temperature: " + data.daily[2].temp.day + " °C"
          tempDayFour.innerHTML = "Temperature: " + data.daily[3].temp.day + " °C"
          tempDayFive.innerHTML = "Temperature: " + data.daily[4].temp.day + " °C"

          // Get 5 Days Wind


          windDayOne.innerHTML = "Wind: " + data.daily[0].wind_speed + " MPH"
          windDayTwo.innerHTML = "Wind: " + data.daily[1].wind_speed + " MPH"
          windDayThree.innerHTML = "Wind: " + data.daily[2].wind_speed + " MPH"
          windDayFour.innerHTML = "Wind: " + data.daily[3].wind_speed + " MPH"
          windDayFive.innerHTML = "Wind: " + data.daily[4].wind_speed + " MPH"

          // Get 5 Days Humidity

          humidityDayOne.innerHTML = "Humidity: " + data.daily[0].humidity + " %"
          humidityDayTwo.innerHTML = "Humidity: " + data.daily[1].humidity + " %"
          humidityDayThree.innerHTML = "Humidity: " + data.daily[2].humidity + " %"
          humidityDayFour.innerHTML = "Humidity: " + data.daily[3].humidity + " %"
          humidityDayFive.innerHTML = "Humidity: " + data.daily[4].humidity + " %"
        })
    });
}


// Add Event Listener to detect "Enter" key in Input and submit data 

inputCityName.addEventListener("keypress", function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    searchBtn.click();
  }
});

// function saveLastCity() {
//   let lastCity = cityNameTitle.textContent
//   localStorage.setItem("lastCity", JSON.stringify(lastCity));
// }

// Executes functions for current weather and 5 day forecast

searchBtn.addEventListener('click', getCityWeather)
searchBtn.addEventListener('click', getFiveDaysWeather)