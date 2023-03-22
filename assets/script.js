$(function () {
  var currentDay = dayjs();
  var currentTemp = $("#current-temp");
  var currentWind = $("#current-wind");
  var currentHumidity = $("#current-humidity");
  var searchResult = $("#search-result");
  var searchCity = $("#search-city");
  var currentCityDate = $("#current-city-date");
  var currentDayIcon = $("#current-icon");
  var localCities = JSON.parse(localStorage.getItem("cities")) || [];

  // testUrl = http://api.openweathermap.org/geo/1.0/direct?q=NewYork&appid=ba368f94dc661d16d9e70c0b63cd68a9

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
    $("#five-day-forecast").html("");
    for (var day = 7; day <= 39; day += 8) {
      var fiveDayDate = fiveDayData.list[day].dt_txt;
      var eachDay = `
        <div id="day-one" class="col-12 col-lg-2">
      
      <h2 id="current-fore-city">${fiveDayDate.split(" ")[0]}</h2>
      <img src="${
        "http://openweathermap.org/img/wn/" +
        fiveDayData.list[day].weather[0].icon +
        "@2x.png"
      }" alt="">
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
    if (!localCities.includes(city)) {
      localCities.push(city);
    }

    localStorage.setItem("cities", JSON.stringify(localCities));
    console.log(localCities);
  }

  function showCities() {
    searchResult.html("");
    for (var i = 0; i < localCities.length; i++) {
      var cityButton = `
        <button class = "city-btn btn btn-light">${localCities[i]}</button>
        <br>`;
      searchResult.append(cityButton);
    }
  }
  showCities();

  function start(city) {
    console.log(city);
    if (city) {
      addCityToLocal(city);
      getGeoCode(city);
    } else if (city === "") {
      alert("Please Try again");
    }
  }

  $("#submit-btn").on("click", function (event) {
    event.preventDefault();
    var city = searchCity.val();
    start(city);
  });

  var cityButton = $(".city-btn");
  cityButton.on("click", function (event) {
    event.stopPropagation();
    var cityText = event.target.textContent;
    start(cityText);
  });
});
