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
app.listen(8081, () => console.log(`running on localhost: 8081`));

// Setup empty JS object to act as endpoint for all routes
projectData = {}

app.get('/all', (req,res) => {
    res.send(projectData);
    console.log('data is received');
    console.log(projectData);
});

// Post Route
app.post('/addData', (req,res) => {
    const data = {
        temperature: req.body.temp,
        date: req.body.date,
        userResponse: req.body.content
    };
    projectData.push(data);
    res.send(projectData);
});
