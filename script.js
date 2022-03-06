const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
let weather = {
    apiKey: '740f562df2c7883dad5b3bb99ff9ffe2',
    fetchWeather: function (city) {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' +
                city +
                '&units=metric&appid=' +
                this.apiKey)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const {
            name
        } = data;
        const {
            icon,
            description
        } = data.weather[0];
        const {
            temp,
            humidity
        } = data.main;
        const {
            speed
        } = data.wind;
        //console.log(name, icon, description, temp, humidity, speed);
        document.querySelector('.time-zone').innerText = "Weather in " + name;
        document.querySelector('.desc').innerText = description;
        document.querySelector('.temp').innerText = temp + '° C';
        document.querySelector('#h').innerText = humidity+'%';
        document.querySelector('#w').innerText = speed+' km/h';
        document.querySelector('.w-icon').src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    },
    search: function(){
        this.fetchWeather(document.querySelector('.search-bar').value);
    },
};
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

setInterval(()=>{
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const hin12Hy = hour>= 13 ? hour%12 : hour;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    // timeEl.innerHTML = hour + ":" + minutes + `<span id="am-pm"> ${ampm} </span>`;
    timeEl.innerHTML = hour + ":" + minutes + `<span id="am-pm"> hrs </span>`;
    dateEl.innerHTML = days[date-1] + ", " + date + " " + months[month] ;

},1000);

document.querySelector('.search button').addEventListener('click',function(){
    weather.search();
});
document.querySelector('.search-bar').addEventListener('keyup',function(event){
    if(event.key=="Enter"){
        weather.search();
    }
});
weather.fetchWeather('Chennai');