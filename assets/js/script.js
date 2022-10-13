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