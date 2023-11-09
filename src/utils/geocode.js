//destructing syntax : making small changes
const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)+ '.json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1'

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services : ', undefined)
        }else if(body.features.length===0){
            callback('Unable to find location. Try another search.', undefined)
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0], 
                location: body.features[0].place_name
            })
        }
    })
}

module.exports= geocode

// const request = require('request')

// const geocode = (address, callback) => {
//     const url = '' + encodeURIComponent(address)+ '.json?access_token=  =1'

//     request({url: url, json: true}, (error, response) => {
//         if(error){
//             callback('Unable to connect to location services : ', undefined)
//         }else if(response.body.features.length===0){
//             callback('Unable to find location. Try another search.', undefined)
//         }else{
//             callback(undefined,{
//                 latitude: response.body.features[0].center[0],
//                 longitude: response.body.features[0].center[1], 
//                 location: response.body.features[0].place_name
//             })
//         }
//     })
// }

// module.exports= geocode
