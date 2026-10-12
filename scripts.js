// Get weather info

// VISUAL CROSSING API KEY: BKCJWHGKVN7TN2PLK4YMYEXHZ

let input = document.querySelector("input");
let button = document.querySelector("button");

function getWeatherData(place) {

    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?key=BKCJWHGKVN7TN2PLK4YMYEXHZ`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        let temp = data.currentConditions.temp;
        let feelsLike = data.currentConditions.feelslike;
        let humidity = data.currentConditions.humidity;
        let icon = data.currentConditions.icon;
        let cloudCover = data.currentConditions.cloudcover;
        let sunrise = data.currentConditions.sunrise;
        let sunset = data.currentConditions.sunset;
        let uvIndex = data.currentConditions.uvindex;

        console.log({ temp, feelsLike, humidity, icon, cloudCover, sunrise, sunset, uvIndex });
    })

    .catch(function(err){
        console.error("Something went wrong")
    })


}

function getUserInput() {

    let chosenCity = input.value
    return chosenCity;

}

function stringFormatter(string) {

    let noSpaceArray = string.split(" ");
    let noSpaceTask = noSpaceArray.join("");
    let formattedString = noSpaceTask.toLowerCase();
  
    return formattedString;

}

button.addEventListener("click", (e) => {

    e.preventDefault();
    let city = getUserInput();

    let formattedCity = stringFormatter(city);
    
    getWeatherData(formattedCity);

})
