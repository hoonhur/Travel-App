// Decalaration of Global Variables

// URL for geonames
const geoBaseUrl = 'http://api.geonames.org/postalCodeSearchJSON?placename='
const geoUsername = '&username=hunhuh10'

// URL for weatherbit
const wthrBaseUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?city=
const wthrHstrUrl = 'https://api.weatherbit.io/v2.0/history/daily?city=
const wthrKey = '&key=0354bba909aa42b0a47bd1f252e02b21'

// Function

// Function to change date format 
changeDateFormat(d) {
  geoDate = d[6] + d[7] + d[8] + d [9] + '-' + d[0] + d[1] + '-' + d[3] + d[4];
  return geoDate;
}

function handleSubmit () {
//declaration of variables
let city = document.getElementById(city).value;
let date = document.getElementById(date).value;
let geoDate = date;

/* Check Input Date
1. check format
2. check difference number of date between today*/
Client.checkDate(date);
checkDiffDays(date);

// Function to change date format to get API for over 16 days
if(diffDays < 0 & diffDays >= 16) {
  changeDateFormat(date)
};

// Async Function for Geonames
getGeonames(geoBaseUrl, city, geoUsername)
// Call Function postData for Geonames API
.then (function(geoData){
  postData('/addData', {
    country = geoData.country
    city = geoData.city
    latitude = goeData.lat
    longitude = geoData.lng
})
// Async Func for Weatherbit
// Forecast 16 days API for input date within 16 days
// Historical weather API for date difference is over 16 days (including past date)
.then(() => {
If(diffDays >= 0 && diffDays < 16) {
getWeather(wthrBaseUrl, geoData, wthrKey)
} else {
getWeather(wthrHstyUrl, geoData, wthrKey)
})

// Call Function postData for Weatherbit API
.then(function(){
postData ()
})
// Async Func for pixabay
.then(getPixabay())
// Call Function postData for Pixabay API
.then(function(){
postData ()
})
// Call Function updateUI
.then(function(){updateUI()}
)
}

Raleigh,NC&key=
Raleigh,NC&start_date=2020-07-19&end_date=2020-07-20

// POST Route, function postData
const postData = async(url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    try {
        const newData = await res.json();
        console.log(newData);
        return newData;
    }catch(error) {
        console.log("error", error);
    }
};

// GET Route for Project Data and updateUI

const updateUI = async() =>{
    const request = await fetch('/all');
    try{
        const allData = await request.json()
        const last = allData.length - 1;
        document.getElementById('picture').innerHTML = '<img src='' alt= width=300px height=200px>';
        document.getElementById('destination').innerHTML = '<h2>My trip to: ${allData[last].city}, ${allData[last].country}</h2>';
        document.getElementById('departingDate').innerHTML = '<h2>Departing: ${allData[last].date}</h2>';
        document.getElementById('toDate').innerHTML = '<h3>${allData[last].diffDays}</h3>';
        document.getElementById('weather').innerHTML = '<h3>${allData[last].highTemp}, ${allData[last].lowTemp}, ${allData[last].description}</h3>';
        document.getElementById('description').innerHTML = '<h4>${allData[last].description}</h4>';
        console.log(allData);
    }catch (error) {
        console.log('error', error);
    }
};




