var ManageLocations = require('../locations/ManageLocations');
var WeatherAccess = require('./accessWeatherData');
var WeatherMetrics = require('./calculateWeatherMetrics');
var dateFormat = require('dateformat');
var WeatherService = function(){};

WeatherService.prototype.updateWeatherDataForAllLocations = function(name, countryCode, latitude, longitude){
  try {
    var locations = ManageLocations.getAllLocations();
    locations.forEach(function (location) {
      WeatherAccess.loadWeatherForLocation(location, function(loadedLocation, hourlyWeatherData){
        loadedLocation =  WeatherMetrics.createForecastMetrics(loadedLocation,hourlyWeatherData);
        loadedLocation.updatedAt = dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT");
        ManageLocations.saveLocation(loadedLocation);
      });
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = new WeatherService();
