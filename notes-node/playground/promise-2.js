const geocode = require('../weather-app/geocode/geocode.js');
const forecast = require('../weather-app/forecast/forecast.js');
const request = require('request');

var geocodeAddress =(address) =>{
    return new Promise((resolve, reject) =>{
        var encodedAddress = encodeURIComponent(address);
        request({
            url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAmLobs4rcfKmu29OErIx_jbrPJvDrSipY`,
            json: true
        }, (error, response, body) => {                
            if(error){
                reject("Unable to connect to Google servers");
            }else if (body.status !== 'OK'){
                reject(body.error_message);
            }else{
                resolve({
                    address: body.results[0].formatted_address,
                    lat: body.results[0].geometry.location.lat,
                    lng: body.results[0].geometry.location.lng
                });
            }
        });
    });
}   


geocodeAddress('15 sderot yehudit tel aiv').then((res) => {
    console.log(JSON.stringify(res, undefined, 2));
}).catch((errorMessage)=> {
    console.log(errorMessage);
});