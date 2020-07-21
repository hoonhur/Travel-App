// Setup empty JS object to act as endpoint for all routes
projectData = []

const express = require('express')
const app = express()
app.use(express.static('dist'))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())

const regeneratorRuntime = require('regenerator-runtime')

app.get('/', (req, res) => res.sendFile('dist/index.html'))
app.listen(8000, () => console.log(`running on localhost: 8000`));

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
