// Get weather info

// VISUAL CROSSING API KEY: BKCJWHGKVN7TN2PLK4YMYEXHZ

let input = document.querySelector("input");
let button = document.querySelector("button");
let weatherDisplayContainer = document.querySelector(".weather-display")

function getWeatherData(place) {

    return fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?key=BKCJWHGKVN7TN2PLK4YMYEXHZ`)
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

        return { temp, feelsLike, humidity, icon, cloudCover, sunrise, sunset, uvIndex };

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

button.addEventListener("click", async (e) => {

    e.preventDefault();
    let city = getUserInput();

    let formattedCity = stringFormatter(city);

    let weatherData = await getWeatherData(formattedCity);

    let tempContainer = containerMaker("temp-container");
    let tempHeading = textBoxMaker("h2", "temp-heading", `Temperature in ${city}`);
    let tempData = textBoxMaker("p", "temp-data", `${weatherData.temp}`);
    let changeUnitButton = buttonMaker("change-unit-button", "Change to celsius");

    weatherDisplayContainer.appendChild(tempContainer);
    tempContainer.appendChild(tempHeading);
    tempContainer.appendChild(tempData);
    tempContainer.appendChild(changeUnitButton);

})

function farenheitToCelsius(farNumber) {

    let celNumber = (farNumber - 32) * 5/9;

    return console.log(celNumber)

}

function celsiusToFarenheit(celNumber) {

    let farNumber = (celNumber * 9/5) + 32;
    return console.log(farNumber)

}

function containerMaker(classContent) {

    let container = document.createElement("div");
    container.classList.add(`${classContent}`);

    return container

}

function textBoxMaker(boxType, classContent, textContent) {

    let textBox = document.createElement(`${boxType}`);
    textBox.classList.add(`${classContent}`);
    textBox.textContent = `${textContent}`;

    return textBox

}

function buttonMaker(classContent, textContent) {

    let button = document.createElement("button");
    button.classList.add(`${classContent}`);
    button.textContent = `${textContent}`;

    return button;

}



