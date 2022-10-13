const APIKey = "f39d9467ef1aba260c6801b3458f906e";

const searchFormEl = document.getElementById("city-search");
const searchBtn = document.getElementById("search-btn");

function citySearch(event) {
    event.preventDefault();
    $("#current-day-result").removeAttr("style");
    $("#five-day-result").removeAttr("style");
    clearCurrentResult();
    searchHistoryStore();
    returnResultsCurrentDay();
    returnResultsFiveDay();
    returnFiveDayDate();
    pastCityRestore()
    clickCounter++;
    return;
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

function searchHistoryStore() {
    userCityEntry = $("#user-input").val()
    console.log(userCityEntry);
    localStorage.setItem("City Search", userCityEntry);
    const previousCities = localStorage.getItem("City Search");
    const pastCitySearchEl = document.getElementById("search-history");

    let pastCityBtn = document.createElement("button");
    pastCityBtn.type = "submit";
    pastCityBtn.classList.add("btn", "btn-block", "past-city",);
    pastCityBtn.id = userCityEntry
    pastCityBtn.setAttribute("style", "background-color: #C0A080");
    pastCityBtn.textContent = previousCities;
    pastCitySearchEl.appendChild(pastCityBtn);

};

function returnResultsCurrentDay() {
    userCityEntry = $("#user-input").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userCityEntry + "&appid=" + APIKey + "&units=metric";
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            console.log(data);

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

            // Fetch request to return UV Index result and give it background colour
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
                    if (uvIndex < 3) {
                        $(uvIndexResult).css({ "background-color": "green", "color": "#EFEFEF", "font-weight": "bold" });
                    } else if (uvIndex === 3 || uvIndex < 6) {
                        $(uvIndexResult).css({ "background-color": "yellow", "font-weight": "bold" });
                    } else if (uvIndex === 6 || uvIndex < 8) {
                        $(uvIndexResult).css({ "background-color": "orange", "color": "#EFEFEF", "font-weight": "bold" });
                    } else if (uvIndex === 8 || uvIndex < 11) {
                        $(uvIndexResult).css({ "background-color": "red", "color": "#EFEFEF", "font-weight": "bold" });
                    } else if (uvIndex === 11 || uvIndex > 11) {
                        $(uvIndexResult).css({ "background-color": "purple", "color": "#EFEFEF", "font-weight": "bold" });
                    }
                })

        })
};