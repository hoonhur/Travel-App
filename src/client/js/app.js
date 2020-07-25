/* Global Variables */
const tripData = {}
let daysLeft
let city
let date

//geonames url, username
const geoBaseURL = 'http://api.geonames.org/searchJSON?'; 
const geoUsername = '&username=hunhuh10'
const geoPara = '&maxRows=1';

// Weatherbit url and key api
const wthrBaseUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?';
// const wthrHistoricalUrl = 'https://api.weatherbit.io/v2.0/history/daily';
const wthrKey = '&key=912958a2996f40d1bbe74993d7080986';

// Pixabay api
const pixBaseUrl = 'https://pixabay.com/api/?key=';
const pixKey = '17552769-fee70d93d21f168f4a1a5c00a';
const pixPara = '&image_type=photo&category=travel'

/* functions */

/* helper functions */
// check the days between the current date and input date
function countDaysLeft(d) {
    const currentDate = new Date();
    const today = new Date(currentDate);
    const date = new Date(d);

    //One day time in ms
    const oneDayTimeMS = 1000 * 60 * 60 * 24;
    
    let diffTime = date-today;
    daysLeft = Math.ceil(diffTime/oneDayTimeMS)
    if (daysLeft > 16) {
            alert('please input date within 16 days from today')
    } else if (daysLeft <0) {
            alert('The date is already passed')
    } else {}
        tripData.daysLeft = daysLeft; 
}

/* the main func which calls all other functions */
const handleSubmit = () => {
    city = document.getElementById('city').value;
    date = document.getElementById('date').value;
  
    // check if the user puts validated date
    Client.checkDate(date);
    // check number of days between today
    countDaysLeft(date);

    // call getGeonames by City
    const geonamesURL = geoBaseURL + 'q=' + city + geoPara + geoUsername;
    getGeonames(geonamesURL)
    // call weatherbit by lat/lon
    .then(() => {
        const wthrUrl = wthrBaseUrl + `lat=${tripData.lat}&lon=${tripData.lng}` + wthrKey;
        return getWthr(wthrUrl)
    })
    // call pixabay
    .then(() => {
        const pixUrl = pixBaseUrl + pixKey + '&q=' + tripData.city + pixPara;
        console.log(pixUrl)
        return getImg(pixUrl);
    })
    // finally update the UI and post the tripData
    .then(() => {
        postData('http://localhost:8082/trip', tripData);
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
        tripData.city = geoData.adminName1;
        tripData.lat = geoData.lat;
        tripData.lng = geoData.lng;
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
        const wthrData = res.data[daysLeft];
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
        console.log(pixData)
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
    document.getElementById('weather').innerHTML = `<h3>Typical weather for then is: ${tripData.description} thoughout the day (High - ${tripData.highTemp}, Low - ${tripData.lowTemp}).</h3>`
    document.getElementById('picture').innerHTML = `<img src='${tripData.img}' alt=${tripData.alt} width= 300px, height= 200px>`
};

export { handleSubmit }