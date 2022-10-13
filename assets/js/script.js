const APIKey = "f39d9467ef1aba260c6801b3458f906e";

const searchFormEl = document.getElementById("city-search");
const searchBtn = document.getElementById("search-btn");
var userCityEntry;
const resultsDisplayEl = $("#current-day-result");
const fiveDayForecastEl = $("#five-day-result");

searchBtn.addEventListener("click", citySearch);

function citySearch(event) {
    event.preventDefault();
    $("#current-day-result").removeAttr("style");
    $("#five-day-result").removeAttr("style");
    clearCurrentResult();
    searchHistoryStore();
    returnResultsCurrentDay();
    returnResultsFiveDay();
    returnFiveDayDate();
    return;
};

function returnResultsCurrentDay() {
    userCityEntry = $("#user-input").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userCityEntry + "&appid=" + APIKey + "&units=metric";
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            var cityName = data.name;
            var temperature = data.main.temp;
            var wind = data.wind.speed;
            var humidity = data.main.humidity;
            var weatherIconCode = data.weather[0].icon;
            var weatherIconURL = "http://openweathermap.org/img/wn/" + weatherIconCode + ".png"
            var date = moment().format(" (DD/MM/YYYY) ");


            $("#results-display").append(cityName + date);
            $("#weather-icon").attr("src", weatherIconURL);
            $("#temperature").append("Temp: " + temperature + "\xB0C");
            $("#wind").append("Wind: " + wind + " km/h");
            $("#humidity").append("Humidity: " + humidity + "%");

            var uvIndexResult = document.querySelector("#uvIndexResult");
            var longitude = data.coord.lon;
            var latitude = data.coord.lat;
            var uvIndexURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey;
            fetch(uvIndexURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    var uvIndex = data.value;
                    $(uvIndexResult).append(uvIndex);
                })

        })
};

function returnFiveDayDate() {
    var dayOne = moment().add(1, "day").format("DD/MM/YYYY");
    var dayTwo = moment().add(2, "days").format("DD/MM/YYYY");
    var dayThree = moment().add(3, "days").format("DD/MM/YYYY");
    var dayFour = moment().add(4, "days").format("DD/MM/YYYY");
    var dayFive = moment().add(5, "days").format("DD/MM/YYYY");

    $("#first-day").prepend(dayOne);
    $("#second-day").prepend(dayTwo);
    $("#third-day").prepend(dayThree);
    $("#fourth-day").prepend(dayFour);
    $("#fifth-day").prepend(dayFive);
};

function searchHistoryStore() {
    userCityEntry = $("#user-input").val()
    localStorage.setItem("City Search", userCityEntry);
    const previousCities = localStorage.getItem("City Search");
    const pastCitySearchEl = document.getElementById("search-history");

    let pastCityBtn = document.createElement("button");
    pastCityBtn.type = "submit";
    pastCityBtn.classList.add("btn", "btn-block", "past-city",);
    pastCityBtn.id = userCityEntry
    pastCityBtn.setAttribute("style", "background-color: #D6CDA4");
    pastCityBtn.textContent = previousCities;
    pastCitySearchEl.appendChild(pastCityBtn);

};

function returnResultsFiveDay() {
    userCityEntry = $("#user-input").val()
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userCityEntry + "&appid=" + APIKey + "&units=metric";
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var fiveDayForecastEls = document.querySelectorAll(".five-day");
            for (i = 0; i < fiveDayForecastEls.length; i++) {
                fiveDayForecastEls[i].innerHTML = "";

                var forecastIndex = i + 4;
                var weatherIconCode = (data.list[forecastIndex].weather[0].icon);
                var weatherIconURL = "http://openweathermap.org/img/wn/" + weatherIconCode + ".png"
                $("this").attr("src", weatherIconURL);

                var futureForecastTemperature = (data.list[forecastIndex].main.temp);
                var futureForecastWind = (data.list[forecastIndex].wind.speed);
                var futureForecastHumidity = (data.list[forecastIndex].main.humidity);
                var dayOne = moment().add(1, "day").format("DD/MM/YYYY");

                $("#first-day").prepend(dayOne);
                $("#first-day").append(
                    "<br>" + "<br>" + "Temp: " +
                    futureForecastTemperature +
                    "<br>" + "<br>" + "Wind: " +
                    futureForecastWind +
                    "<br>" + "<br>" + "Humidity: " +
                    futureForecastHumidity);


                forecastIndex = i + 12;
                weatherIconCode = (data.list[forecastIndex].weather[0].icon);
                weatherIconURL = "http://openweathermap.org/img/wn/" + weatherIconCode + ".png"
                futureForecastTemperature = (data.list[forecastIndex].main.temp);
                futureForecastWind = (data.list[forecastIndex].wind.speed);
                futureForecastHumidity = (data.list[forecastIndex].main.humidity);

                $("#weather-icon-second").attr("src", weatherIconURL);
                $("#second-day").append(
                    "<br>" + "Temp: " +
                    futureForecastTemperature +
                    "<br>" + "<br>" + "Wind: " +
                    futureForecastWind +
                    "<br>" + "<br>" + "Humidity: " +
                    futureForecastHumidity);

                forecastIndex = i + 20;
                weatherIconCode = (data.list[forecastIndex].weather[0].icon);
                weatherIconURL = "http://openweathermap.org/img/wn/" + weatherIconCode + ".png"
                futureForecastTemperature = (data.list[forecastIndex].main.temp);
                futureForecastWind = (data.list[forecastIndex].wind.speed);
                futureForecastHumidity = (data.list[forecastIndex].main.humidity);

                $("#weather-icon-third").attr("src", weatherIconURL);
                $("#third-day").append(
                    "<br>" + "Temp: " +
                    futureForecastTemperature +
                    "<br>" + "<br>" + "Wind: " +
                    futureForecastWind +
                    "<br>" + "<br>" + "Humidity: " +
                    futureForecastHumidity);

                forecastIndex = i + 28;
                weatherIconCode = (data.list[forecastIndex].weather[0].icon);
                weatherIconURL = "http://openweathermap.org/img/wn/" + weatherIconCode + ".png"
                futureForecastTemperature = (data.list[forecastIndex].main.temp);
                futureForecastWind = (data.list[forecastIndex].wind.speed);
                futureForecastHumidity = (data.list[forecastIndex].main.humidity);

                $("#weather-icon-fourth").attr("src", weatherIconURL);
                $("#fourth-day").append(
                    "<br>" + "Temp: " +
                    futureForecastTemperature +
                    "<br>" + "<br>" + "Wind: " +
                    futureForecastWind +
                    "<br>" + "<br>" + "Humidity: " +
                    futureForecastHumidity);

                forecastIndex = i + 36;
                weatherIconCode = (data.list[forecastIndex].weather[0].icon);
                weatherIconURL = "http://openweathermap.org/img/wn/" + weatherIconCode + ".png"
                futureForecastTemperature = (data.list[forecastIndex].main.temp);
                futureForecastWind = (data.list[forecastIndex].wind.speed);
                futureForecastHumidity = (data.list[forecastIndex].main.humidity);

                $("#weather-icon-fifth").attr("src", weatherIconURL);
                $("#fifth-day").append(
                    "<br>" + "Temp: " +
                    futureForecastTemperature +
                    "<br>" + "<br>" + "Wind: " +
                    futureForecastWind +
                    "<br>" + "<br>" + "Humidity: " +
                    futureForecastHumidity);
                return;
            }

        })
};

function clearCurrentResult() {
    $("#results-display").html("");
    $("#temperature").html("");
    $("#wind").html("");
    $("#humidity").html("");
    $("#uvIndexResult").html("");
    $("#first-day").html("");
    $("#second-day").html("");
    $("#third-day").html("");
    $("#fourth-day").html("");
    $("#fifth-day").html("");

};


