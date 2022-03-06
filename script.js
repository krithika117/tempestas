const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
let weather = {
    apiKey: '740f562df2c7883dad5b3bb99ff9ffe2',

    fetchCoords: function (city) {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' +
                city +
                '&units=metric&appid=' +
                this.apiKey)
            .then((response) => response.json())
            .then((coords) => this.fetchWeather(coords));
    },
    fetchWeather: function (coords){
        const {lat, lon} = coords.coord;
        console.log(this.lat, this.lon);
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=hourly&appid=' + this.apiKey)
            .then((response) => response.json())
            .then((data) => console.log(data));
            
    },
 
    displayWeather: function (data) {
        const {
            name
        } = data;
        // const {
        //     icon,
        //     description
        // } = data.weather[0];
        const {
            temp,
            humidity,
            pressure
        } = data.main;
        const {
            speed
        } = data.wind;
        //console.log(name, icon, description, temp, humidity, speed);
        document.querySelector('.time-zone').innerText = "Weather in " + name;
        document.querySelector('.desc').innerText = description;
        document.querySelector('.temp').innerText = temp + '° C';
        document.querySelector('#h').innerText = humidity + '%';
        document.querySelector('#p').innerText = pressure;
        document.querySelector('#w').innerText = speed + ' km/h';
        document.querySelector('.w-icon').src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    },
    search: function () {
        this.fetchCoords(document.querySelector('.search-bar').value);
    },
};
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    // hour = hour<10 and hour ? ('0'+hour) : hour;
    const minutes = time.getMinutes();
    const hin12Hy = hour >= 13 ? hour % 12 : hour;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    // timeEl.innerHTML = hour + ":" + minutes + `<span id="am-pm"> ${ampm} </span>`;
    timeEl.innerHTML = hour + ":" + minutes + `<span id="am-pm"> hrs </span>`;
    dateEl.innerHTML = days[date - 1] + ", " + date + " " + months[month];

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