// Decalaration of Global Variables

// URL for geonames
const geoBaseUrl = 'http://api.geonames.org/postalCodeSearchJSON?placename='
const geoUsername = '&username=hunhuh10'

// URL for weatherbit
const wthrBaseUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?city='
// const wthrHstrUrl = 'https://api.weatherbit.io/v2.0/history/daily?city='
const wthrKey = '&key=0354bba909aa42b0a47bd1f252e02b21'

// URL for pixabay
const pixBaseUrl = 'https://pixabay.com/api/'
const pixKey = '?key=17552769-fee70d93d21f168f4a1a5c00a'
const pixPara = '&image_type=photo&category=travel&q'

let diffDays
let tripData = {}

// Function //

// Function to check number of difference of days from today
function checkDiffDays(d) {
    let today = new Date()
    let currentDate = new Date(today)
    let date = new Date(d)
    let dfferenceInTime = date - currentDate
    //divide the time difference by no. of milleseconds in a day
    diffDays = Math.ceil(dfferenceInTime / (1000*60*60*24))
    console.log(diffDays)
}

// Function to change date format 
// function changeDateFormat(d) {
//     whtrDate = d[6] + d[7] + d[8] + d [9] + '-' + d[0] + d[1] + '-' + d[3] + d[4];
//     return whtrDate;
// }

// Main Function
function handleSubmit() {
//declaration of variables
    let city = document.getElementById('city').value;
    let date = document.getElementById('date').value;
    tripData['city'] = city
    tripData['date'] = date
    // let whtrDate = date;
  
// Check Input Date
// 1. check format
    Client.checkDate(date);
// 2. check difference number of date between today*/
    checkDiffDays(date);
// Function to change date format to get API for over 16 days
    if(diffDays < 0 || diffDays >= 16) {
        // changeDateFormat(date)
        alert('Please input days within 16 days from today')
    } 
    // Call Function to get Geonames API
    getGeonames(geoBaseUrl, city, geoUsername)
    
    // Call Function to get pixabay API
    .then(getPixabay(pixBaseUrl, pixKey, pixPara, city, tripData.country))

    // Call Function to get Weatherbit API
    // Forecast 16 days weather API for input date within 16 days
    // Historical weather API for date difference is over 16 days (including past date)
    .then(getWthrFcst(wthrBaseUrl, city, 'us', wthrKey))
    //     if(diffDays >= 0 && diffDays < 16) { 
    //         (getWthrFcst(wthrBaseUrl, city, tripData.country, wthrKey))
    //     } else {
    //         getWthrHstr(wthrHstrUrl, city, tripData.country, whtrDate, wthrKey)
    //     }
    // })  
    .then(postData('http://localhost:8082/addData', tripData))
}

// Function to get geonames API
const getGeonames = async (url, city, username) => {
    const req = await fetch (url+city+username)
    try {
        const geoRawData = await req.json()
        const geoData = geoRawData.postalCodes[0]
        console.log(geoData)
        tripData['country'] = geoData.countryCode
        console.log(tripData)
        return tripData
    } catch (error) {
        console.log('Error at getGeonames', error)
    }
}
// Function to get pixabay API
const getPixabay = async (url, key, para, city, country) => {
    const req = await fetch(url+key+para+city+','+country)
    try {
        const pixRawData = await req.json()
        const pixData = pixRawData.hits[0]
        console.log(pixData)
        tripData['img'] = pixData.largeImageURL
        return pixData
    } catch(error) {
        console.log('Error at getPixabay', error)
    }
}
//Function to get weatherbit API
const getWthrFcst = async (url, city, country, key) => {
    const req = await fetch(url+city+','+country+key)
    try {
        const wthrRawData = await req.json()
        const wthrData = wthrRawData.data[diffDays]
        console.log(wthrData)
        tripData['highTemp'] = wthrData.max_temp
        tripData['lowTemp'] = wthrData.min_temp
        tripData['description'] = wthrData.weather.description
    } catch(error) {
        console.log('Error at getWthrFcst', error)
    }
}
// const getWthrHstr = async (url, city, country, date, key) => {
//     const req = await fetch(url+city+','+country+'&start_date'+date+'&end_date'+date+key)
//     try {
//         wthrData = await req.json()
//         console.log(wthrData)
//         return wthrData
//     } catch(error) {
//         console.log('Error at getWthrHstr', error)
//     }
// }

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
        const allData = await res.json();
        console.log(allData);
        document.getElementById('picture').innerHTML = `<img src='${allData.img}' width=300px height=200px>`
        document.getElementById('destination').innerHTML = `<h2>My trip to: ${allData.city}, ${allData.country}</h2>`
        document.getElementById('departingDate').innerHTML = `<h2>Departing: ${tripData.date}</h2>`
        document.getElementById('toDate').innerHTML = `<h3>${allData.city}, ${allData.country} is ${diffDays} days away </h3>`
        document.getElementById('weather').innerHTML = `<h3>Typical weather for then is:</h3>`
        document.getElementById('description').innerHTML = `<h4>${allData.description} (High: ${allData.highTemp}, Low: ${allData.lowTemp})`
        console.log(allData);
    } catch(error) {
        console.log("error", error);
    }
}

// GET Route for Project Data and updateUI
// const updateUI = async() =>{
//     const request = await fetch('http://localhost:8082/all');
//     try{
//         const allData = await request.json()
//         document.getElementById('picture').innerHTML = `<img src='${allData.img}' width=300px height=200px>`;
//         document.getElementById('destination').innerHTML = `<h2>My trip to: ${allData.city}, ${allData.country}</h2>`;
//         document.getElementById('departingDate').innerHTML = `<h2>Departing: ${allData.date}</h2>`;
//         document.getElementById('toDate').innerHTML = `<h3>${allData.diffDays}</h3>`;
//         document.getElementById('weather').innerHTML = `<h3>${allData.highTemp}, ${allData.lowTemp}, ${allData.description}</h3>`;
//         document.getElementById('description').innerHTML = `<h4>${allData.description}</h4>`;
//         console.log(allData);
//     }catch (error) {
//         console.log('error', error);
//     }
// };

export { handleSubmit }
