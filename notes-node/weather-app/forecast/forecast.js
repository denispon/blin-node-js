
var request = require('request');

var forecast = (lat, lng, callback) =>{

request({
    url:`https://api.darksky.net/forecast/b1608833aa74ab4b361c4a4bc629eb4d/${lat},${lng}`,
    json: true
}, (error, response, body) => {
    if(error){
      callback("Unable to connect to dark sky servers");
    }else {
        callback(undefined, {
            latitude: body.latitude,
            longitude: body.longitude,
            timezone: body.timezonebody,
            hourly_summary: body.hourly.summary,
            temperature: body.currently.temperature,
            windSpeed: body.currently.windSpeed,
            visibility: body.currently.visibility, 
            ozone: body.currently.ozone
       });
    //   console.log(`Address: ${body.results[0].formatted_address}`);
    //   console.log(`lat: ${body.results[0].geometry.location.lat}`);
    //   console.log(`lng: ${body.results[0].geometry.location.lng}`);
     }
});
};



module.exports = {
    forecast : forecast
  };