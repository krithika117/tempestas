const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const weatherForecastItemsEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');
const emplace = 'Chennai';

// const ci = document.querySelector('.search-bar').value;

let weather = {
    apiKey: '740f562df2c7883dad5b3bb99ff9ffe2',

    fetchCoords: function (city) {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' +
                city +
                '&units=metric&appid=' +
                this.apiKey)
            .then((response) => response.json())
            .then((coords) => this.fetchWeather(coords));
        timezone.innerHTML = city;
    },
    fetchWeather: function (coords) {
        try {
            const {
                lat,
                lon
            } = coords.coord;
            // console.log(this.lat, this.lon);
            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely&units=metric&appid=' + this.apiKey)
                .then((response) => response.json())
                .then((data) => this.displayWeather(data));
        } catch (err) {
            timezone.innerHTML = 'Please enter valid location.';
        }

    },

    displayWeather: function (data) {
 
        let {
            temp,
            humidity,
            pressure,
            sunrise,
            sunset,
            wind_speed
        } = data.current;

        timezone.innerHTML += ` (${data.timezone})`;
      
  
        // let {city} = this.fetchCoords.city;
        //console.log(name, icon, description, temp, humidity, speed);
        // console.log(date.toLocaleString('de-DE', {hour: '2-digit',   hour12: false, timeZone: 'Asia/Shanghai' }));
        //console.log(moment.format());
        
        // console.log(moment(sunrise * 1000).tz(data.timezone).format('HH:MM a'));
        // console.log(moment(sunset * 1000).tz(data.timezone).format('HH:MM a'));
        
        currentWeatherItemsEl.innerHTML =

            ` 
        <div class="area" id="time-zone">${document.querySelector('.search-bar').value} Weather Today</div>
                     <div class="weather-item">
                        <div>Humidity</div>
                        <div id="h">${humidity}%</div>
                    </div>
                    <div class="weather-item">
                        <div>Pressure</div>
                        <div id="p">${pressure}</div>
                    </div>
                    <div class="weather-item">
                        <div>Windspeed</div>
                        <div id="w">${wind_speed} km/h</div>
                    </div>
                    <div class="weather-item">
                        <div>Sunrise</div>
                        <div id="w">${window.moment(sunrise * 1000).tz(data.timezone).format('HH:MM a')}</div>
                    </div>
                    <div class="weather-item">
                        <div>Sunset</div>
                        <div id="w">${window.moment(sunset * 1000).tz(data.timezone).format('HH:MM a')}</div>
                    </div>
`


        let otherdayforecast = ''
        let currentforecast = ''
        data.daily.forEach((day, idx) => {
            if (idx == 0) {
                currentforecast += `
                <div class="weather-forecast-item animcontainer">
                <div class="day">Today</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" class="w-icon" alt="weather icon">
                <div class="desc des">${day.weather[0].description}</div>
                <div class="temp">Day: ${day.temp.day}&#176; C</div>
                <div class="temp">Night: ${day.temp.night}&#176; C</div>
            </div>`
            } else {
                otherdayforecast += `
            <div class="weather-forecast-item animcontainer">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" class="w-icon" alt="weather icon">
                <div class="desc des">${day.weather[0].description}</div>
                <div class="temp">Day: ${day.temp.day}&#176; C</div>
                <div class="temp">Night: ${day.temp.night}&#176; C</div>
            </div>`
            }
        })
        weatherForecastItemsEl.innerHTML = otherdayforecast;
        currentTempEl.innerHTML = currentforecast;

        // console.log(formatter.format(new Date()));

        // const time = new Date(new Date().toLocaleString('en-US', {timeZone: data.timezone}));

        const tz = data.timezone;

    },
    search: function () {
        this.fetchCoords(document.querySelector('.search-bar').value);
    },
};

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

setInterval(() => {
    weather.coords
    // timeEl.innerHTML = hour + ":" + minutes + `<span id="am-pm"> ${ampm} </span>`;

    // const tz = weather.timezone;

    const time = new Date();
    // const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const minutes = time.getMinutes();
    // const hin12Hy = hour >= 13 ? hour % 12 : hour;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    timeEl.innerHTML = (hour < 10 ? '0' + hour : hour) + ":" + (minutes < 10 ? '0' + minutes : minutes) + `<span id="am-pm"> hrs  </span>`;
    dateEl.innerHTML = days[day] + ", " + date + " " + months[month];
}, 1000);

document.querySelector('.search button').addEventListener('click', function () {
    weather.search();
});
document.querySelector('.search-bar').addEventListener('keyup', function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});
weather.fetchCoords('Chennai');

//Dynamic bg
var currentTime = new Date().getHours();

if (document.body) {
    if (7 <= currentTime && currentTime < 15) {
        document.body.background = "./images/mor.svg";
    } else if (15 <= currentTime && currentTime < 19) {
        document.body.background = "./images/bg1.svg";
    } else {
        document.body.background = "./images/night.svg";
    }
}