// URL for geonames
const geoBaseUrl = 'http://api.geonames.org/postalCodeSearchJSON?placename='
const geoUsername = '&username=hunhuh10'

// URL for weatherbit
const wthrBaseUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?city='
const wthrHstrUrl = 'https://api.weatherbit.io/v2.0/history/daily?city='
const wthrKey = '&key=0354bba909aa42b0a47bd1f252e02b21'

// URL for pixabay
const pixBaseUrl = 'https://pixabay.com/api/?key='
const pixKey = '17552769-fee70d93d21f168f4a1a5c00a'
const pixPara = '&image_type=photo&category=travel'

const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const regeneratorRuntime = require('regenerator-runtime')
const fetch = require('node-fetch')

app.use(express.static('dist'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => res.sendFile('dist/index.html'))
app.listen(8082, () => console.log(`running on localhost: 8082`));

// Setup empty JS object to act as endpoint for all routes
projectData = {}

// Post Route for geonames
let geoData = {}
app.post('/geonames', (req,res) => {
    console.log('Request to geonames API')
    let city = req.body.city
    let url = geoBaseUrl+city+geoUsername
    fetch(url)
    .then(res => res.json())
    .then(json => console.log(json))
})

let wthrData = {}
app.post('/weatherFcst', (req,res) => {
    console.log('Request to weatherForecast API')
    const city = req.body.city
    const country = req.body.country
    getWthrFcst(wthrBaseUrl, city, country, wthrKey)
    console.log(wthrData)
    res.send(wthrData)
    }
)

app.post('/weatherHstr', (req,res) => {
    console.log('Request to weatherHistory API')
    const city = req.body.city
    const country = req.body.country
    const date = req.body.date
    getWthrHstr(wthrHstrUrl, city, country, date, wthrKey)
    console.log(wthrData)
    res.send(wthrData)
    }
)

let pixData = {}
app.post('/pixabay', (req,res) => {
    console.log('Request to pixabay API')
    const city = req.body.city
    const country = req.body.country
    getPixabay(pixBaseUrl, pixKey, pixPara, city, country)
    console.log(wthrData)
    res.send(pixData)
    }
)

app.get('/projectData', (req, res) => {
    projectData = {...geoData, ...wthrData, ...pixData}
    res.send(projectData)
})

//Function to get geonames API
const getGeonames = async (url, city, username) => {
    const req = await fetch (url+city+username)
    try {
        geoRawData = await req.json()
        geoData = geoRawData.postalCodes[0]
        return geoData
    } catch (error) {
        console.log('Error at getGeonames', error)
    }
}
  
//Function to get weatherbit API
const getWthrFcst = async (url, city, country, key) => {
    const req = await fetch(url+city+','+country+key)
    try {
        wthrData = await req.json()
        return wthrData
    } catch(error) {
        console.log('Error at getWthrFcst', error)
    }
}

const getWthrHstr = async (url, city, country, date, key) => {
    const req = await fetch(url+city+','+country+'&start_date'+date+'&end_date'+date+key)
    try {
        wthrData = await req.json()
        return wthrData
    } catch(error) {
        console.log('Error at getWthrHstr', error)
    }
}

// Function to get pixabay API
const getPixabay = async (url, key, parameter, city, country) => {
    const req = await fetch(url+key+parameter+city+','+country)
    try {
        pixRawData = await req.json()
        pixData = pixRawData.hits[0]
        return pixData
    } catch(error) {
        console.log('Error at getPixabay', error)
    }
}
