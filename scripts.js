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

// WHERE THE MAGIC HAPPENS

button.addEventListener("click", async (e) => {

    e.preventDefault();
    let city = getUserInput();

    let formattedCity = stringFormatter(city);

    let weatherData = await getWeatherData(formattedCity);
    let temp = weatherData.temp;
    let feelsLike = weatherData.feelsLike;
    let icon = weatherData.icon;

    tempSectionGenerator(temp, feelsLike, city);
    iconSectionGenerator(icon);

    
})

function farenheitToCelsius(farNumber) {

    let celNumber = (farNumber - 32) * 5/9;
    let oneDecimalNumber = celNumber.toFixed(1);

    return oneDecimalNumber;

}

function celsiusToFarenheit(celNumber) {

    let farNumber = (celNumber * 9/5) + 32;

    return farNumber

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

function tempSectionGenerator(actualTempValue, feelsLikeTempValue, cityValue) {

    let allTempContainer = containerMaker("all-temp-container");
    let tempContainer = containerMaker("temp-container");
    let feelsLikeContainer = containerMaker("feels-like-container");

    let tempHeading = textBoxMaker("h2", "temp-heading", `Temperature in ${cityValue}`);
    let tempData = textBoxMaker("p", "temp-data", `${actualTempValue} F`);
    tempData.dataset.degreeType = "Farenheit"

    let feelsLikeHeading = textBoxMaker("h2", "feels-like-heading", `Feels like:`);
    let feelsLikeData = textBoxMaker("p", "feels-like-data", `${feelsLikeTempValue} F`);

    let changeUnitButton = buttonMaker("change-unit-button", "Change to Celsius");

    weatherDisplayContainer.appendChild(allTempContainer);
    allTempContainer.appendChild(tempContainer);
    allTempContainer.appendChild(feelsLikeContainer);
    tempContainer.appendChild(tempHeading);
    tempContainer.appendChild(tempData);
    feelsLikeContainer.appendChild(feelsLikeHeading);
    feelsLikeContainer.appendChild(feelsLikeData);
    allTempContainer.appendChild(changeUnitButton);

    changeUnitButton.addEventListener("click", (e) => {

        e.preventDefault();

        if (tempData.dataset.degreeType === "Farenheit") {

            let celActualTemp = farenheitToCelsius(actualTempValue);
            let celFeelsLikeTemp = farenheitToCelsius(feelsLikeTempValue);
            changeUnitButton.textContent = "Change to Farenheit";
            tempData.textContent = `${celActualTemp} C`;
            feelsLikeData.textContent = `${celFeelsLikeTemp} C`;
            
            tempData.dataset.degreeType = "Celsius";

        }

        else {

            tempData.textContent = `${actualTempValue} F`;
            feelsLikeData.textContent = `${feelsLikeTempValue} F`
            tempData.dataset.degreeType = "Farenheit";

        }

    })

}


function svgCreator(uniqueString) {

    let svgContainer = containerMaker(`svg-container`);
    let svgString = `${uniqueString}`;

    svgContainer.innerHTML = svgString;

    return svgContainer;
}

function iconSectionGenerator(iconInfo) {

    let iconContainer = containerMaker("icon-container");

    if (iconInfo === "clear-day") {

        let currentIcon = svgCreator(`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12 1a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V2a1 1 0 0 1 1-1ZM12 19a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1ZM1 12a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H2a1 1 0 0 1-1-1ZM19 12a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1ZM7.047 16.953a1 1 0 0 1 0 1.414l-1.41 1.41a1 1 0 1 1-1.414-1.414l1.41-1.41a1 1 0 0 1 1.414 0ZM19.777 4.223a1 1 0 0 1 0 1.414l-1.41 1.41a1 1 0 1 1-1.414-1.414l1.41-1.41a1 1 0 0 1 1.414 0ZM16.953 16.953a1 1 0 0 1 1.414 0l1.41 1.41a1 1 0 1 1-1.414 1.414l-1.41-1.41a1 1 0 0 1 0-1.414ZM4.223 4.223a1 1 0 0 1 1.414 0l1.41 1.41a1 1 0 0 1-1.414 1.414l-1.41-1.41a1 1 0 0 1 0-1.414ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z" fill="#000000"></path></g></svg>`);
        return currentIcon;

    }

    else if (iconInfo === "clear-night") {

        let currentIcon = svgCreator(`<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="m 6.816406 1.011719 c -3.308594 0.570312 -5.839844 3.472656 -5.839844 6.941406 c 0 3.871094 3.160157 7.046875 7.023438 7.046875 c 1.753906 0 3.367188 -0.660156 4.597656 -1.734375 c 0.605469 -0.527344 0.371094 -1.515625 -0.40625 -1.722656 c -2.8125 -0.734375 -4.914062 -3.304688 -4.914062 -6.367188 c 0 -0.984375 0.222656 -1.910156 0.613281 -2.757812 c 0.339844 -0.730469 -0.28125 -1.539063 -1.074219 -1.40625 z m 0 0" fill="#2e3436"></path> </g></svg>`);
        return currentIcon;

    }

    else if (iconInfo === "cloudy") {

        let currentIcon = svgCreator(`<svg fill="#000000" height="200px" width="200px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 384 384" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M280,125.672c-4.32,0-8.632,0.264-12.896,0.784C253.592,85.328,213.64,56,168,56c-57.344,0-104,45.376-104,101.16 c0,0.904,0.008,1.8,0.032,2.696C26.592,169.992,0,203.064,0,242.328C0,289.568,39.48,328,88,328h192 c57.344,0,104-45.376,104-101.16S337.344,125.672,280,125.672z M280,296H88c-30.88,0-56-24.08-56-53.672 c0-27.952,21.88-50.92,50.896-53.432c4.544-0.392,8.704-2.704,11.44-6.36c2.728-3.656,3.776-8.304,2.864-12.768 c-0.8-3.912-1.2-8.152-1.2-12.608C96,119.024,128.304,88,168,88c35.72,0,66.368,25.56,71.28,59.456 c0.664,4.568,3.272,8.632,7.152,11.144c3.88,2.504,8.656,3.216,13.096,1.944c6.64-1.904,13.528-2.864,20.48-2.864 c39.704,0,72,31.024,72,69.168C352.008,264.992,319.704,296,280,296z"></path> </g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g></svg>`);
        return currentIcon;

    }

    else if (iconInfo === "fog") {

        let currentIcon = svgCreator(`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M22 12.3529C22 13.7432 21.4916 15.0161 20.6486 16M14.381 7.02721C14.9767 6.81911 15.6178 6.70588 16.2857 6.70588C16.9404 6.70588 17.5693 6.81468 18.1551 7.01498M7.11616 9.60887C6.8475 9.55673 6.56983 9.52941 6.28571 9.52941C3.91878 9.52941 2 11.4256 2 13.7647C2 14.5852 2.2361 15.3512 2.64482 16M7.11616 9.60887C6.88706 8.9978 6.7619 8.33687 6.7619 7.64706C6.7619 4.52827 9.32028 2 12.4762 2C15.4159 2 17.8371 4.19371 18.1551 7.01498M7.11616 9.60887C7.68059 9.71839 8.20528 9.9374 8.66667 10.2426M18.1551 7.01498C18.8381 7.24853 19.4623 7.60648 20 8.06141" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path> <path d="M8 22H16" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M5 19H11M19 19H15" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2 16H22" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`);
        return currentIcon;

    }

    else if (iconInfo === "hail") {

        let currentIcon = svgCreator(`<svg viewBox="0 0 24 24" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{opacity:0.2;fill:none;stroke:#000000;stroke-width:5.000000e-02;stroke-miterlimit:10;} .st1{fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} </style> <g id="Layer_1"></g> <g id="Layer_2"> <g> <path d="M4,14c-0.3,0-0.5-0.1-0.7-0.3c-0.9-0.9-1.3-2-1.3-3.2C2,8,4,6,6.5,6h0.6C7.6,3.7,9.6,2,12,2s4.4,1.7,4.9,4h0.6 C20,6,22,8,22,10.5c0,1.2-0.5,2.3-1.3,3.1c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4c0.5-0.5,0.7-1.1,0.7-1.7 C20,9.1,18.9,8,17.5,8H16c-0.6,0-1-0.4-1-1c0-1.7-1.3-3-3-3S9,5.3,9,7c0,0.6-0.4,1-1,1H6.5C5.1,8,4,9.1,4,10.5 c0,0.7,0.3,1.3,0.7,1.8c0.4,0.4,0.4,1,0,1.4C4.5,13.9,4.3,14,4,14z"></path> </g> <g> <path d="M5,17c-0.2,0-0.4-0.1-0.6-0.2c-0.5-0.3-0.6-0.9-0.3-1.4l2-3c0.3-0.5,0.9-0.6,1.4-0.3c0.5,0.3,0.6,0.9,0.3,1.4l-2,3 C5.6,16.8,5.3,17,5,17z"></path> </g> <g> <path d="M9,19c-0.2,0-0.4-0.1-0.6-0.2c-0.5-0.3-0.6-0.9-0.3-1.4l2-3c0.3-0.5,0.9-0.6,1.4-0.3c0.5,0.3,0.6,0.9,0.3,1.4l-2,3 C9.6,18.8,9.3,19,9,19z"></path> </g> <g> <path d="M15,17c-0.2,0-0.4-0.1-0.6-0.2c-0.5-0.3-0.6-0.9-0.3-1.4l2-3c0.3-0.5,0.9-0.6,1.4-0.3c0.5,0.3,0.6,0.9,0.3,1.4l-2,3 C15.6,16.8,15.3,17,15,17z"></path> </g> <g> <circle cx="14" cy="18" r="1"></circle> </g> <g> <circle cx="8" cy="20" r="1"></circle> </g> <g> <circle cx="4" cy="18" r="1"></circle> </g> </g> </g></svg>`);
        return currentIcon;

    }

    else if (iconInfo === "partly-cloudy-day") {

        let currentIcon = svgCreator(`<svg fill="#000000" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><style>.cls-1{fill:none;}</style></defs><title>partly-cloudy</title><rect x="27" y="15" width="4" height="2"></rect><rect x="23.0857" y="5.7938" width="4.2426" height="1.9998" transform="translate(2.5791 19.8139) rotate(-45)"></rect><rect x="15" y="1" width="2" height="4"></rect><rect x="4.6716" y="24.2078" width="4.2426" height="1.9998" transform="translate(-15.8349 12.1865) rotate(-45)"></rect><rect x="5.7931" y="4.6723" width="1.9998" height="4.2426" transform="translate(-2.8142 6.7932) rotate(-45)"></rect><rect x="1" y="15" width="4" height="2"></rect><path d="M26.7939,20.3418a6.9617,6.9617,0,0,0-1.8681-3.2671A8.485,8.485,0,0,0,25,16a9,9,0,1,0-14.585,7.0332A4.9771,4.9771,0,0,0,15,30H25a4.9947,4.9947,0,0,0,1.7939-9.6582ZM9,16a6.9955,6.9955,0,0,1,13.9849-.2969A6.8883,6.8883,0,0,0,20,15a7.04,7.04,0,0,0-6.7944,5.3418A4.986,4.986,0,0,0,11.5618,21.39,6.9675,6.9675,0,0,1,9,16ZM25,28H15a2.9945,2.9945,0,0,1-.6963-5.9082l.6587-.1572.0986-.67a4.9923,4.9923,0,0,1,9.878,0l.0986.6695.6587.1572A2.9945,2.9945,0,0,1,25,28Z"></path><rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32"></rect></g></svg>`);
        return currentIcon;

    }

    else if (iconInfo === "partly-cloudy-night") {

        let currentIcon = svgCreator(`<svg fill="#000000" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><style>.cls-1{fill:none;}</style></defs><title>partly-cloudy--night</title><path d="M30,19a4.974,4.974,0,0,0-3.2061-4.6582A6.9711,6.9711,0,0,0,13.7578,12.9a13.1418,13.1418,0,0,1,.1314-8.52A1.015,1.015,0,0,0,12.98,3a.9825.9825,0,0,0-.1746.0156A13.0958,13.0958,0,0,0,14.63,28.9971c.164.0063.3281,0,.4907,0a13.0412,13.0412,0,0,0,10.29-5.0386A4.99,4.99,0,0,0,30,19ZM14.7034,26.9976a11.0945,11.0945,0,0,1-3.201-21.584,15.1817,15.1817,0,0,0,.8443,9.3676A4.9877,4.9877,0,0,0,15,24h7.6772a11.0991,11.0991,0,0,1-7.5561,2.9976C14.9827,26.9976,14.8428,27.0024,14.7034,26.9976ZM25,22H15a2.9945,2.9945,0,0,1-.6963-5.9082l.6587-.1572.0986-.67a4.9923,4.9923,0,0,1,9.878.0005l.0986.6695.6587.1572A2.9945,2.9945,0,0,1,25,22Z"></path><rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32"></rect></g></svg>`);
        return currentIcon;

    }

    else if (iconInfo === "rain-snow-showers-day") {

        let currentIcon = svgCreator(`<svg viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --> <title>ic_fluent_weather_rain_snow_48_filled</title> <desc>Created with Sketch.</desc> <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="ic_fluent_weather_rain_snow_48_filled" fill="#212121" fill-rule="nonzero"> <path d="M24.0011082,7 C30.3381703,7 33.9330779,11.1945808 34.4559068,16.2602528 L34.6158392,16.2602476 C38.6939986,16.2602476 42,19.5576953 42,23.6253032 C42,27.6929111 38.6939986,30.9903588 34.6158392,30.9903588 L31.9111999,30.9903527 C31.9686713,31.1494605 32,31.3210716 32,31.5 C32,32.3284271 31.3284271,33 30.5,33 C29.6715729,33 29,32.3284271 29,31.5 C29,31.3210716 29.0313287,31.1494605 29.0888001,30.9903527 L18.5542163,30.99 L14.2478758,38.1609468 C13.7502386,38.9894855 12.6751608,39.2577341 11.8466221,38.760097 C11.0641134,38.2901064 10.7813695,37.3050529 11.1715887,36.4990746 L11.2474719,36.3588434 L14.4712163,30.99 L13.3863771,30.9903588 C9.3082177,30.9903588 6.00221632,27.6929111 6.00221632,23.6253032 C6.00221632,19.5576953 9.3082177,16.2602476 13.3864221,16.2602476 L13.5463095,16.2602528 C14.0721799,11.1612855 17.664046,7 24.0011082,7 Z M23.5848513,34.2709433 C24.3617926,34.7500812 24.6329614,35.7383838 24.233314,36.5397289 L24.1557909,36.6790603 L23.2372022,38.1685887 C22.7298797,38.9912325 21.6517289,39.2468509 20.8290851,38.7395284 C20.0521438,38.2603904 19.7809751,37.2720878 20.1806224,36.4707427 L20.2581455,36.3314113 L21.1767342,34.8418829 C21.6840567,34.0192391 22.7622075,33.7636207 23.5848513,34.2709433 Z M28.5,35 C29.3284271,35 30,35.6715729 30,36.5 C30,37.3284271 29.3284271,38 28.5,38 C27.6715729,38 27,37.3284271 27,36.5 C27,35.6715729 27.6715729,35 28.5,35 Z M33.5,34 C34.3284271,34 35,34.6715729 35,35.5 C35,36.3284271 34.3284271,37 33.5,37 C32.6715729,37 32,36.3284271 32,35.5 C32,34.6715729 32.6715729,34 33.5,34 Z" id="🎨-Color"> </path> </g> </g> </g></svg>`);
        return currentIcon;

    }

    else if (iconInfo === "rain-snow-showers-night") {

        let currentIcon = svgCreator(`<svg viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --> <title>ic_fluent_weather_rain_snow_48_filled</title> <desc>Created with Sketch.</desc> <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="ic_fluent_weather_rain_snow_48_filled" fill="#212121" fill-rule="nonzero"> <path d="M24.0011082,7 C30.3381703,7 33.9330779,11.1945808 34.4559068,16.2602528 L34.6158392,16.2602476 C38.6939986,16.2602476 42,19.5576953 42,23.6253032 C42,27.6929111 38.6939986,30.9903588 34.6158392,30.9903588 L31.9111999,30.9903527 C31.9686713,31.1494605 32,31.3210716 32,31.5 C32,32.3284271 31.3284271,33 30.5,33 C29.6715729,33 29,32.3284271 29,31.5 C29,31.3210716 29.0313287,31.1494605 29.0888001,30.9903527 L18.5542163,30.99 L14.2478758,38.1609468 C13.7502386,38.9894855 12.6751608,39.2577341 11.8466221,38.760097 C11.0641134,38.2901064 10.7813695,37.3050529 11.1715887,36.4990746 L11.2474719,36.3588434 L14.4712163,30.99 L13.3863771,30.9903588 C9.3082177,30.9903588 6.00221632,27.6929111 6.00221632,23.6253032 C6.00221632,19.5576953 9.3082177,16.2602476 13.3864221,16.2602476 L13.5463095,16.2602528 C14.0721799,11.1612855 17.664046,7 24.0011082,7 Z M23.5848513,34.2709433 C24.3617926,34.7500812 24.6329614,35.7383838 24.233314,36.5397289 L24.1557909,36.6790603 L23.2372022,38.1685887 C22.7298797,38.9912325 21.6517289,39.2468509 20.8290851,38.7395284 C20.0521438,38.2603904 19.7809751,37.2720878 20.1806224,36.4707427 L20.2581455,36.3314113 L21.1767342,34.8418829 C21.6840567,34.0192391 22.7622075,33.7636207 23.5848513,34.2709433 Z M28.5,35 C29.3284271,35 30,35.6715729 30,36.5 C30,37.3284271 29.3284271,38 28.5,38 C27.6715729,38 27,37.3284271 27,36.5 C27,35.6715729 27.6715729,35 28.5,35 Z M33.5,34 C34.3284271,34 35,34.6715729 35,35.5 C35,36.3284271 34.3284271,37 33.5,37 C32.6715729,37 32,36.3284271 32,35.5 C32,34.6715729 32.6715729,34 33.5,34 Z" id="🎨-Color"> </path> </g> </g> </g></svg>`);
        return currentIcon;

    }

    else if (iconInfo === "rain-snow") {

        let currentIcon = svgCreator(`<svg viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --> <title>ic_fluent_weather_rain_snow_48_filled</title> <desc>Created with Sketch.</desc> <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="ic_fluent_weather_rain_snow_48_filled" fill="#212121" fill-rule="nonzero"> <path d="M24.0011082,7 C30.3381703,7 33.9330779,11.1945808 34.4559068,16.2602528 L34.6158392,16.2602476 C38.6939986,16.2602476 42,19.5576953 42,23.6253032 C42,27.6929111 38.6939986,30.9903588 34.6158392,30.9903588 L31.9111999,30.9903527 C31.9686713,31.1494605 32,31.3210716 32,31.5 C32,32.3284271 31.3284271,33 30.5,33 C29.6715729,33 29,32.3284271 29,31.5 C29,31.3210716 29.0313287,31.1494605 29.0888001,30.9903527 L18.5542163,30.99 L14.2478758,38.1609468 C13.7502386,38.9894855 12.6751608,39.2577341 11.8466221,38.760097 C11.0641134,38.2901064 10.7813695,37.3050529 11.1715887,36.4990746 L11.2474719,36.3588434 L14.4712163,30.99 L13.3863771,30.9903588 C9.3082177,30.9903588 6.00221632,27.6929111 6.00221632,23.6253032 C6.00221632,19.5576953 9.3082177,16.2602476 13.3864221,16.2602476 L13.5463095,16.2602528 C14.0721799,11.1612855 17.664046,7 24.0011082,7 Z M23.5848513,34.2709433 C24.3617926,34.7500812 24.6329614,35.7383838 24.233314,36.5397289 L24.1557909,36.6790603 L23.2372022,38.1685887 C22.7298797,38.9912325 21.6517289,39.2468509 20.8290851,38.7395284 C20.0521438,38.2603904 19.7809751,37.2720878 20.1806224,36.4707427 L20.2581455,36.3314113 L21.1767342,34.8418829 C21.6840567,34.0192391 22.7622075,33.7636207 23.5848513,34.2709433 Z M28.5,35 C29.3284271,35 30,35.6715729 30,36.5 C30,37.3284271 29.3284271,38 28.5,38 C27.6715729,38 27,37.3284271 27,36.5 C27,35.6715729 27.6715729,35 28.5,35 Z M33.5,34 C34.3284271,34 35,34.6715729 35,35.5 C35,36.3284271 34.3284271,37 33.5,37 C32.6715729,37 32,36.3284271 32,35.5 C32,34.6715729 32.6715729,34 33.5,34 Z" id="🎨-Color"> </path> </g> </g> </g></svg>`);
        return currentIcon;

    }

    else if (iconInfo === "rain") {

        let currentIcon = svgCreator(`<svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="rain-alt" class="icon glyph"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M21,9a4,4,0,0,1-4,4H6A3,3,0,1,1,7.08,7.21a5,5,0,0,1,9-2.09A4.08,4.08,0,0,1,17,5,4,4,0,0,1,21,9ZM16.89,21.45l2-4a1,1,0,1,0-1.78-.9l-2,4a1,1,0,0,0,.44,1.34A.93.93,0,0,0,16,22,1,1,0,0,0,16.89,21.45Zm-8,0,2-4a1,1,0,1,0-1.78-.9l-2,4a1,1,0,0,0,.44,1.34A.93.93,0,0,0,8,22,1,1,0,0,0,8.89,21.45Zm5-2,1-2a1,1,0,1,0-1.78-.9l-1,2a1,1,0,0,0,.44,1.34A.93.93,0,0,0,13,20,1,1,0,0,0,13.89,19.45Zm-8,0,1-2a1,1,0,0,0-1.78-.9l-1,2a1,1,0,0,0,.44,1.34A.93.93,0,0,0,5,20,1,1,0,0,0,5.89,19.45Z"></path></g></svg>`);
        return currentIcon;

    }

    else if (iconInfo === "showers-day") {

        let currentIcon = svgCreator(`<svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.7439414,9 L15.5,9 C17.9852814,9 20,11.0147186 20,13.5 C20,15.9852814 17.9852814,18 15.5,18 C15.2238576,18 15,17.7761424 15,17.5 C15,17.2238576 15.2238576,17 15.5,17 C17.4329966,17 19,15.4329966 19,13.5 C19,11.5670034 17.4329966,10 15.5,10 L14.9725356,10 C14.9906833,10.1641669 15,10.3309955 15,10.5 C15,10.7761424 14.7761424,11 14.5,11 C14.2238576,11 14,10.7761424 14,10.5 C14,8.56700338 12.4329966,7 10.5,7 L10,7 C7.790861,7 6,8.790861 6,11 L6,11.5 C6,11.7761424 5.77614237,12 5.5,12 C4.11928813,12 3,13.1192881 3,14.5 C3,15.8807119 4.11928813,17 5.5,17 C5.77614237,17 6,17.2238576 6,17.5 C6,17.7761424 5.77614237,18 5.5,18 C3.56700338,18 2,16.4329966 2,14.5 C2,12.736764 3.30385293,11.2780593 5,11.0354444 C5,8.23857625 7.23857625,6 10,6 L10.5,6 C12.4593282,6 14.1261868,7.25221144 14.7439414,9 L14.7439414,9 Z M20.8577341,9.4959942 C20.673823,9.70198286 20.3577469,9.71988028 20.1517582,9.5359692 C19.9457695,9.35205812 19.9278721,9.03598194 20.1117832,8.82999328 C20.6806109,8.19288077 21,7.37193728 21,6.5 C21,4.56700338 19.4329966,3 17.5,3 C15.892902,3 14.503472,4.09252816 14.1096548,5.62689038 C14.0410039,5.89436312 13.7685219,6.05554005 13.5010491,5.98688914 C13.2335764,5.91823823 13.0723994,5.64575618 13.1410504,5.37828345 C13.6476997,3.40431271 15.4336437,2 17.5,2 C19.9852814,2 22,4.01471863 22,6.5 C22,7.62000205 21.5886376,8.67734952 20.8577341,9.4959942 Z M8,17.5 C8,17.2238576 8.22385763,17 8.5,17 C8.77614237,17 9,17.2238576 9,17.5 L9,21.5 C9,21.7761424 8.77614237,22 8.5,22 C8.22385763,22 8,21.7761424 8,21.5 L8,17.5 Z M10,16.5 C10,16.2238576 10.2238576,16 10.5,16 C10.7761424,16 11,16.2238576 11,16.5 L11,20.5 C11,20.7761424 10.7761424,21 10.5,21 C10.2238576,21 10,20.7761424 10,20.5 L10,16.5 Z M12,17.5 C12,17.2238576 12.2238576,17 12.5,17 C12.7761424,17 13,17.2238576 13,17.5 L13,21.5 C13,21.7761424 12.7761424,22 12.5,22 C12.2238576,22 12,21.7761424 12,21.5 L12,17.5 Z"></path> </g></svg>`);
        return currentIcon;

    }

    else if (iconInfo === "showers-night") {

        let currentIcon = svgCreator(`<svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="rain-alt" class="icon glyph"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M21,9a4,4,0,0,1-4,4H6A3,3,0,1,1,7.08,7.21a5,5,0,0,1,9-2.09A4.08,4.08,0,0,1,17,5,4,4,0,0,1,21,9ZM16.89,21.45l2-4a1,1,0,1,0-1.78-.9l-2,4a1,1,0,0,0,.44,1.34A.93.93,0,0,0,16,22,1,1,0,0,0,16.89,21.45Zm-8,0,2-4a1,1,0,1,0-1.78-.9l-2,4a1,1,0,0,0,.44,1.34A.93.93,0,0,0,8,22,1,1,0,0,0,8.89,21.45Zm5-2,1-2a1,1,0,1,0-1.78-.9l-1,2a1,1,0,0,0,.44,1.34A.93.93,0,0,0,13,20,1,1,0,0,0,13.89,19.45Zm-8,0,1-2a1,1,0,0,0-1.78-.9l-1,2a1,1,0,0,0,.44,1.34A.93.93,0,0,0,5,20,1,1,0,0,0,5.89,19.45Z"></path></g></svg>`);
        return currentIcon;

    }

    else if (iconInfo === "sleet") {

        let currentIcon = svgCreator(`<svg viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --> <title>ic_fluent_weather_rain_snow_48_filled</title> <desc>Created with Sketch.</desc> <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="ic_fluent_weather_rain_snow_48_filled" fill="#212121" fill-rule="nonzero"> <path d="M24.0011082,7 C30.3381703,7 33.9330779,11.1945808 34.4559068,16.2602528 L34.6158392,16.2602476 C38.6939986,16.2602476 42,19.5576953 42,23.6253032 C42,27.6929111 38.6939986,30.9903588 34.6158392,30.9903588 L31.9111999,30.9903527 C31.9686713,31.1494605 32,31.3210716 32,31.5 C32,32.3284271 31.3284271,33 30.5,33 C29.6715729,33 29,32.3284271 29,31.5 C29,31.3210716 29.0313287,31.1494605 29.0888001,30.9903527 L18.5542163,30.99 L14.2478758,38.1609468 C13.7502386,38.9894855 12.6751608,39.2577341 11.8466221,38.760097 C11.0641134,38.2901064 10.7813695,37.3050529 11.1715887,36.4990746 L11.2474719,36.3588434 L14.4712163,30.99 L13.3863771,30.9903588 C9.3082177,30.9903588 6.00221632,27.6929111 6.00221632,23.6253032 C6.00221632,19.5576953 9.3082177,16.2602476 13.3864221,16.2602476 L13.5463095,16.2602528 C14.0721799,11.1612855 17.664046,7 24.0011082,7 Z M23.5848513,34.2709433 C24.3617926,34.7500812 24.6329614,35.7383838 24.233314,36.5397289 L24.1557909,36.6790603 L23.2372022,38.1685887 C22.7298797,38.9912325 21.6517289,39.2468509 20.8290851,38.7395284 C20.0521438,38.2603904 19.7809751,37.2720878 20.1806224,36.4707427 L20.2581455,36.3314113 L21.1767342,34.8418829 C21.6840567,34.0192391 22.7622075,33.7636207 23.5848513,34.2709433 Z M28.5,35 C29.3284271,35 30,35.6715729 30,36.5 C30,37.3284271 29.3284271,38 28.5,38 C27.6715729,38 27,37.3284271 27,36.5 C27,35.6715729 27.6715729,35 28.5,35 Z M33.5,34 C34.3284271,34 35,34.6715729 35,35.5 C35,36.3284271 34.3284271,37 33.5,37 C32.6715729,37 32,36.3284271 32,35.5 C32,34.6715729 32.6715729,34 33.5,34 Z" id="🎨-Color"> </path> </g> </g> </g></svg>`);
        return currentIcon;

    }

    else if (iconInfo === "snow-showers-day") {

        let currentIcon = svgCreator(`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.9994 3V7M11.9994 7V17M11.9994 7L8.99943 4M11.9994 7L14.9994 4M11.9994 17V21M11.9994 17L8.99943 20M11.9994 17L14.9994 20M4.20624 7.49999L7.67034 9.49999M7.67034 9.49999L16.3306 14.5M7.67034 9.49999L3.57227 10.5981M7.67034 9.49999L6.57227 5.40191M16.3306 14.5L19.7947 16.5M16.3306 14.5L17.4287 18.5981M16.3306 14.5L20.4287 13.4019M4.2067 16.5L7.6708 14.5M7.6708 14.5L16.3311 9.49999M7.6708 14.5L3.57273 13.4019M7.6708 14.5L6.57273 18.5981M16.3311 9.49999L19.7952 7.49999M16.3311 9.49999L17.4291 5.40192M16.3311 9.49999L20.4291 10.5981" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`);
        return currentIcon;

    }

    else if (iconInfo === "snow-showers-night") {

        let currentIcon = svgCreator(`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.9994 3V7M11.9994 7V17M11.9994 7L8.99943 4M11.9994 7L14.9994 4M11.9994 17V21M11.9994 17L8.99943 20M11.9994 17L14.9994 20M4.20624 7.49999L7.67034 9.49999M7.67034 9.49999L16.3306 14.5M7.67034 9.49999L3.57227 10.5981M7.67034 9.49999L6.57227 5.40191M16.3306 14.5L19.7947 16.5M16.3306 14.5L17.4287 18.5981M16.3306 14.5L20.4287 13.4019M4.2067 16.5L7.6708 14.5M7.6708 14.5L16.3311 9.49999M7.6708 14.5L3.57273 13.4019M7.6708 14.5L6.57273 18.5981M16.3311 9.49999L19.7952 7.49999M16.3311 9.49999L17.4291 5.40192M16.3311 9.49999L20.4291 10.5981" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`);
        return currentIcon;

    }

    else if (iconInfo === "snow") {

        let currentIcon = svgCreator(`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.9994 3V7M11.9994 7V17M11.9994 7L8.99943 4M11.9994 7L14.9994 4M11.9994 17V21M11.9994 17L8.99943 20M11.9994 17L14.9994 20M4.20624 7.49999L7.67034 9.49999M7.67034 9.49999L16.3306 14.5M7.67034 9.49999L3.57227 10.5981M7.67034 9.49999L6.57227 5.40191M16.3306 14.5L19.7947 16.5M16.3306 14.5L17.4287 18.5981M16.3306 14.5L20.4287 13.4019M4.2067 16.5L7.6708 14.5M7.6708 14.5L16.3311 9.49999M7.6708 14.5L3.57273 13.4019M7.6708 14.5L6.57273 18.5981M16.3311 9.49999L19.7952 7.49999M16.3311 9.49999L17.4291 5.40192M16.3311 9.49999L20.4291 10.5981" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`);
        return currentIcon;

    }

    else if (iconInfo === "thunder-rain") {

        let currentIcon = svgCreator(`<svg version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .linesandangles_een{fill:#111918;} </style> <path class="linesandangles_een" d="M23,6c-0.753,0-1.501,0.148-2.207,0.432C19.424,4.319,17.052,3,14.5,3 c-3.235,0-6.043,2.034-7.079,5.033C4.936,8.321,3,10.439,3,13c0,2.757,2.243,5,5,5h3l-1,2l3,3l-1,7l7-7l-2-3l2-2h4 c3.309,0,6-2.691,6-6S26.309,6,23,6z M16.426,22.745l-1.598,1.598l0.293-2.05l-2.688-2.688L13.236,18h2.935l-1.745,1.745 L16.426,22.745z M23,16H8c-1.654,0-3-1.346-3-3s1.346-3,2.956-3.001l1.006,0.052L9.15,9.245C9.734,6.746,11.934,5,14.5,5 c2.123,0,4.078,1.248,4.979,3.179l0.476,1.018l0.956-0.59C21.563,8.204,22.266,8,23,8c2.206,0,4,1.794,4,4S25.206,16,23,16z"></path> </g></svg>`);
        return currentIcon;

    }

    else if (iconInfo === "thunder-showers-day") {

        let currentIcon = svgCreator(`<svg version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .linesandangles_een{fill:#111918;} </style> <path class="linesandangles_een" d="M23,6c-0.753,0-1.501,0.148-2.207,0.432C19.424,4.319,17.052,3,14.5,3 c-3.235,0-6.043,2.034-7.079,5.033C4.936,8.321,3,10.439,3,13c0,2.757,2.243,5,5,5h3l-1,2l3,3l-1,7l7-7l-2-3l2-2h4 c3.309,0,6-2.691,6-6S26.309,6,23,6z M16.426,22.745l-1.598,1.598l0.293-2.05l-2.688-2.688L13.236,18h2.935l-1.745,1.745 L16.426,22.745z M23,16H8c-1.654,0-3-1.346-3-3s1.346-3,2.956-3.001l1.006,0.052L9.15,9.245C9.734,6.746,11.934,5,14.5,5 c2.123,0,4.078,1.248,4.979,3.179l0.476,1.018l0.956-0.59C21.563,8.204,22.266,8,23,8c2.206,0,4,1.794,4,4S25.206,16,23,16z"></path> </g></svg>`);
        return currentIcon;

    }

    else if (iconInfo === "thunder-showers-night") {

        let currentIcon = svgCreator(`<svg version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .linesandangles_een{fill:#111918;} </style> <path class="linesandangles_een" d="M23,6c-0.753,0-1.501,0.148-2.207,0.432C19.424,4.319,17.052,3,14.5,3 c-3.235,0-6.043,2.034-7.079,5.033C4.936,8.321,3,10.439,3,13c0,2.757,2.243,5,5,5h3l-1,2l3,3l-1,7l7-7l-2-3l2-2h4 c3.309,0,6-2.691,6-6S26.309,6,23,6z M16.426,22.745l-1.598,1.598l0.293-2.05l-2.688-2.688L13.236,18h2.935l-1.745,1.745 L16.426,22.745z M23,16H8c-1.654,0-3-1.346-3-3s1.346-3,2.956-3.001l1.006,0.052L9.15,9.245C9.734,6.746,11.934,5,14.5,5 c2.123,0,4.078,1.248,4.979,3.179l0.476,1.018l0.956-0.59C21.563,8.204,22.266,8,23,8c2.206,0,4,1.794,4,4S25.206,16,23,16z"></path> </g></svg>`);
        return currentIcon;

    }

    else if (iconInfo === "thunder") {

        let currentIcon = svgCreator(`<svg version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .linesandangles_een{fill:#111918;} </style> <path class="linesandangles_een" d="M23,6c-0.753,0-1.501,0.148-2.207,0.432C19.424,4.319,17.052,3,14.5,3 c-3.235,0-6.043,2.034-7.079,5.033C4.936,8.321,3,10.439,3,13c0,2.757,2.243,5,5,5h3l-1,2l3,3l-1,7l7-7l-2-3l2-2h4 c3.309,0,6-2.691,6-6S26.309,6,23,6z M16.426,22.745l-1.598,1.598l0.293-2.05l-2.688-2.688L13.236,18h2.935l-1.745,1.745 L16.426,22.745z M23,16H8c-1.654,0-3-1.346-3-3s1.346-3,2.956-3.001l1.006,0.052L9.15,9.245C9.734,6.746,11.934,5,14.5,5 c2.123,0,4.078,1.248,4.979,3.179l0.476,1.018l0.956-0.59C21.563,8.204,22.266,8,23,8c2.206,0,4,1.794,4,4S25.206,16,23,16z"></path> </g></svg>`);
        return currentIcon;

    }

    else if (iconInfo === "wind") {

        let currentIcon = svgCreator(`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M6.25 5.5C6.25 3.70508 7.70507 2.25 9.5 2.25C11.2949 2.25 12.75 3.70507 12.75 5.5C12.75 7.29493 11.2949 8.75 9.5 8.75H3C2.58579 8.75 2.25 8.41421 2.25 8C2.25 7.58579 2.58579 7.25 3 7.25H9.5C10.4665 7.25 11.25 6.4665 11.25 5.5C11.25 4.5335 10.4665 3.75 9.5 3.75C8.5335 3.75 7.75 4.5335 7.75 5.5V5.85714C7.75 6.27136 7.41421 6.60714 7 6.60714C6.58579 6.60714 6.25 6.27136 6.25 5.85714V5.5ZM14.25 7.5C14.25 5.15279 16.1528 3.25 18.5 3.25C20.8472 3.25 22.75 5.15279 22.75 7.5C22.75 9.84721 20.8472 11.75 18.5 11.75H2C1.58579 11.75 1.25 11.4142 1.25 11C1.25 10.5858 1.58579 10.25 2 10.25H18.5C20.0188 10.25 21.25 9.01878 21.25 7.5C21.25 5.98122 20.0188 4.75 18.5 4.75C16.9812 4.75 15.75 5.98122 15.75 7.5V8C15.75 8.41421 15.4142 8.75 15 8.75C14.5858 8.75 14.25 8.41421 14.25 8V7.5ZM3.25 14C3.25 13.5858 3.58579 13.25 4 13.25H18.5C20.8472 13.25 22.75 15.1528 22.75 17.5C22.75 19.8472 20.8472 21.75 18.5 21.75C16.1528 21.75 14.25 19.8472 14.25 17.5V17C14.25 16.5858 14.5858 16.25 15 16.25C15.4142 16.25 15.75 16.5858 15.75 17V17.5C15.75 19.0188 16.9812 20.25 18.5 20.25C20.0188 20.25 21.25 19.0188 21.25 17.5C21.25 15.9812 20.0188 14.75 18.5 14.75H4C3.58579 14.75 3.25 14.4142 3.25 14Z" fill="#000000"></path> </g></svg>`);
        return currentIcon;

    }

    currentIcon.styles.width = "100px"
    
    iconContainer.appendChild(currentIcon);
    weatherDisplayContainer.appendChild(iconContainer);

    
}
