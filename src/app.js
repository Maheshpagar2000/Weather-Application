const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000   

//Define paths for express configue
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath =path.join(__dirname, '../template/views')
const partialPath = path.join(__dirname, '../template/partials')

//set handlers engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather APP',
        name: 'Mahesh Pagar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Mahesh Pagar'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help ',
        name: 'Mahesh Pagar'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Your must provide an address!   '
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecast)=> {
            if(error){
            return res.send({error})
            }

            res.send({  
                forecast: forecastData,
                location,
                address:req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search)  {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mahesh Pagar',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mahesh Pagar',
        errorMessage: 'Page not found.'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


// app.get('/about', (req, res) => {
//     res.render('about')
// })

// app.get('', (req, res) => {
//     res.send('<h1>Hello Express!!!</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Mahesh',
//         age: 23
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('This is about page^^^^^')
// })

// Task: Instead of this make a html about and help page

// app.get('/weather', (req, res) => {
//     res.send('Its a weather Pageeeee!')
// })
//app.com
//app.com/help
//app.com/about
