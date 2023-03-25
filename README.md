# eriks-weather-app

## Description

The goal of this project was to use Server-side APIs to create a weather web application that would take city in as an input and retrieve weather information from Weather API. From the weather API it displays current day Temp, Wind, Humidity, Weather Icon (w/ City Name and Date) and 5 Day Forecast with the same attributes.

## User Story

AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly


## Acceptance Criteria

GIVEN a weather dashboard with form inputs:

    > WHEN I search for a city
    > THEN I am presented with current and future conditions for that city and that city is added to the search history

    > WHEN I view current weather conditions for that city
    > THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed

    > WHEN I view future weather conditions for that city
    > THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

    > WHEN I click on a city in the search history
    > THEN I am again presented with current and future conditions for that city


## Screenshot

This is my Homepage. You'll see a Search Bar, Search Button, and some of my previous search results. There is also a sections
![Screen Shot 2023-03-25 at 12 18 31 AM](https://user-images.githubusercontent.com/122952630/227695698-d2dbb9a5-a720-4928-b518-349a6539d5e5.png)

When you type city in search bar and hit submit, it will retrieve Current and 5-Day Forecast data and display on the page. Just a note, that you need to refresh the page to display the button even though the value is in local storage. You'll see in my code that I have a ShowCities function commented out on ln 122. When I uncomment this line it will show the city as soon as the onclick button is triggered, but you're unable to click the button and have it display the city data. So to adhere to the acceptance criteria I commented out this code. So the user will need to refresh the page to see the search result.

![Screen Shot 2023-03-25 at 1 34 41 AM](https://user-images.githubusercontent.com/122952630/227699236-4d7295eb-8e49-4e3c-aa09-091e528473f5.png)

For each search that the user provides it will save to local storage and add to page once you refresh (stated above). If you click it will retrieve data for that city. Additionally, I put in several guard clause so if you submit the same city it will display the data without adding the value to local storage and thus creating a duplicate button.

![Screen Shot 2023-03-25 at 1 43 19 AM](https://user-images.githubusercontent.com/122952630/227699536-df5ef841-003e-41b0-a048-e260c003a3f0.png)
