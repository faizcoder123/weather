const request = require('request')

const forecast = (location , callback) => {

    const url = "http://api.weatherstack.com/current?access_key=b246bd86a71a0f65dc700d1f7f12de43&query="+location
    //console.log("debug");

    request({url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
         }
         else if (response.body.error) {
            callback('Unable to find location', undefined)
        }
          else {
            callback(undefined,'Location: '+ response.body.location.name + ' ' + response.body.location.localtime  + ' It is currently ' + response.body.current.temperature + ' degress out, There is a ' + response.body.current.weather_descriptions[0] + '.')
        }
    })
}

module.exports = forecast
