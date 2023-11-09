//destructing syntax : making small changes
const request = require('request')

const forecast =(latitude, longitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=d5dac59034577fa91aa5f91c324e3c2c&query='+ latitude+ ',' + longitude+'&units=f'

    request({url, json: true}, (error ,{body}) => {
        if(error){
            callback('Unable to connect weather stack service', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, body.daily.data[0].summary + 'It is currently '+ body.currently.temperature + 'degrees out. There is a' + body.currently.precipProbability+ '% chance of rain.')
        }
    })
}

module.exports = forecast

// const request = require('request')

// const forecast =(latitude, longitude, callback) => {
//     const url ='http://api.weatherstack.com/current?access_key=d5dac59034577fa91aa5f91c324e3c2c&query='+ latitude+ ',' + longitude+'&units=f'

//     request({url: url, json: true}, (error, response) => {
//         if(error){
//             callback('Unable to connect weather stack service', undefined)
//         }else if(response.body.error){
//             callback('Unable to find location', undefined)
//         }else{
//             callback(undefined, response.body.daily.data[0].summary + 'It is currently '+ response.body.currently.temperature + 'degrees out. There is a' + response.body.currently.precipProbability+ '% chance of rain.')
//         }
//     })
// }

// module.exports = forecast