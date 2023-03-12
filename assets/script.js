var currentDay = dayjs();
var currentTemp = $("#current-temp");
var currentWind = $("#current-Wind");
var currentHumidity = $("#current-Humidity");
var searchResult = $("#search-result");
var searchCity = $("#search-city");
console.log(searchCity);

// testUrl = http://api.openweathermap.org/geo/1.0/direct?q=NewYork&appid=ba368f94dc661d16d9e70c0b63cd68a9

$(function () {
  function getGeoCode(city) {
    var geoURL =
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
      city +
      "&appid=ba368f94dc661d16d9e70c0b63cd68a9";
    console.log(geoURL);
    fetch(geoURL)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          alert("Unable to retrieve data");
          return;
        }
      })
      .then(function (geoData) {
        console.log(geoData);
        var locationLat = geoData[1];
        console.log(locationLat);
        var locationLong = geoData[2];
        console.log(locationLong);
        getWeather(locationLat, locationLong);
      });
  }
  function getWeather(lat, long) {
    var weatherURL =
      "api.openweathermap.org/data/2.5/forecast?lat=" +
      lat +
      "&lon=" +
      long +
      "&appid=ba368f94dc661d16d9e70c0b63cd68a9";
    console.log(weatherURL);
    fetch(weatherURL)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          alert("Unable to retrieve data");
        }
      })
      .then(function (weatherData) {
        console.log(weatherData);
      });
  }
  $("#submit-btn").on("click", function (event) {
    event.preventDefault();
    var city = searchCity.val();
    console.log(city);
    if (city) {
      getGeoCode(city);
    } else if (city === "") {
      alert("Please Try again");
    }
  });
});
