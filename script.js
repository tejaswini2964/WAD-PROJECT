const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '427c84b12c46ea47bd641c24e5b1c0d2';

$(document).ready(function () {
    weatherFn('Vijayawada');
});

async function weatherFn(cName) {
    const temp = `${url}?q=${cName}&appid=${apiKey}&units=metric`;
    try {
        const res = await fetch(temp);
        const data = await res.json();
        if (res.ok) {
            weatherShowFn(data);
        } else {
            alert('City not found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function weatherShowFn(data) {
    $('#city-name').text(data.name);
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $('#temperature').html(`${data.main.temp}°C`);
    $('#description').text(data.weather[0].description);
    $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);

    // Construct the URL for the weather icon
    const iconCode = data.weather[0].icon; // Get the icon code from the data
    $('#weather_icon').attr('src', `https://openweathermap.org/img/wn/${iconCode}@2x.png`); // Set the src attribute to the icon URL

    $('#weather-info').fadeIn();
}