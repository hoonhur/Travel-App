/* Global Variables */
const tripData = {}
//geonames url, username
const geoBaseURL = 'http://api.geonames.org/searchJSON?'; 
const geoUsername = '&username=hunhuh10'
const geoPara = '&maxRows=1';

// Weatherbit url and key api
const wthrBaseUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const wthrHistoricalUrl = 'https://api.weatherbit.io/v2.0/history/daily';
const wthrKey = '&key=912958a2996f40d1bbe74993d7080986';

// Pixabay api
const pixBaseUrl = 'https://pixabay.com/api/?key=';
const pixKey = '17552769-fee70d93d21f168f4a1a5c00a';
const pixPara = '&image_type=photo&category=travel'

// DOM elements
const city = document.getElementById('city');
const form = document.getElementById('form');
const weatherTitle = document.getElementById('weather-info');
const country = document.getElementById('country');
const daysCounter = document.getElementById('days-counter');
const temp = document.getElementById('temp');
const description = document.getElementById('description');
const cityImg = document.querySelector('#city-img img')
const caption = document.querySelector('#city-img figcaption')

/* functions */

/* helper functions */
// check the days between the current date and input date
function countDaysLeft(d) {
    let today = new Date();

    //One day time in ms
    const oneDayTimeMS = 1000 * 60 * 60 * 24;
    
    let diffTime = d.getTime() - today.getTime();
    if (diffTime > 0) {
        let daysLeft = Math.ceil(diffTime/oneDayTimeMS)
        if (daysLeft >= 0) {
            tripData.daysLeft = daysLeft;
        } else {
        alert('The date is already passed');
        }
    }
}

/* the main func which calls all other functions */
const handleSubmit = () => {
    let city = document.getElementById('city').value;
    let date = document.getElementById('date').value;
  
    // check if the user puts validated date
    Client.checkDate(date);
    // check number of days between today
    countDaysLeft(date);

    // call getGeonames by City
    const geonamesURL = geoBaseURL + 'q=' + city + geoPara + geoUsername;
    getGeonames(geonamesURL)
    // call weatherbit by lat/lon
    .then(() => {
        const urlWthr = wthrBaseUrl + `lat=${geoData.lat}&lon=${geoData.lng}` + wthrKey;
        return getWthr(urlWthr)
    })
    // call pixabay
    .then(() => {
        const pixUrl = pixBaseUrl + pixKey + '&q=' + city + pixPara;
        return getImg(pixUrl);
    })
    // finally update the UI and post the tripData
    .then(() => {
        postData('/trip', tripData);
        updateUI();
    })
};

// get the Geonames data
const getGeonames = async(url) => {
    const req = await fetch(url);
    try {
        const res = await req.json();
        // store the first array
        const geoData = res.geonames[0];
        console.log(geoData);
        // store the country of the provided city
        tripData.country = geoData.countryName;
        return geoData;
    } catch(error) {
        console.log('error at getGeonames', error)
    }
    
};

// get the weatherbit data
const getWthr = async(url) => {
    const req = await fetch(url);
    try {
        const res = await req.json();
        // store data arrays
        const wthrData = res.data;
        console.log(wthrData)
         // store weather data
        tripData.highTemp = wthrData.high_temp;
        tripData.lowTemp = wthrData.low_temp;
        tripData.description = wthrData.weather.description;
    } catch(error) {
        console.log('error at getWthr', error)
    }
};

// get an img from pixabay
const getImg = async(url) => {
    const req = await fetch(url);
    try {
        const res = await req.json();
        // store the img with its alt
        const pixData = res.hits[0];
        tripData.img = pixData.largeImageURL;
        tripData.alt = pixData.tags;
    } catch(error) {
        console.log('error at getImg', error)
    }
};

// post the city data
const postData = async(url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await res.json();
        return newData;
    } catch(error) {
        console.log('error at postData', error)
    }
};

// update UI
const updateUI = () => { 
    document.getElementById('destination').innerHTML = `<h2>My trip to: ${city}, ${tripData.country}</h2>`
    document.getElementById('departingDate').innerHTML = `<h2>Departing: ${date}</h2>`
    document.getElementById('toDate').innerHTML = `<h3>${city} is ${tripData.daysLeft} days away.</h3>`
    document.getElementById('weather').innerHTML = `<h3>Typical weather for then is: Mostly cloudy thoughout the day (High - 46, Low - 35).</h3>`
   `<img src='${tripData.img} alt=${tripData.alt} width= 300px, height= 200px>`
};

export { handleSubmit }
