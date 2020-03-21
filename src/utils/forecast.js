const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    url = 'https://api.darksky.net/forecast/e78c938ea3b2ca553816679c02599ba2/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si'
    request({ url , json : true},(error,{ body })=>{
        if(error){
            callback('Unable to connect to weather service!',undefined)
        }else if(body.error){
            callback('Unable to find location! Try another search')
        }else{
            callback(undefined,body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + ' degrees out.There is ' + body.currently.precipProbability + ' % chance of rain.')
        }
    })
}

module.exports = forecast