const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', async () => {
    try {
        const APIkey = '1646f3a58ade3189326a67931d484bd5';
        const cityInput = document.querySelector('.search-box input');
        const city = cityInput.value.trim();

        if (city === '') {
            return;
        }

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`);

        if (!response.ok) {
            throw new Error('City not found');
        }

        const json = await response.json();

        updateWeatherInfo(json, city);

    } catch (error) {
        handleWeatherError(error);
    }
});

function updateWeatherInfo(weatherData, city) {
    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');

    if (cityHide.textContent === city) {
        return;
    }

    cityHide.textContent = city;
    container.style.height = '555px';
    weatherBox.classList.add('active');
    weatherDetails.classList.add('active');
    error404.classList.remove('active');

    switch (weatherData.weather[0].main) {
        case 'Clear':
            image.src = 'images/clear.png';
            break;
        case 'Rain':
            image.src = 'images/rain.png';
            break;
        case 'Snow':
            image.src = 'images/snow.png';
            break;
        case 'Clouds':
        case 'Mist':
        case 'Haze':
            image.src = 'images/cloud.png';
            break;
        default:
            image.src = 'images/default.png'; // Cambia 'default.png' por tu imagen de error predeterminada
    }

    temperature.textContent = `${weatherData.main.temp}°C`;
    description.textContent = weatherData.weather[0].description;
    humidity.textContent = `${weatherData.main.humidity}%`;
    wind.textContent = `${weatherData.wind.speed} m/s`;
}

function handleWeatherError(error) {
    container.style.height = '400px';
    weatherBox.classList.remove('active');
    weatherDetails.classList.remove('active');
    error404.classList.add('active');
    console.error('Error fetching data:', error);
}


