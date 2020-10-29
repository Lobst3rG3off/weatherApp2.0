window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.weather');
    let temperatureDegree = document.querySelector('.temp');
    let locationTimezone = document.querySelector('.city');
    
    

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition
        (position => {
           long = position.coords.longitude;
           lat = position.coords.latitude;

           const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=a539800931c1b68275dcba2ff586cf92`;

           fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data)
            const {temp} = data.main;
            const {description, icon} = data.weather[0]
            //Set DOM Elements from the API
            temperatureDegree.textContent = temp
            temperatureDescription.textContent = description
            locationTimezone.textContent = data.name
        })
        });
    } else{
        h1.textContent = "This is not working because, well Reasons. Mostly No Geo Location."
    }

    
});

const api = {
    key: "cf72cc4457010b013da58f71fa74dd7b",
    base: "http://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(e) { 
    if (e.keyCode == 13) {
        getResults(searchBox.value);
        console.log(searchBox.value)
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(weather => {
        return weather.json()
    }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather)
}