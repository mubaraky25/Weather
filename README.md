
MyWeather.js is a comprehensive JavaScript weather library built around the OpenWeatherMap API. It was created to provide a robust and easy-to-use interface for retrieving weather information. Currently, OpenWeatherMap is the only supported data provider.

MyWeather.js is under active development, and contributions are welcome! Some of the planned features include:

Historical weather information
Expanded API key usage
Additional data sources
More conversion utility
Note: Future updates may include support for other weather data providers. If you have suggestions for additional providers, please open a new issue with details about the provider and its API.

MyWeather.js was forked and modified by Mubarak Yussuf from the original Weather.js library created by Noah Smith.

Install
MyWeather.js works in both the browser and Node.js. For browser usage, download the latest version from GitHub. For Node.js, install it via NPM:

npm install -g myweather.js

## Testing
To run the JavaScript unit tests, use:
npm run test
```

## Usage

MyWeather.js allows you to access current weather conditions and forecasts for any city. By default, it uses the closest match as returned by OpenWeatherMap.

```javascript
// API Key methods
var apiKey = 'your-api-key';
WeatherApp.setApiKey(apiKey);
var tempApiKey = WeatherApp.getApiKey();

// Language methods
var language = "es"; // set the language to Spanish - library's default language is "en" (English)
WeatherApp.setLanguage(language);
var tempLanguage = WeatherApp.getLanguage();

var cityId = '4393217';

// Get current weather for a given city
WeatherApp.getCurrentWeatherByCity('Kansas City', function(current) {
    console.log(
        ['Currently:', current.temperature(), 'and', current.conditions()].join(' ')
    );
});

// Get the current weather for a given city using the city id
WeatherApp.getCurrentWeatherByCityId(cityId, function(current) {
    console.log(
        ['Currently:', current.temperature(), 'and', current.conditions()].join(' ')
    );
});

// Get the current weather for a given city using the latitude and longitude
var lat = 39.100,
    lon = -94.579;
WeatherApp.getCurrentWeatherByCoordinates(lat, lon, function(current) {
    console.log(
        ['Currently:', current.temperature(), 'and', current.conditions()].join(' ')
    );
});

// Get the forecast for a given city
WeatherApp.getWeatherForecastByCity('Kansas City', function(forecast) {
    console.log('Forecast High in Kelvin: ' + forecast.high());
    console.log('Forecast High in Fahrenheit: ' + WeatherApp.kelvinToFahrenheit(forecast.high()));
    console.log('Forecast High in Celsius: ' + WeatherApp.kelvinToCelsius(forecast.high()));
});

// Get the forecast for a given city using the city id
WeatherApp.getWeatherForecastByCityId(cityId, function(forecast) {
    console.log('Forecast High in Kelvin: ' + forecast.high());
    console.log('Forecast High in Fahrenheit: ' + WeatherApp.kelvinToFahrenheit(forecast.high()));
    console.log('Forecast High in Celsius: ' + WeatherApp.kelvinToCelsius(forecast.high()));
});

// Get the forecast for a given city using the latitude and longitude
WeatherApp.getWeatherForecastByCoordinates(lat, lon, function(forecast) {
    console.log('Forecast High in Kelvin: ' + forecast.high());
    console.log('Forecast High in Fahrenheit: ' + WeatherApp.kelvinToFahrenheit(forecast.high()));
    console.log('Forecast High in Celsius: ' + WeatherApp.kelvinToCelsius(forecast.high()));
});


[openweathermap.org]: http://openweathermap.org
[Weather.js]: https://github.com/mubaraky25/Weather
