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
      }});
      .then(function (data) {
      console.log(data);
  })
  
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
}});
