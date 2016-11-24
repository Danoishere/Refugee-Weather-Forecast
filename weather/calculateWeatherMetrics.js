var CalculateWeatherMetrics = function(){};

CalculateWeatherMetrics.createForecastMetrics = function(location, hourlyData){
  if(hourlyData !== undefined && location !== undefined){

    //location.weatherData = hourlyData;
    location.weatherDataDay = hourlyData.slice(0,6);
    location.weatherDataNight = hourlyData.slice(7,14);

    location.maxTempDay = CalculateWeatherMetrics.getMax('tempC', location.weatherDataDay);
    location.minTempDay = CalculateWeatherMetrics.getMin('tempC', location.weatherDataDay);
    location.maxTempNight = CalculateWeatherMetrics.getMax('tempC', location.weatherDataNight);
    location.minTempNight = CalculateWeatherMetrics.getMin('tempC', location.weatherDataNight);

    location.maxWindForceDay = CalculateWeatherMetrics.getMax('windspeedKmph', location.weatherDataDay);
    location.minWindForceDay = CalculateWeatherMetrics.getMin('windspeedKmph', location.weatherDataDay);
    location.maxWindForceNight = CalculateWeatherMetrics.getMax('windspeedKmph', location.weatherDataNight);
    location.minWindForceNight = CalculateWeatherMetrics.getMin('windspeedKmph', location.weatherDataNight);

    location.maxWaterTemperatureDay = CalculateWeatherMetrics.getMax('waterTemp_C', location.weatherDataDay);
    location.minWaterTemperatureDay = CalculateWeatherMetrics.getMin('waterTemp_C', location.weatherDataDay);
    location.maxWaterTemperatureNight = CalculateWeatherMetrics.getMax('waterTemp_C', location.weatherDataNight);
    location.minWaterTemperatureNight = CalculateWeatherMetrics.getMin('waterTemp_C', location.weatherDataNight);

    location.maxWaveHeightDay = CalculateWeatherMetrics.getMax('swellHeight_m', location.weatherDataDay);
    location.maxWaveHeightNight = CalculateWeatherMetrics.getMax('swellHeight_m', location.weatherDataNight);



    return location;
  }
  return false;
};

CalculateWeatherMetrics.getMax = function(prop, hourlyData){
  console.log('GETMAX ' + prop);
  var value = 0;
  hourlyData.forEach(function (hour){
    console.log('- Check ' + hour[prop] );
    if(+hour[prop] > +value){
      console.log('- Take ' + hour[prop] );
      value = hour[prop];
    }
  });
  return value;
};

CalculateWeatherMetrics.getMin = function(prop, hourlyData){
  console.log('GETMIN ' + prop);
  var value = 100;
  hourlyData.forEach(function (hour){
    console.log('- Check if ' + hour[prop] + ' < ' + value );
    if(+hour[prop] < +value){
      console.log('- Take ' + hour[prop] );
      value = hour[prop];
    }
  });
  return value;
};

module.exports =  CalculateWeatherMetrics;
