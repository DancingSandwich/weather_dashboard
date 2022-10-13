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