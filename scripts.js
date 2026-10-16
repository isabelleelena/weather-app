// Get weather info

// VISUAL CROSSING API KEY: BKCJWHGKVN7TN2PLK4YMYEXHZ

let input = document.querySelector("input");
let button = document.querySelector("button");
let bigContainer = document.querySelector(".weather-display");
let weatherDisplayContainer = document.querySelector(".data-section");
let bigContainerTitle = document.querySelector(".weather-display-title");

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
    weatherDisplayContainer.replaceChildren();

    let city = getUserInput();

    bigContainerTitle.textContent = `The weather in ${city}:`

    let formattedCity = stringFormatter(city);

    let weatherData = await getWeatherData(formattedCity);
    let temp = weatherData.temp;
    let feelsLike = weatherData.feelsLike;
    let icon = weatherData.icon;
    let humidity = weatherData.humidity;
    let cloudCover = weatherData.cloudCover;
    let sunriseTime = weatherData.sunrise;
    let sunsetTime = weatherData.sunset;
    let uvIndex = weatherData.uvIndex;

    tempSectionGenerator(temp, feelsLike, city);
    iconSectionGenerator(icon);
    humiditySectionGenerator(humidity);
    cloudCoverSectionGenerator(cloudCover);
    sunriseSunsetGenerator("Sunrise", sunriseTime);
    sunriseSunsetGenerator("Sunset", sunsetTime);
    uvIndexGenerator(uvIndex);

    
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
    let tempTitleContainer = containerMaker("temp-title-container");
    let feelsLikeTitleContainer = containerMaker("feels-like-title-container");
    let feelsLikeContainer = containerMaker("feels-like-container");

    let tempHeading = textBoxMaker("h2", "temp-heading", `Temperature in ${cityValue}`);
    let tempIconContainer = containerMaker(`temp-heading-icon-container`);
    let tempCurrentIcon = svgCreator(`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 15.9998C7.44772 15.9998 7 16.4475 7 16.9998C7 17.5521 7.44772 17.9998 8 17.9998C8.55228 17.9998 9 17.5521 9 16.9998C9 16.4475 8.55228 15.9998 8 15.9998ZM8 15.9998L8.00707 12M8 16.9998L8.00707 17.0069M20 5C20 6.10457 19.1046 7 18 7C16.8954 7 16 6.10457 16 5C16 3.89543 16.8954 3 18 3C19.1046 3 20 3.89543 20 5ZM12 16.9998C12 19.209 10.2091 20.9998 8 20.9998C5.79086 20.9998 4 19.209 4 16.9998C4 15.9854 4.37764 15.0591 5 14.354L5 6C5 4.34315 6.34315 3 8 3C9.65685 3 11 4.34315 11 6V14.354C11.6224 15.0591 12 15.9854 12 16.9998Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`);
    tempCurrentIcon.style.width = "30px";

    let tempData = textBoxMaker("p", "temp-data", `${actualTempValue} F`);
    tempData.dataset.degreeType = "Farenheit"

    let feelsLikeHeading = textBoxMaker("h2", "feels-like-heading", `Feels like:`);
    let feelsLikeIconContainer = containerMaker(`feels-like-heading-icon-container`);
    let feelsLikeCurrentIcon = svgCreator(`<svg fill="#000000" viewBox="0 0 32 32" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs> <style> .cls-1 { fill: none; } </style> </defs> <path d="M26,30H22a2.0059,2.0059,0,0,1-2-2V21a2.0059,2.0059,0,0,1-2-2V13a2.9465,2.9465,0,0,1,3-3h6a2.9465,2.9465,0,0,1,3,3v6a2.0059,2.0059,0,0,1-2,2v7A2.0059,2.0059,0,0,1,26,30ZM21,12a.9448.9448,0,0,0-1,1v6h2v9h4V19h2V13a.9448.9448,0,0,0-1-1Z" transform="translate(0 0)"></path> <path d="M24,9a4,4,0,1,1,4-4h0A4.0118,4.0118,0,0,1,24,9Zm0-6a2,2,0,1,0,2,2h0a2.0059,2.0059,0,0,0-2-2Z" transform="translate(0 0)"></path> <path d="M10,20.1839V12H8v8.1839a3,3,0,1,0,2,0Z" transform="translate(0 0)"></path> <path d="M9,30A6.9931,6.9931,0,0,1,4,18.1108V7A5,5,0,0,1,14,7V18.1108A6.9931,6.9931,0,0,1,9,30ZM9,4A3.0033,3.0033,0,0,0,6,7V18.9834l-.332.2983a5,5,0,1,0,6.664,0L12,18.9834V7A3.0033,3.0033,0,0,0,9,4Z" transform="translate(0 0)"></path> <rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32"></rect> </g></svg>`);
    feelsLikeCurrentIcon.style.width = "30px";

    let feelsLikeData = textBoxMaker("p", "feels-like-data", `${feelsLikeTempValue} F`);

    let changeUnitButton = buttonMaker("change-unit-button", "Change to Celsius");

    weatherDisplayContainer.appendChild(allTempContainer);

    allTempContainer.appendChild(tempContainer);
    allTempContainer.appendChild(feelsLikeContainer);

    tempIconContainer.appendChild(tempCurrentIcon);
    tempTitleContainer.appendChild(tempHeading);
    tempTitleContainer.appendChild(tempIconContainer);
    tempContainer.appendChild(tempTitleContainer)
    tempContainer.appendChild(tempData);

    feelsLikeIconContainer.appendChild(feelsLikeCurrentIcon);
    feelsLikeTitleContainer.appendChild(feelsLikeHeading);
    feelsLikeTitleContainer.appendChild(feelsLikeIconContainer);
    feelsLikeContainer.appendChild(feelsLikeTitleContainer);
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

    let iconContainer = containerMaker(`${iconInfo}-icon-container`);
    let currentIcon;

    if (iconInfo === "clear-day") {

        currentIcon = svgCreator(`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12 1a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V2a1 1 0 0 1 1-1ZM12 19a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1ZM1 12a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H2a1 1 0 0 1-1-1ZM19 12a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1ZM7.047 16.953a1 1 0 0 1 0 1.414l-1.41 1.41a1 1 0 1 1-1.414-1.414l1.41-1.41a1 1 0 0 1 1.414 0ZM19.777 4.223a1 1 0 0 1 0 1.414l-1.41 1.41a1 1 0 1 1-1.414-1.414l1.41-1.41a1 1 0 0 1 1.414 0ZM16.953 16.953a1 1 0 0 1 1.414 0l1.41 1.41a1 1 0 1 1-1.414 1.414l-1.41-1.41a1 1 0 0 1 0-1.414ZM4.223 4.223a1 1 0 0 1 1.414 0l1.41 1.41a1 1 0 0 1-1.414 1.414l-1.41-1.41a1 1 0 0 1 0-1.414ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z" fill="#000000"></path></g></svg>`);

    }

    else if (iconInfo === "clear-night") {

        currentIcon = svgCreator(`<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="m 6.816406 1.011719 c -3.308594 0.570312 -5.839844 3.472656 -5.839844 6.941406 c 0 3.871094 3.160157 7.046875 7.023438 7.046875 c 1.753906 0 3.367188 -0.660156 4.597656 -1.734375 c 0.605469 -0.527344 0.371094 -1.515625 -0.40625 -1.722656 c -2.8125 -0.734375 -4.914062 -3.304688 -4.914062 -6.367188 c 0 -0.984375 0.222656 -1.910156 0.613281 -2.757812 c 0.339844 -0.730469 -0.28125 -1.539063 -1.074219 -1.40625 z m 0 0" fill="#2e3436"></path> </g></svg>`);


    }

    else if (iconInfo === "cloudy") {

        currentIcon = svgCreator(`<svg fill="#000000" height="200px" width="200px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 384 384" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M280,125.672c-4.32,0-8.632,0.264-12.896,0.784C253.592,85.328,213.64,56,168,56c-57.344,0-104,45.376-104,101.16 c0,0.904,0.008,1.8,0.032,2.696C26.592,169.992,0,203.064,0,242.328C0,289.568,39.48,328,88,328h192 c57.344,0,104-45.376,104-101.16S337.344,125.672,280,125.672z M280,296H88c-30.88,0-56-24.08-56-53.672 c0-27.952,21.88-50.92,50.896-53.432c4.544-0.392,8.704-2.704,11.44-6.36c2.728-3.656,3.776-8.304,2.864-12.768 c-0.8-3.912-1.2-8.152-1.2-12.608C96,119.024,128.304,88,168,88c35.72,0,66.368,25.56,71.28,59.456 c0.664,4.568,3.272,8.632,7.152,11.144c3.88,2.504,8.656,3.216,13.096,1.944c6.64-1.904,13.528-2.864,20.48-2.864 c39.704,0,72,31.024,72,69.168C352.008,264.992,319.704,296,280,296z"></path> </g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g></svg>`);


    }

    else if (iconInfo === "fog") {

        currentIcon = svgCreator(`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M22 12.3529C22 13.7432 21.4916 15.0161 20.6486 16M14.381 7.02721C14.9767 6.81911 15.6178 6.70588 16.2857 6.70588C16.9404 6.70588 17.5693 6.81468 18.1551 7.01498M7.11616 9.60887C6.8475 9.55673 6.56983 9.52941 6.28571 9.52941C3.91878 9.52941 2 11.4256 2 13.7647C2 14.5852 2.2361 15.3512 2.64482 16M7.11616 9.60887C6.88706 8.9978 6.7619 8.33687 6.7619 7.64706C6.7619 4.52827 9.32028 2 12.4762 2C15.4159 2 17.8371 4.19371 18.1551 7.01498M7.11616 9.60887C7.68059 9.71839 8.20528 9.9374 8.66667 10.2426M18.1551 7.01498C18.8381 7.24853 19.4623 7.60648 20 8.06141" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path> <path d="M8 22H16" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M5 19H11M19 19H15" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2 16H22" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`);


    }


    else if (iconInfo === "partly-cloudy-day") {

        currentIcon = svgCreator(`<svg fill="#000000" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><style>.cls-1{fill:none;}</style></defs><title>partly-cloudy</title><rect x="27" y="15" width="4" height="2"></rect><rect x="23.0857" y="5.7938" width="4.2426" height="1.9998" transform="translate(2.5791 19.8139) rotate(-45)"></rect><rect x="15" y="1" width="2" height="4"></rect><rect x="4.6716" y="24.2078" width="4.2426" height="1.9998" transform="translate(-15.8349 12.1865) rotate(-45)"></rect><rect x="5.7931" y="4.6723" width="1.9998" height="4.2426" transform="translate(-2.8142 6.7932) rotate(-45)"></rect><rect x="1" y="15" width="4" height="2"></rect><path d="M26.7939,20.3418a6.9617,6.9617,0,0,0-1.8681-3.2671A8.485,8.485,0,0,0,25,16a9,9,0,1,0-14.585,7.0332A4.9771,4.9771,0,0,0,15,30H25a4.9947,4.9947,0,0,0,1.7939-9.6582ZM9,16a6.9955,6.9955,0,0,1,13.9849-.2969A6.8883,6.8883,0,0,0,20,15a7.04,7.04,0,0,0-6.7944,5.3418A4.986,4.986,0,0,0,11.5618,21.39,6.9675,6.9675,0,0,1,9,16ZM25,28H15a2.9945,2.9945,0,0,1-.6963-5.9082l.6587-.1572.0986-.67a4.9923,4.9923,0,0,1,9.878,0l.0986.6695.6587.1572A2.9945,2.9945,0,0,1,25,28Z"></path><rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32"></rect></g></svg>`);
        

    }

    else if (iconInfo === "partly-cloudy-night") {

        currentIcon = svgCreator(`<svg fill="#000000" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><style>.cls-1{fill:none;}</style></defs><title>partly-cloudy--night</title><path d="M30,19a4.974,4.974,0,0,0-3.2061-4.6582A6.9711,6.9711,0,0,0,13.7578,12.9a13.1418,13.1418,0,0,1,.1314-8.52A1.015,1.015,0,0,0,12.98,3a.9825.9825,0,0,0-.1746.0156A13.0958,13.0958,0,0,0,14.63,28.9971c.164.0063.3281,0,.4907,0a13.0412,13.0412,0,0,0,10.29-5.0386A4.99,4.99,0,0,0,30,19ZM14.7034,26.9976a11.0945,11.0945,0,0,1-3.201-21.584,15.1817,15.1817,0,0,0,.8443,9.3676A4.9877,4.9877,0,0,0,15,24h7.6772a11.0991,11.0991,0,0,1-7.5561,2.9976C14.9827,26.9976,14.8428,27.0024,14.7034,26.9976ZM25,22H15a2.9945,2.9945,0,0,1-.6963-5.9082l.6587-.1572.0986-.67a4.9923,4.9923,0,0,1,9.878.0005l.0986.6695.6587.1572A2.9945,2.9945,0,0,1,25,22Z"></path><rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32"></rect></g></svg>`);


    }


    else if (iconInfo === "rain") {

        currentIcon = svgCreator(`<svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="rain-alt" class="icon glyph"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M21,9a4,4,0,0,1-4,4H6A3,3,0,1,1,7.08,7.21a5,5,0,0,1,9-2.09A4.08,4.08,0,0,1,17,5,4,4,0,0,1,21,9ZM16.89,21.45l2-4a1,1,0,1,0-1.78-.9l-2,4a1,1,0,0,0,.44,1.34A.93.93,0,0,0,16,22,1,1,0,0,0,16.89,21.45Zm-8,0,2-4a1,1,0,1,0-1.78-.9l-2,4a1,1,0,0,0,.44,1.34A.93.93,0,0,0,8,22,1,1,0,0,0,8.89,21.45Zm5-2,1-2a1,1,0,1,0-1.78-.9l-1,2a1,1,0,0,0,.44,1.34A.93.93,0,0,0,13,20,1,1,0,0,0,13.89,19.45Zm-8,0,1-2a1,1,0,0,0-1.78-.9l-1,2a1,1,0,0,0,.44,1.34A.93.93,0,0,0,5,20,1,1,0,0,0,5.89,19.45Z"></path></g></svg>`);


    }

    else if (iconInfo === "snow") {

        currentIcon = svgCreator(`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.9994 3V7M11.9994 7V17M11.9994 7L8.99943 4M11.9994 7L14.9994 4M11.9994 17V21M11.9994 17L8.99943 20M11.9994 17L14.9994 20M4.20624 7.49999L7.67034 9.49999M7.67034 9.49999L16.3306 14.5M7.67034 9.49999L3.57227 10.5981M7.67034 9.49999L6.57227 5.40191M16.3306 14.5L19.7947 16.5M16.3306 14.5L17.4287 18.5981M16.3306 14.5L20.4287 13.4019M4.2067 16.5L7.6708 14.5M7.6708 14.5L16.3311 9.49999M7.6708 14.5L3.57273 13.4019M7.6708 14.5L6.57273 18.5981M16.3311 9.49999L19.7952 7.49999M16.3311 9.49999L17.4291 5.40192M16.3311 9.49999L20.4291 10.5981" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`);


    }

    else if (iconInfo === "wind") {

        currentIcon = svgCreator(`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M6.25 5.5C6.25 3.70508 7.70507 2.25 9.5 2.25C11.2949 2.25 12.75 3.70507 12.75 5.5C12.75 7.29493 11.2949 8.75 9.5 8.75H3C2.58579 8.75 2.25 8.41421 2.25 8C2.25 7.58579 2.58579 7.25 3 7.25H9.5C10.4665 7.25 11.25 6.4665 11.25 5.5C11.25 4.5335 10.4665 3.75 9.5 3.75C8.5335 3.75 7.75 4.5335 7.75 5.5V5.85714C7.75 6.27136 7.41421 6.60714 7 6.60714C6.58579 6.60714 6.25 6.27136 6.25 5.85714V5.5ZM14.25 7.5C14.25 5.15279 16.1528 3.25 18.5 3.25C20.8472 3.25 22.75 5.15279 22.75 7.5C22.75 9.84721 20.8472 11.75 18.5 11.75H2C1.58579 11.75 1.25 11.4142 1.25 11C1.25 10.5858 1.58579 10.25 2 10.25H18.5C20.0188 10.25 21.25 9.01878 21.25 7.5C21.25 5.98122 20.0188 4.75 18.5 4.75C16.9812 4.75 15.75 5.98122 15.75 7.5V8C15.75 8.41421 15.4142 8.75 15 8.75C14.5858 8.75 14.25 8.41421 14.25 8V7.5ZM3.25 14C3.25 13.5858 3.58579 13.25 4 13.25H18.5C20.8472 13.25 22.75 15.1528 22.75 17.5C22.75 19.8472 20.8472 21.75 18.5 21.75C16.1528 21.75 14.25 19.8472 14.25 17.5V17C14.25 16.5858 14.5858 16.25 15 16.25C15.4142 16.25 15.75 16.5858 15.75 17V17.5C15.75 19.0188 16.9812 20.25 18.5 20.25C20.0188 20.25 21.25 19.0188 21.25 17.5C21.25 15.9812 20.0188 14.75 18.5 14.75H4C3.58579 14.75 3.25 14.4142 3.25 14Z" fill="#000000"></path> </g></svg>`);

    }

    currentIcon.style.width = "100px"

    iconContainer.appendChild(currentIcon);
    
    weatherDisplayContainer.appendChild(iconContainer);

    
}

function humiditySectionGenerator(humidityInfo) {

    let container = containerMaker("humidity-container");

    let humidityTitle = textBoxMaker("h2", "humidity-title", "Humidity");

    let humidityData = textBoxMaker("p", "humidity-data", `${humidityInfo}%`);

    container.appendChild(humidityTitle);
    container.appendChild(humidityData);
    weatherDisplayContainer.appendChild(container);
}

function cloudCoverSectionGenerator(cloudCoverInfo) {

    let container = containerMaker("cloud-cover-container");

    let title = textBoxMaker("h2", "cloud-cover-title", "Cloud Cover");

    let data = textBoxMaker("p", "cloud-cover-data", `${cloudCoverInfo}%`);

    container.appendChild(title);
    container.appendChild(data);
    weatherDisplayContainer.appendChild(container);
}

function sunriseSunsetGenerator(sunState, sunData) {

    let container = containerMaker(`${sunState}-container`);

    let title = textBoxMaker("h2", `${sunState}-title`, `${sunState}`);

    let data = textBoxMaker("p", `${sunState}-data`, `${sunData}`);

    container.appendChild(title);
    container.appendChild(data);
    weatherDisplayContainer.appendChild(container);

}

function uvIndexGenerator(uvData) {

    let container = containerMaker(`uv-index-container`);

    let title = textBoxMaker("h2", `uv-index-title`, `UV Index`);

    let data;

    if (uvData === 0 || uvData === 1 || uvData === 2) {

        data = textBoxMaker("p", `uv-index-data`, `The UV is ${uvData}, low. Minimal sun cover and sunglasses are needed.`);

    }
    
    else if (uvData === 3 || uvData === 4 || uvData === 5) {

        data = textBoxMaker("p", `uv-index-data`, `The UV is ${uvData}, moderate. Sun cover, suncream, and sunglasses are needed.`);

    }

    else if (uvData === 6 || uvData === 7) {

        data = textBoxMaker("p", `uv-index-data`, `The UV is ${uvData}, high. Seek shade, use a hat, protetive clothing, suncream, and sunglasses.`);

    }

    else if (uvData === 8 || uvData === 9 || uvData === 10) {

        data = textBoxMaker("p", `uv-index-data`, `The UV is ${uvData}, very high. Minimise time outdoors and wear all protection.`);

    }

    else if (uvData === 11) {

        data = textBoxMaker("p", `uv-index-data`, `The UV is ${uvData}, extremely high. Sun damage can occur in minutes. Remain indoors if possible`)

    }


    container.appendChild(title);
    container.appendChild(data);
    weatherDisplayContainer.appendChild(container);

}