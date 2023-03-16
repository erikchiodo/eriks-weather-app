var currentDay = dayjs();
var currentTemp = $("#current-temp");
var currentWind = $("#current-wind");
var currentHumidity = $("#current-humidity");
var searchResult = $("#search-result");
var searchCity = $("#search-city");
var currentCityDate = $("#current-city-date");
var currentDayIcon = $("#current-icon");
console.log(searchCity);

// testUrl = http://api.openweathermap.org/geo/1.0/direct?q=NewYork&appid=ba368f94dc661d16d9e70c0b63cd68a9

$(function () {
  function getGeoCode(city) {
    var geoURL =
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
      city +
      "&appid=ba368f94dc661d16d9e70c0b63cd68a9";
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
        var locationLat = geoData[0].lat;
        var locationLong = geoData[0].lon;
        getWeather(locationLat, locationLong);
      });
  }

  function getWeather(lat, long) {
    // Replace testURL with weatherURL once you resolve issue with undefined variables
    var weatherURL =
      "http://api.openweathermap.org/data/2.5/forecast?lat=" +
      lat +
      "&lon=" +
      long +
      "&limit=5&units=imperial&appid=ba368f94dc661d16d9e70c0b63cd68a9";

    fetch(weatherURL)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          alert("Unable to retrieve data");
        }
      })
      .then(function (weatherData) {
        getCurrentDay(weatherData);
        getFiveDayFore(weatherData);
      });
  }

  function getCurrentDay(currentData) {
    console.log(currentData);
    currentCityDate.text(
      currentData.city.name + " " + "(" + currentDay.format("MM/DD/YY") + ")"
    );
    currentDayIcon.attr(
      "src",
      "http://openweathermap.org/img/wn/" +
        currentData.list[0].weather[0].icon +
        "@2x.png"
    );
    currentTemp.text("Temp:" + currentData.list[0].main.temp + "°F");
    currentWind.text("Wind:" + currentData.list[0].wind.speed + "MPH");
    currentHumidity.text("Humidity:" + currentData.list[0].main.humidity + "%");
  }

  function getFiveDayFore(fiveDayData) {
    console.log(fiveDayData);
    for (var day = 7; day <= 39; day += 8) {
      console.log(fiveDayData.list[day]);
      var eachDay = `
        <div id="day-one" class="col-12 col-lg-2">
        <p>Temp:${fiveDayData.list[day].main.temp}</p>
          <p>Wind:${fiveDayData.list[day].wind.speed}</p>
          <p>Humidity:${fiveDayData.list[day].main.humidity}</p>
        </div>`;
      $("#five-day-forecast").append(eachDay);
    }
  }

  // addCityToLocal takes in a string and returns nothing
  // This function is designed to add the searched city to an array in localStorage called cities
  // If the city is already there, then the city will not be added.
  function addCityToLocal(city) {
    var localCities = localStorage.getItem("cities");

    // if localCities is null, create a empty cityArray. else, parse current cityArray (value from key)
    if (localCities == null) {
      // Add empty array cities to local storage
      var cityArray = [];
    } else {
      //get cityArray from localStorage json
      // Parse localCities to city array - fix this syntax
      var cityArray = JSON.parse(localCities);
    }

    // If city is not contained in cityArray, then add city to cityArray.
    if (!cityArray.includes(city)) {
      cityArray.push(city);
    }
    // encode cityArray back into localStorage under "cities"
    localStorage.setItem("cities", JSON.stringify(cityArray));

    // Calling Method to create City button with cities added to Local Storage

    showCities(cityArray);
  }

  function showCities(localcities) {}

  $("#submit-btn").on("click", function (event) {
    event.preventDefault();
    var city = searchCity.val();
    console.log(city);
    if (city) {
      addCityToLocal(city);
      getGeoCode(city);
    } else if (city === "") {
      alert("Please Try again");
    }
  });
});
