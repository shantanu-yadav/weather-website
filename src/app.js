const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


// Setup ststic directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather',
        name : 'Shantanu Yadav'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message : 'This is help message.',
        title : 'Help',
        name : 'Shantanu Yadav'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About me',
        name : 'Shantanu Yadav'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'You must provide an address.'
        })
    }

    const address = req.query.address

    geocode(address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error : error
            })
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    error : error
                })
            }
            res.send({
                location: location,
                forecast : forecastData
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : '404',
        error : 'Help artical not found.',
        name : 'Shantanu Yadav'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title : '404', 
        error : 'Page not found',
        name : 'Shantanu Yadav'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})