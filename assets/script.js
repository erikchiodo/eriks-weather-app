var currentDay = dayjs();
var currentTemp = $("#current-temp");
var currentWind = $("#current-Wind");
var currentHumidity = $("#current-Humidity");
var searchResult = $("#search-result");
var searchCity = $("#search-city");
console.log(searchCity);

$(function () {
  function getGeoCode(city) {
    var geoURL =
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
      city +
      "&appid=ba368f94dc661d16d9e70c0b63cd68a9";
    fetch(geoURL);
  }

  $("#submit-btn").on("click", function (event) {
    event.preventDefault();
    var city = searchCity.value;
    console.log(city);
    if (city) {
      getGeoCode(city);
    } else if (city === "") {
      alert("Please Try again");
    }
  });
});
