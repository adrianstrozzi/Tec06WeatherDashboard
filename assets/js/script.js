// API Key = 73eea34921fc05972219d902c215429f

// Global Variables

let key = "73eea34921fc05972219d902c215429f";

let inputCityName = document.getElementById("inputCityName")
let searchBtn = document.getElementById("searchBtn");

let cityName = document.getElementById("cityName")
let cityTemp = document.getElementById("cityTemp");
let cityWind = document.getElementById("cityWind");
let cityHumidity = document.getElementById("cityHumidity");
let cityUv = document.getElementById("cityUv");
let iconContainer = document.getElementById("iconContainer")


let today = new Date();
let date = today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear();



function getCityInfo() {
  let city = inputCityName.value;
  let weatherRequest = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&appid=" + key

  fetch(weatherRequest)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let currentCityIcon = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";

      cityName.innerHTML = data.name + " " + "(" + date + ")" + " "
      iconContainer.innerHTML = "<img src=" + currentCityIcon + ">"
      cityTemp.innerHTML = data.main.temp + " °C"
      cityWind.innerHTML = data.wind.speed + " MPH"
      cityHumidity.innerHTML = data.main.humidity + " %"
    });
}

function saveLastCity() {
  let lastCity = cityName.textContent
  localStorage.setItem("lastCity", JSON.stringify(lastCity));
}




searchBtn.addEventListener('click', getCityInfo, saveLastCity);