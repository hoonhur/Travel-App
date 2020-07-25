const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const regeneratorRuntime = require('regenerator-runtime')

app.use(express.static('dist'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => res.sendFile('dist/index.html'))
app.listen(8082, () => console.log(`running on localhost: 8082`));

// Setup empty JS object to act as endpoint for all routes
projectData = {}

// Post Route
app.post('/addData', (req,res) => {
    projectData = req.body;
    res.send(projectData)
})

// app.get('/all', (req,res) => {
//     res.send(projectData)
// })
