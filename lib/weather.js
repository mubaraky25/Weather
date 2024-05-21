// Check if the environment is Node.js
var isNode = typeof module !== "undefined" && module.exports;

// Import modules if in Node.js environment
if (isNode) {
    var http = require('http');
    var URL = require('url');
}

// Main Weather object
var WeatherApp = { Utils: {} };

WeatherApp.VERSION = "1.0.0";  // Updated version
WeatherApp.LANGUAGE = "en";    // Default language is English

// JSONP utility function for browser environment
WeatherApp.Utils.jsonp = function (uri, callback) {
    return new Promise(function (resolve, reject) {
        var id = '_' + Math.round(10000 * Math.random());
        var callbackName = 'jsonp_callback_' + id;
        var el = (document.getElementsByTagName('head')[0] || document.body || document.documentElement);
        var script = document.createElement('script');
        var src = uri + '&callback=' + callbackName;

        window[callbackName] = function (data) {
            delete window[callbackName];
            var ele = document.getElementById(id);
            ele.parentNode.removeChild(ele);
            resolve(data);
        };

        script.src = src;
        script.id = id;
        script.addEventListener('error', reject);
        el.appendChild(script);
    });
};

// Set and get API key
WeatherApp.getApiKey = function () {
    return WeatherApp.APIKEY;
};

WeatherApp.setApiKey = function (apiKey) {
    WeatherApp.APIKEY = apiKey;
};

// Set and get language
WeatherApp.getLanguage = function () {
    return WeatherApp.LANGUAGE;
};

WeatherApp.setLanguage = function (language) {
    WeatherApp.LANGUAGE = language;
};

// Temperature conversion functions
WeatherApp.kelvinToFahrenheit = function (value) {
    return (WeatherApp.kelvinToCelsius(value) * 1.8) + 32;
};

WeatherApp.kelvinToCelsius = function (value) {
    return value - 273.15;
};

// Fetch current weather by city name
WeatherApp.getCurrentWeatherByCity = function (city, callback) {
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent(city) + "&cnt=1";

    if (WeatherApp.LANGUAGE) {
        url += "&lang=" + WeatherApp.LANGUAGE;
    }

    if (WeatherApp.APIKEY) {
        url += "&APPID=" + WeatherApp.APIKEY;
    } else {
        console.error('WARNING: You must provide an OpenWeatherMap API key.');
        return;
    }

    return WeatherApp._fetchData(url, function (data) {
        callback(new WeatherApp.CurrentWeather(data));
    });
};

// Fetch current weather by city ID
WeatherApp.getCurrentWeatherByCityId = function (cityId, callback) {
    var url = "https://api.openweathermap.org/data/2.5/weather?id=" + encodeURIComponent(cityId) + "&cnt=1";

    if (WeatherApp.LANGUAGE) {
        url += "&lang=" + WeatherApp.LANGUAGE;
    }

    if (WeatherApp.APIKEY) {
        url += "&APPID=" + WeatherApp.APIKEY;
    } else {
        console.error('WARNING: You must provide an OpenWeatherMap API key.');
        return;
    }

    return WeatherApp._fetchData(url, function (data) {
        callback(new WeatherApp.CurrentWeather(data));
    });
};

// Fetch current weather by geographic coordinates
WeatherApp.getCurrentWeatherByCoordinates = function (lat, lon, callback) {
    var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + encodeURIComponent(lat) + "&lon=" + encodeURIComponent(lon) + "&cnt=1";

    if (WeatherApp.LANGUAGE) {
        url += "&lang=" + WeatherApp.LANGUAGE;
    }

    if (WeatherApp.APIKEY) {
        url += "&APPID=" + WeatherApp.APIKEY;
    } else {
        console.error('WARNING: You must provide an OpenWeatherMap API key.');
        return;
    }

    return WeatherApp._fetchData(url, function (data) {
        callback(new WeatherApp.CurrentWeather(data));
    });
};

// Fetch weather forecast by city name
WeatherApp.getWeatherForecastByCity = function (city, callback) {
    var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + encodeURIComponent(city) + "&cnt=1";

    if (WeatherApp.LANGUAGE) {
        url += "&lang=" + WeatherApp.LANGUAGE;
    }

    if (WeatherApp.APIKEY) {
        url += "&APPID=" + WeatherApp.APIKEY;
    } else {
        console.error('WARNING: You must provide an OpenWeatherMap API key.');
        return;
    }

    return WeatherApp._fetchData(url, function (data) {
        callback(new WeatherApp.WeatherForecast(data));
    });
};

// Fetch weather forecast by city ID
WeatherApp.getWeatherForecastByCityId = function (cityId, callback) {
    var url = "https://api.openweathermap.org/data/2.5/forecast?id=" + encodeURIComponent(cityId) + "&cnt=1";

    if (WeatherApp.LANGUAGE) {
        url += "&lang=" + WeatherApp.LANGUAGE;
    }

    if (WeatherApp.APIKEY) {
        url += "&APPID=" + WeatherApp.APIKEY;
    } else {
        console.error('WARNING: You must provide an OpenWeatherMap API key.');
        return;
    }

    return WeatherApp._fetchData(url, function (data) {
        callback(new WeatherApp.WeatherForecast(data));
    });
};

// Fetch weather forecast by geographic coordinates
WeatherApp.getWeatherForecastByCoordinates = function (lat, lon, callback) {
    var url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + encodeURIComponent(lat) + "&lon=" + encodeURIComponent(lon) + "&cnt=1";

    if (WeatherApp.LANGUAGE) {
        url += "&lang=" + WeatherApp.LANGUAGE;
    }

    if (WeatherApp.APIKEY) {
        url += "&APPID=" + WeatherApp.APIKEY;
    } else {
        console.error('WARNING: You must provide an OpenWeatherMap API key.');
        return;
    }

    return WeatherApp._fetchData(url, function (data) {
        callback(new WeatherApp.WeatherForecast(data));
    });
};

// Internal function to fetch data using JSONP or HTTP GET
WeatherApp._fetchData = function (url, callback) {
    if (isNode) {
        return http.get(URL.parse(url), function (response) {
            var body = '';
            response.on('data', function (chunk) {
                body += chunk;
            });
            response.on('end', function () {
                callback(JSON.parse(body));
            });
        });
    } else {
        WeatherApp.Utils.jsonp(url).then(callback);
    }
};

// Utility functions
WeatherApp.Utils.maxBy = function (list, iterator) {
    var max;
    var f = function (memo, d) {
        var val = iterator(d);

        if (memo === null || val > max) {
            max = val;
            memo = d;
        }

        return memo;
    };

    return list.reduce(f, null);
};

WeatherApp.Utils.minBy = function (list, iterator) {
    var min;
    var f = function (memo, d) {
        var val = iterator(d);

        if (memo === null || val < min) {
            min = val;
            memo = d;
        }

        return memo;
    };

    return list.reduce(f, null);
};

WeatherApp.Utils.isOnDate = function (a, b) {
    var sameYear = a.getYear() === b.getYear();
    var sameMonth = a.getMonth() === b.getMonth();
    var sameDate = a.getDate() === b.getDate();

    return sameYear && sameMonth && sameDate;
};

// Weather forecast class
WeatherApp.WeatherForecast = function (data) {
    this.data = data;
};

WeatherApp.WeatherForecast.prototype.startAt = function () {
    return new Date(WeatherApp.Utils.minBy(this.data.list, function (d) { return d.dt; }).dt * 1000);
};

WeatherApp.WeatherForecast.prototype.endAt = function () {
    return new Date(WeatherApp.Utils.maxBy(this.data.list, function (d) { return d.dt; }).dt * 1000);
};

WeatherApp.WeatherForecast.prototype.day = function (date) {
    return new WeatherApp.WeatherForecast(this._filter(date));
};

WeatherApp.WeatherForecast.prototype.low = function () {
    if (this.data.list.length === 0) return;

    var output = WeatherApp.Utils.minBy(this.data.list, function (item) {
        return item.main.temp_min;
    });

    return output.main.temp_min;
};

WeatherApp.WeatherForecast.prototype.high = function () {
    if (this.data.list.length === 0) return;

    var output = WeatherApp.Utils.maxBy(this.data.list, function (item) {
        return item.main.temp_max;
    });

    return output.main.temp_max;
};

WeatherApp.WeatherForecast.prototype._filter = function (date) {
    return {        list: this.data.list.filter(function (range) {
        var dateTimestamp = range.dt * 1000;

        if (WeatherApp.Utils.isOnDate(new Date(dateTimestamp), date)) {
            return range;
        }
    })
};
};

// Current weather class
WeatherApp.CurrentWeather = function (data) {
this.data = data;
};

WeatherApp.CurrentWeather.prototype.temperature = function () {
return this.data.main.temp;
};

WeatherApp.CurrentWeather.prototype.conditions = function () {
return this.data.weather[0].description;
};

// Export or attach to window object depending on environment
if (isNode) {
module.exports = WeatherApp;
} else {
window.WeatherApp = WeatherApp;
}

       
