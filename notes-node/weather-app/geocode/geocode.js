

var request = require('request');
function getGeocodeData(address, callback){
    var encodedAddress = encodeURIComponent(address);

    request({
            url : 'https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAmLobs4rcfKmu29OErIx_jbrPJvDrSipY' ,
            json : true
    }, (error, response, body) => {
        if(error){
            callback('Unable to connect to Google servers.');
        }else if(body.status === 'ZERO_RESULTS'){
            callback('Unable to find that address.');
        }else if(response.statusCode !== 200){
            callback(`error:${error} , statusCode: ${response.statusCode}` ); // Print the error if one occurred
        }else{
            callback(undefined, {
            
                formatted_address : body.results[0].formatted_address, // Print the HTML for the Google homepage.
                lat : body.results[0].geometry.location.lat,
                lng : body.results[0].geometry.location.lng,
                status :  body.status
            });
        }
    });
}


module.exports = {
    getGeocodeData
};
