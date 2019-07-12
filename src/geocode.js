const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW1hbmluZGVyIiwiYSI6ImNqeHV2b3NtMTAyaHAzbXBvczM5NTc2N28ifQ.G1c7zO7RQ4u5FQ2nIQyCgw&limit=1'
    request({url: url, json: true}, (error, response) => {
    if (error)
        {
            callback('Unable to connect to location services!', undefined)
        }
    else if (response.body.features.length === 0)
        {
            callback('Invalid Location. Please try a new location!', undefined)    
        }
    else
        {   
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],   
                place_name: response.body.features[0].place_name
            })   
        }    
    })
}

module.exports = geocode