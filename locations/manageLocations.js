var storage = require('node-persist');
storage.initSync();

var ManageLocations = function(){};

ManageLocations.addLocation = function(name, countryCode, latitude, longitude){
  var location = storage.getItemSync('loc:' + name);
  if(location !== undefined){
    console.log('Existing ' + name + ' found');
    location.name = name;
    location.countryCode = countryCode;
    location.latitude = latitude;
    location.longitude = longitude;
    storage.setItemSync('loc:' + name, location);
    return;
  }

  location = {
    name:name,
    countryCode: countryCode,
    latitude: latitude,
    longitude: longitude
  };
  //then start using it
  storage.setItemSync('loc:' + name, location);
};

ManageLocations.saveLocation = function(location){
  storage.setItemSync('loc:' + location.name, location);
};

ManageLocations.getAllLocations = function(){
  return storage.valuesWithKeyMatch('loc:');
};

module.exports = ManageLocations;
