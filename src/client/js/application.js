// Decalaration of Global Variables

// URL for geonames
const geoBaseUrl = 'http://api.geonames.org/postalCodeSearchJSON?placename='
const geoUsername = '&username=hunhuh10'

// URL for weatherbit
const wthrBaseUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?city='
const wthrHstrUrl = 'https://api.weatherbit.io/v2.0/history/daily?city='
const wthrKey = '&key=0354bba909aa42b0a47bd1f252e02b21'

// Function //

// Function to check number of difference of days from today
function checkDiffDays(d) {
    let today = new Date()
    diffDays = (d - today)/(1000*60*60*24)
}

// Function to change date format 
function changeDateFormat(d) {
    whtrDate = d[6] + d[7] + d[8] + d [9] + '-' + d[0] + d[1] + '-' + d[3] + d[4];
    return whtrDate;
}

function handleSubmit() {
//declaration of variables
    let city = document.getElementById(city).value;
    let date = document.getElementById(date).value;
    let whtrDate = date;
    let diffDays 
// Check Input Date
// 1. check format
    Client.checkDate(date);
// 2. check difference number of date between today*/
    checkDiffDays(date);
// Function to change date format to get API for over 16 days
    if(diffDays < 0 && diffDays >= 16) {
        changeDateFormat(date)
    };
// Call Function to get Geonames API
    getGeonames(geoBaseUrl, city, geoUsername)
// Call Function postData for Geonames API
    .then (function(geoData){
        postData('/addData', {
            country: geoData.country,
            city: geoData.city,
            latitude: goeData.lat,
            longitude: geoData.lng
        })
    })
// Call Function to get Weatherbit API 
// Forecast 16 days weather API for input date within 16 days
// Historical weather API for date difference is over 16 days (including past date)
    .then(() => {
        if(diffDays >= 0 && diffDays < 16) {
            getWthrFcst(wthrBaseUrl, city, geoData.country, wthrKey)
        } else {
        getWtHstr(wthrHstrUrl, city, geoData.country, whtrDate, wthrKey)
        }
    })
// Call Function postData for Weatherbit API
    .then(function(){
        postData()
    })
// Call Function to get pixabay API
    .then(getPixabay())
// Call Function postData for Pixabay API
    .then(function(){
        postData ()
    })
// Call Function updateUI
    .then(function(){updateUI()}
    )
}

// Function to get geonames API
const getGeonames = async (url, city, username) => {
    const req = await fetch (url+city+username)
    try {
        geoData = await req.json()
        console.log(geoData)
        return geoData
    } catch (error) {
        console.log('Error at getGeonames', error)
    }
}

//Function to get weatherbit API
const getWthrFcst = async (baseURL, zip, key) => {
    const req = await fetch(baseURL+zip+key)
    try {
        data = await req.json();
        console.log(data);
        return data;
    } catch(error) {
        console.log('errar at getWthrFcst', error);
    }
}

const getWthrHstr = async () => {}

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
        document.getElementById('picture').innerHTML = `<img src='${allData.img}' alt='${allData.tag}' width=300px height=200px>`;
        document.getElementById('destination').innerHTML = `<h2>My trip to: ${allData[last].city}, ${allData[last].country}</h2>`;
        document.getElementById('departingDate').innerHTML = `<h2>Departing: ${allData[last].date}</h2>`;
        document.getElementById('toDate').innerHTML = `<h3>${allData[last].diffDays}</h3>`;
        document.getElementById('weather').innerHTML = `<h3>${allData[last].highTemp}, ${allData[last].lowTemp}, ${allData[last].description}</h3>`;
        document.getElementById('description').innerHTML = `<h4>${allData[last].description}</h4>`;
        console.log(allData);
    }catch (error) {
        console.log('error', error);
    }
};
