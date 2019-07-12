const request = require('request')

const forecast = (longitude, latitude, callback) => {

    const url = 'https://api.darksky.net/forecast/e49cce73559c2e96aeb4afe0a2b398fb/'+ latitude + ',' + longitude
    request({url: url, json: true}, (error, response) => {
    if (error)
    {
        callback('Unable to connect to Weather service!', undefined)
    }
    else if (response.body.error)
    {
        callback('This location is incorrect. Try a different location!', undefined)    
    }
    else
    {   
//        callback(undefined, {temperature: response.body.currently.temperature, summary: response.body.daily.data[0].summary})
        callback(undefined, 'The current temperature is: ' + response.body.currently.temperature + '. Forecast shows: ' +
        response.body.daily.data[0].summary)
    }         
    })
}

module.exports = forecast