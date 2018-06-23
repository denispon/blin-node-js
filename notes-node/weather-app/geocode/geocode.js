
var request = require('request');

var geocodeAddress = (address, blin) =>{
    var encodedAddress = encodeURIComponent(address);

request({
    url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAmLobs4rcfKmu29OErIx_jbrPJvDrSipY`,
    json: true
}, (error, response, body) => {
//    console.log('error:', JSON.stringify(error, undefined, 2)); // Print the error if one occurred
//    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//    console.log('body:', JSON.stringify(body, undefined, 2)); // Print the HTML for the Google homepage.
//   fs.writeFile("output.json", JSON.stringify(body, undefined, 2), 'utf8', function (err) {
//     if (err) {
//         console.log("An error occured while writing JSON Object to File.");
//         return console.log(err);
//     } 
//     console.log("JSON file has been saved.");
// });

    if(error){
      blin("Unable to connect to Google servers");
    }else if (body.status !== 'OK'){
        blin(body.error_message);
    }else{
        blin(undefined, {
            address: body.results[0].formatted_address,
            lat: body.results[0].geometry.location.lat,
            lng: body.results[0].geometry.location.lng
        })
    //   console.log(`Address: ${body.results[0].formatted_address}`);
    //   console.log(`lat: ${body.results[0].geometry.location.lat}`);
    //   console.log(`lng: ${body.results[0].geometry.location.lng}`);
     }
});
};



module.exports = {
    geocodeAddress
  };