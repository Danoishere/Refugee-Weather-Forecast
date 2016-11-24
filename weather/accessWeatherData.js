var WWO = require('worldweatheronline-api');
var LocationWeather = require('./calculateWeatherMetrics');
var wwoApiKey = require('./wwoApiKey');

// Constructor
var AccessWeatherData = function(){};


// Client to access world weather online
var client = WWO.createClient({
  key: wwoApiKey.key,
  responseType: 'json',
  subscription: 'premium',
  locale: 'EN'
});

// Load weather for specific location and return the hourly data of two days
AccessWeatherData.loadWeatherForLocation = function(location, callback){

  if(location.latitude === undefined){
    console.log('No latitude defined');
    return;
  }
  if(location.longitude === undefined){
    console.log('No longitude defined');
    return;
  }

  client.marineWeatherApi({q: location.latitude + "," + location.longitude}, function(err, result) {
    if (!err) {
      var jsonResult = JSON.parse(result);
      // Take hourly data of Day 1 & 2
      var hourlyData =[];

      hourlyData = hourlyData.concat(jsonResult.data.weather[0].hourly);
      hourlyData = hourlyData.concat(jsonResult.data.weather[1].hourly);

      callback(location, hourlyData);
    } else {
      console.log('Error while loading: ' +err);
      return false;
    }
  });
};



module.exports = AccessWeatherData;
