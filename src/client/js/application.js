/* Global Variables */
const tripData = {}
//geonames url, username
const geonamesURL = 'http://api.geonames.org/searchJSON?'; 
const geonamesUsername = '&username=hunhuh10'
const paraGeo = '&maxRows=1';

// Weatherbit url and key api
const baseWthrUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const historicalWthUrl = 'https://api.weatherbit.io/v2.0/history/daily';
const keyWthr = '&key=912958a2996f40d1bbe74993d7080986';
//https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY

// Pixabay api
const basePixUrl = 'https://pixabay.com/api/?key=';
const keyPix = '17552769-fee70d93d21f168f4a1a5c00a';
const paraPix = '&image_type=photo&category=travel'

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

/* helper functions */

// store weather data
const storeWthrData = (data) => {
    tripData.highTemp = data.high_temp;
    tripData.lowTemp = data.low_temp;
    tripData.description = data.weather.description;
}

// check the days between the current date and the chosen one and store data
const setLeftDays = (daysLeft) => {
    if (daysLeft === 0) {
        tripData.daysLeft = 'today';
    } else if (daysLeft === 1) {
        tripData.daysLeft = 'tommorow'
    } else {
        tripData.daysLeft = daysLeft + ' days away'
    }
}

/* functions */

// the main func which calls all other functions
const handleSubmit = () => {
    // check if the user puts a city
    checkCity(city);

    // call the url geonames
    const urlGeo = baseGeo + 'q=' + city + paraGeo + userName;
    getGeo(urlGeo)

    // call the weatherbit by coordinates
    .then(data => {
        const urlWthr = baseWthrUrl + `lat=${data.lat}&lon=${data.lng}` + keyWthr;
        return getWthr(urlWthr)
    })

    // call the Pixabay url
    .then(() => {
        const pixUrl = basePixUrl + keyPix + '&q=' + cityVal + paraPix;
        return getImg(pixUrl);
    })

    // finally update the UI and post the tripData
    .then(() => {
        updateUI();
        postData('/postTrip', tripData);
    })
};

// get the Geonames data of the provided city 
const getGeo = async(url) => {
    const request = await fetch(url);
    // transform data to JSON
    const data = await request.json();

    // store the first array
    const dataArray = data.geonames[0];

    // store the country of the provided city
    tripData.country = dataArray.countryName;

    return dataArray
};

// get the weatherbit data by coordinates 
const getWthr = async(url) => {
    const request = await fetch(url);
    // transform data to JSON
    const parsedData = await request.json();

    // store data arrays
    const wthrData = parsedData.data;

    // store the chosen date value
    const dateVal = date.value;

    date.value = '';

    // initilize a var to track the range of days between the current date and the chosen one
    let daysLeft = 0;

    // loop over the arrays to find a date that matches the chosen date
    for (const d of wthrData) {
        if (dateVal === d.datetime) {
            // call the helper func to store data
            storeWthrData(d);
            // call the helper func to check the days
            setLeftDays(daysLeft);
            return d
        }
        daysLeft++
    }
};

// get an img of the provided city
const getImg = async(url) => {
    const img = await fetch(url);
    // transform data to JSON
    const parseImg = await img.json();

    // store the img with its alt
    const firstArray = parseImg.hits[0];
    tripData.img = firstArray.largeImageURL;
    tripData.alt = firstArray.tags;
};

// post the city data
const postData = async(url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });
   
    try {
        const parsedData = await response.json();
        return parsedData;
    } catch(err) {
        console.log(err)
        alert(err)
    }
};

// update UI
const updateUI = () => { 
    weatherTitle.textContent = 'Travel Info :';
    country.innerHTML        = 'Country: '            + tripData.country;
    temp.innerHTML           = 'Temperature: '        + `high: ${tripData.highTemp},  low: ${tripData.lowTemp}`;
    description.innerHTML    = 'There will be '       + tripData.description;
    daysCounter.textContent  = 'The trip is '         + tripData.daysLeft;
    caption.textContent      = 'This is an image of ' + tripData.alt;
    cityImg.src              = tripData.img;
};


/* events */

const formSub = form.addEventListener('submit', (e) => {
    e.preventDefault();
    chainCall();
})




// function handleSubmit () {
//     let city = document.getElementById('city').value
//     let date = document.getElementById('date').value

//     Client.checkForCity(city)
//     Client.checkForDate(date)

//     postData

//     function performaction(e) {
//             getGeonames(city)
//             .then(function(data){
//                 postData('/addData', {
//                     date: d,

//                     temp: data.main.temp,
//                     content: feelings
//                 })
//             })
//             .then(function(){updateUI()}
//             )     
//         }

//     const getGeonames = async (geonamesURL, city, key) => {
//                 const req = await fetch(baseURL+zip+key)
//                 try {
//                     data = await req.json();
//                     console.log(data);
//                     return data;
//                 } catch(error) {
//                     console.log('error', error);
//                 }
//             }

//     document.getElementById('destination').innerHTML = `<h2>My trip to: ${city}</h2>`
//     document.getElementById('departingDate').innerHTML = `<h2>Departing: ${date}</h2>`
//     document.getElementById('toDate').innerHTML = `<h3>${city} is 220 days away.</h3>`
//     document.getElementById('weather').innerHTML = `<h3>Typical weather for then is: Mostly cloudy thoughout the day (High - 46, Low - 35).</h3>`
// }

export { handleSubmit }
