function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = 'YOUR_API_KEY';
    const apiUrl = https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherDiv = document.getElementById('weather');
            weatherDiv.innerHTML = `
                <h2>${data.name}</h2>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
        });
}