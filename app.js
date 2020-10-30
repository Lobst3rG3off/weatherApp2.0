window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.weather');
    let temperatureDegree = document.querySelector('.temp');
    let locationTimezone = document.querySelector('.city');
    let hilow = document.querySelector('.hi-low');
    

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
            const {temp, temp_max, temp_min} = data.main;
            const {description} = data.weather[0]
            //Set DOM Elements from the API
            temperatureDegree.textContent = `${Math.round(temp)}°c`
            temperatureDescription.textContent = description
            locationTimezone.textContent = data.name
            hilow.innerText = `${Math.round(temp_min)}°c / ${Math.round(temp_max)}°c`;
            
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
      
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(weather => {
        return weather.json()
    }).then(displayResults);
}

function displayResults(weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}





function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;

}