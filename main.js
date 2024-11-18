function fetchWeather() {
    var city = document.getElementById('city-input').value;
    var apiKey = `bab281d79e5f1e9755a68d754cc313e7`;
    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=de`;

    document.getElementById('hourly-output').style.display = 'none';
    document.getElementById('hourly-title').style.display = 'none';
    document.getElementById('hourly-forecast').innerHTML = '';


    document.getElementById('app-title').style.display = 'none';




    fetch(apiUrl)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Stadt nicht gefunden');
            }
            return response.json();
        })
        .then(function(data) {
            displayWeather(data);
            displayHourlyForecast(data);

          
            document.getElementById('search-box').style.display = 'none';
            document.getElementById('fetch-btn').style.display = 'none';
            document.getElementById('show-search-btn').style.display = 'block';
            document.getElementById('hourly-output').style.display = 'block';
            document.getElementById('hourly-title').style.display = 'block';
        })
        .catch(function(error) {
            console.error('Fehler:', error);

       
            document.getElementById('weather-output').innerHTML = `<p>Stadt nicht gefunden!</p>`;
            document.getElementById('weather-output').style.display = 'block';
            document.querySelector("label[for='city-input']").innerText = 'Bitte aktualisieren Sie die Seite!';
            document.getElementById('app-title').style.display = 'none';
            document.getElementById('fetch-btn').style.display = 'none';
            document.getElementById('show-search-btn').style.display = 'none';

           
            document.body.style.backgroundImage = "url('./falsch.png')";
        });
}

function handleEnter(event) {
    if (event.key === 'Enter') {
        fetchWeather();
    }
}


function displayWeather(data) {
    var weatherOutput = document.getElementById('weather-output');
    var cityName = document.getElementById('city-name');
    var currentTemp = document.getElementById('current-temp');
    var weatherDescription = document.getElementById('weather-description');
    var highLow = document.getElementById('high-low');
    var windInfo = document.getElementById('wind-info');
    var humidityInfo = document.getElementById('humidity-info');
    var pressureInfo = document.getElementById('pressure-info');


    if (!cityName || !currentTemp || !weatherDescription || !highLow || !windInfo || !humidityInfo || !pressureInfo) {
        console.error("Ein oder mehrere HTML-Elemente konnten nicht gefunden werden.");
        return;
    }

   
    if (data && data.list && data.list[0] && data.city) {
        var temp = Math.round(data.list[0].main.temp);
        var tempMax = Math.round(data.list[0].main.temp_max);
        var tempMin = Math.round(data.list[0].main.temp_min);
        var windSpeed = Math.round(data.list[0].wind.speed);
        var humidity = data.list[0].main.humidity;
        var pressure = data.list[0].main.pressure;

        cityName.innerHTML = data.city.name;
        currentTemp.innerHTML = `${temp} °C`;
        weatherDescription.innerHTML = data.list[0].weather[0].description;
        highLow.innerHTML = `H: ${tempMax} °C | T: ${tempMin} °C`;
        
       
        windInfo.innerHTML = `Wind: ${windSpeed} m/s`;
        humidityInfo.innerHTML = `Feuchtigkeit: ${humidity}%`;
        pressureInfo.innerHTML = `Luftdruck: ${pressure} hPa`;

        weatherOutput.style.display = 'block';

    
        var weatherBackgrounds = {
            clear: "url('./clear.png')",
            clouds: "url('./cloud.png')",
            rain: "url('./hagel.png')",
            drizzle: "url('./hagel.png')",
            snow: "url('./snow.png')",
            thunderstorm: "url('./sturm.png')",
            sun: "url('./sonne.png')",
            mist: "url('./trub.png')",
            fog: "url('./trub.png')"
        };

        var weatherType = data.list[0].weather[0].main.toLowerCase();
        var backgroundImage = weatherBackgrounds[weatherType] || "";

        document.body.style.backgroundImage = backgroundImage;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
    } else {
   
        weatherOutput.innerHTML = `<p>Stadt nicht gefunden.</p>`;
        weatherOutput.style.display = 'block';
        document.body.style.backgroundImage = "url('./falsch.png')";
    }
}function displayWeather(data) {
    var weatherOutput = document.getElementById('weather-output');
    var cityName = document.getElementById('city-name');
    var currentTemp = document.getElementById('current-temp');
    var weatherDescription = document.getElementById('weather-description');
    var highLow = document.getElementById('high-low');
    var windInfo = document.getElementById('wind-info');
    var humidityInfo = document.getElementById('humidity-info');
    var pressureInfo = document.getElementById('pressure-info');

    if (!cityName || !currentTemp || !weatherDescription || !highLow || !windInfo || !humidityInfo || !pressureInfo) {
        console.error("Ein oder mehrere HTML-Elemente konnten nicht gefunden werden.");
        return;
    }

    if (data && data.list && data.list[0] && data.city) {
        var temp = Math.round(data.list[0].main.temp);
        var tempMax = Math.round(data.list[0].main.temp_max);
        var tempMin = Math.round(data.list[0].main.temp_min);
        var windSpeed = Math.round(data.list[0].wind.speed);
        var humidity = data.list[0].main.humidity;
        var pressure = data.list[0].main.pressure;

        cityName.innerHTML = data.city.name;
        currentTemp.innerHTML = `${temp} °C`;
        weatherDescription.innerHTML = data.list[0].weather[0].description;
        highLow.innerHTML = `H: ${tempMax} °C | T: ${tempMin} °C`;
   
        windInfo.innerHTML = `Wind: ${windSpeed} m/s`;
        humidityInfo.innerHTML = `Feuchtigkeit: ${humidity}%`;
        pressureInfo.innerHTML = `Luftdruck: ${pressure} hPa`;
        weatherOutput.style.display = 'block';

  
        var weatherBackgrounds = {
            clear: "url('./clear.png')",
            clouds: "url('./cloud.png')",
            rain: "url('./hagel.png')",
            drizzle: "url('./hagel.png')",
            snow: "url('./snow.png')",
            thunderstorm: "url('./sturm.png')",
            sun: "url('./sonne.png')",
            mist: "url('./trub.png')",
            fog: "url('./trub.png')"
        };

        var weatherType = (data.list[0].weather && data.list[0].weather[0].main.toLowerCase()) || 'default';
        var backgroundImage = weatherBackgrounds[weatherType] || "url('./default-background.png')";

        document.body.style.backgroundImage = backgroundImage;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
    } else {
  
        weatherOutput.innerHTML = `<p>Stadt nicht gefunden.</p>`;
        weatherOutput.style.display = 'block';
        document.body.style.backgroundImage = "url('./falsch.png')";
    }
}



function displayHourlyForecast(data) {
    var hourlyForecast = document.getElementById('hourly-forecast');
    hourlyForecast.innerHTML = '';

    var forecastHours = data.list.slice(0, 8 * 3);
    forecastHours.forEach(function(hour) {
        var time = new Date(hour.dt * 1000);
        var hourTime = (time.getHours() < 10 ? '0' : '') + time.getHours() + ':00';
        var temp = Math.round(hour.main.temp);
        var description = hour.weather[0].description;

        hourlyForecast.innerHTML += `
            <div class="hourly-item">
                <strong>${hourTime}</strong>
                <p>${temp} °C</p>
                <p>${description}</p>
            </div>
        `;
    });
}

function showSearchBox() {
    document.getElementById('search-box').style.display = 'block';
    document.getElementById('fetch-btn').style.display = 'block';
    document.getElementById('show-search-btn').style.display = 'none';
    document.getElementById('weather-output').style.display = 'none';
    document.getElementById('city-input').value = '';
    document.getElementById('hourly-output').style.display = 'none';
    document.getElementById('hourly-title').style.display = 'none';
    document.body.style.backgroundImage = "url('./background.png')";
    document.getElementById('app-title').style.display = 'block';
}