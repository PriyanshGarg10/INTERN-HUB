document.getElementById('getWeatherBtn').addEventListener('click', getWeather);

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = '02ffa7bbfe0aaba405e8727d5bf89306';
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    try {
        // Fetch current weather
        const currentWeatherResponse = await fetch(currentWeatherUrl);
        const currentWeatherData = await currentWeatherResponse.json();

        if (currentWeatherData.cod !== 200) {
            alert('City not found!');
            return;
        }

        displayCurrentWeather(currentWeatherData);

        // Fetch 5-day forecast
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayCurrentWeather(data) {
    document.getElementById('cityName').textContent = `Weather in ${data.name}`;
    document.getElementById('currentTemp').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('currentHumidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('weatherCondition').textContent = `Condition: ${data.weather[0].description}`;
}

function displayForecast(data) {
    const forecastCards = document.getElementById('forecastCards');
    forecastCards.innerHTML = '';

    // Filter to get one forecast per day (every 24 hours)
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00'));

    dailyForecasts.forEach(day => {
        const date = new Date(day.dt_txt).toDateString();
        const temp = day.main.temp;
        const condition = day.weather[0].description;

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <p>${date}</p>
            <p>${temp}°C</p>
            <p>${condition}</p>
        `;

        forecastCards.appendChild(card);
    });
}