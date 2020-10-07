const request = require('request')

const forecast = (location , callback) => {
 //   const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude
   const url = "http://api.weatherstack.com/current?access_key=b246bd86a71a0f65dc700d1f7f12de43&query="+location
   // console.log(url)
    request({ url, json: true }, (error, response) => {
        if (error) {
            //console.log("aaaaaa")
            callback('Unable to connect to weather service!', undefined)
         }
         else if (response.body.error) {
          //  console.log("dd")
            callback('Unable to find location', undefined)
        }
          else {
            callback(undefined,' It is currently ' + response.body.current.temperature + ' degress out. There is a ' + response.body.current.weather_descriptions[0] + '.')
        }
    })
}

module.exports = forecast
