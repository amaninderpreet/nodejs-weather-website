const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const forecast = require('./forecast')
const geocode = require('./geocode')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

app.use(express.static(publicDirectoryPath))

//app.get('', (req, res) => {
//   res.send('<H1>Hello Express!</H1>')
//})

app.get('', (req, res) => {
    res.render('index', { title: 'Weather App', name: 'Amaninder Singh'})
//    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Me', name: 'Amaninder Singh'})
})

app.get('/help', (req, res) => {
    res.render('help', {title: 'Help Page', name: 'Amaninder Singh'})
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send('There is no address provided for the application. Please provide address.')
    }
    const address = req.query.address

    geocode(address, (error, data) => {
        if (error)
        {
            return res.send({error})
        //console.log('Data', data)
        }
        forecast(data.longitude, data.latitude, (error, forecastData) => {
            if (error)
            {
                return res.send({error})
            }
            console.log(data.place_name)
            console.log(forecastData)
            res.send({location: data.place_name, forecast: forecastData, address: address})
        })
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {title: 'Help Page Not Found'})
})

app.get('*', (req, res) => {
    res.render('404', {title: 'Page Not Found'})
})

/*app.get('/help', (req, res) => {
    res.send({
        firstname: 'Amaninder',
        lastname: 'Singh'
    })
})*/

app.listen(port, () => {
    console.log('Server is up on port'+port)
})