const apiKey = "YOUR_API_KEY";

// Fetch weather by city name
function fetchWeatherByCity() {
    const city = document.getElementById('city-input').value;
    if (!city) return alert('Please enter a city name');

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => alert('City not found'));
}

// Fetch weather by user location
function fetchWeatherByLocation() {
    if (!navigator.geolocation) {
        return alert("Geolocation is not supported by your browser");
    }
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => displayWeather(data))
            .catch(error => alert('Error fetching weather data'));
    });
}

// Display weather data
function displayWeather(data) {
    document.getElementById('location').textContent = `Location: ${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
    document.getElementById('conditions').textContent = `Conditions: ${data.weather[0].description}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
}
