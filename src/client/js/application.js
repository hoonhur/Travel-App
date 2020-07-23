// Decalaration of Global Variables

// URL for geonames
const geoBaseURL = 'http://api.geonames.org/postalCodeSearchJSON?placename='
const geoUsername = '&username=hunhuh10'
//http://api.geonames.org/postalCodeSearchJSON?placename=raleigh&username=demo//


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

// Call Function postData for Weatherbit API

// Async Func for pixabay
// Call Function postData for Pixabay API

// Call Function updateUI
.then(function(){updateUI()}
)
}

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
        document.getElementById('city').innerHTML = '<h2>${allData[last].city}, ${allData[last].country}/h2>';
        document.getElementById('date').innerHTML = '<h2>${allData[last].date}<h2>';
        document.getElementById('diffDays').innerHTML = '<h3>${allData[last].diffDays}<h3>';
        document.getElementById('weather').innerHTML = '<h3>${allData[last].highTemp}, ${allData[last].lowTemp}, ${allData[last].description}<h3>';
        console.log(allData);
    }catch (error) {
        console.log('error', error);
    }
};




