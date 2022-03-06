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
        console.log(name, icon, description, temp, humidity, speed);
        document.querySelector('.time-zone').innerText = "Weather in " + name;
        document.querySelector('.desc').innerText = description;
        document.querySelector('.temp').innerText = temp + '° C';
        document.querySelector('#h').innerText = humidity;
        document.querySelector('#w').innerText = speed;
        document.querySelector('.w-icon').src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    }
};