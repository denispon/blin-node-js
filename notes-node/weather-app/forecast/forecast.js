const request = require('request');



var getForcast = (latitude, longitude, callback) => {
    request({
            url:`https://api.darksky.net/forecast/b1608833aa74ab4b361c4a4bc629eb4d/${latitude},${longitude}`,
            json: true
        }, (error, response, body) =>{
            if(error){
                callback('Unable to connect to ApiDarkSky servers');
            }else if(response.statusCode !== 200){
                callback(`Error ${response.statusCode}`);
            }else{
                callback(
                    undefined, {
                        latitude: body.latitude,
                        longitude: body.longitude,
                        timezone: body.timezonebody,
                        hourly_summary: body.hourly.summary,
                        temperature: body.currently.temperature,
                        windSpeed: body.currently.windSpeed,
                        visibility: body.currently.visibility, 
                        ozone: body.currently.ozone   
                });

            }
    });
}

module.exports = {
    getForcast
}