let weather = {
    apiKey: '740f562df2c7883dad5b3bb99ff9ffe2',
    fetchWeather: function (city) {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' +
                city +
                '&units=metric&appid=' +
                this.apiKey)
            .then((response) => response.json())
            .then((data) => console.log(data));
    },
    displayWeather: function(data){
    }
};