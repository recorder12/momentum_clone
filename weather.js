const weather = document.querySelector(".js-weather");
const recommandDisplay = document.querySelector(".js-recommand");
const API_KEY = "20cb54b025f40658c65f42cbe3bc445a";
const COORDS = 'coords'

function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric
    `).then(function(response){
        return response.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        const sky = json.weather[0].main;

        if (temperature < -10) {
            recommand = "You should dress warmly";
        }
        else if ( temperature >= -10 && temperature < 20 ){
            recommand = "Today is some cold";
        }
        else if (temperature >= 20 && temperature < 30) {
            recommand = "Spring weather. Enjoy this time !!";
        }
        else if (temperature >= 30) {
            recommand = "It's hot summer. you should drink lots of water";
        }
        recommandDisplay.innerText = `"${recommand}"`;
        weather.innerText = `${place} \n\n Weather : ${sky},  Temperature : ${Math.floor(temperature)} °C` ;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}


function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log('Cant access geo location')
}


function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}



function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null){
        askForCoords();
    }else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}


function init(){
    loadCoords();

}

init();

