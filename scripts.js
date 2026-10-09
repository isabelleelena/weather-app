// Get weather info

// VISUAL CROSSING API KEY: BKCJWHGKVN7TN2PLK4YMYEXHZ

function getWeatherData(place) {

    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?key=BKCJWHGKVN7TN2PLK4YMYEXHZ`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data.currentConditions.temp);
    })

    .catch(function(err){
        console.error("Something went wrong")
    })


}

getWeatherData("london")