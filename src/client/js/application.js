import fetch from "node-fetch"

//* Decalaration of Global Variables *//

// URL for geonames
const geoBaseUrl = 'http://api.geonames.org/postalCodeSearchJSON?placename='
const geoUsername = 'hunhuh10'

// URL for weatherbit
const wthrBaseUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?city='
const wthrKey = '0354bba909aa42b0a47bd1f252e02b21'

// URL for pixabay
const pixBaseUrl = 'https://pixabay.com/api/?key='
const pixKey = '17552769-fee70d93d21f168f4a1a5c00a'
const pixPara = '&image_type=photo&q='

let diffDays
let tripData = {}


//* Function *//

function checkDiffDays(d) {
    let today = new Date()
    let currentDate = new Date(today)
    let date = new Date(d)
    let dfferenceInTime = date - currentDate
    //divide the time difference by no. of milleseconds in a day
    diffDays = Math.ceil(dfferenceInTime / (1000*60*60*24))
}
// Main Function 
function handleSubmit() {
    //declaration of variables
    let city = document.getElementById('city').value;
    let date = document.getElementById('date').value;
    tripData['city'] = city
    tripData['date'] = date
   
    //calculate difference number of date between today
    checkDiffDays(date);
    if(diffDays < 0 || diffDays >= 16) {
        // changeDateFormat(date)
        alert('Please input days within 16 days from today')
    }  else {
        tripData['diffDays'] = diffDays
        console.log(diffDays)
    }
 
    // Call Function to get APIs
    getGeonames(city)
    .then( async (geoData) =>{
        tripData['country'] = geoData.postalCodes[0].countryCode
        await getweatherbit(city, tripData.country)
        await getPixabay(city)
    })
    
    .then( async () =>{
        await postData('http://localhost:8082/addData', tripData)
    })
    .then ( async () => {
        updateUI()
})
}

// Function to get geonames API        
const getGeonames = async (city) => {
    const req = await fetch (geoBaseUrl+city+'&username='+geoUsername)
    try {
        const geoData = await req.json()
        let checkgeoData = geoData.postalCodes[0].adminName1
        console.log(geoData)
        return geoData
    } catch (error) {
        console.log('Error at getGeonames', error)
    }
}

//Function to get weatherbit API
const getweatherbit = async (city, country) => {
    const req = await fetch(wthrBaseUrl+city+','+country+'&key='+wthrKey+pixPara+city)
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

// Function to get pixabay API
const getPixabay = async (city) => {
    const req = await fetch(pixBaseUrl+pixKey+'&q='+city+'&image_type+photo')
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


// POST Route, function postData
const postData = async(url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    try {
        const newData = await res.json()
        console.log(newData)
        return newData
    } catch(error) {
        console.log('Error at postData', error)
    }
}

// GET ROUTE, function updateUI
const updateUI = async() => {
    const req = await fetch('http://localhost:8082/getData')
    try {
        const allData = await req.json();
        console.log(allData);
        document.getElementById('picture').innerHTML = `<img src='${allData.img}' width=300px height=200px>`
        document.getElementById('destination').innerHTML = `<h2>My trip to: ${allData.city}, ${allData.country}</h2>`
        document.getElementById('departingDate').innerHTML = `<h2>Departing: ${tripData.date}</h2>`
        document.getElementById('toDate').innerHTML = `<h3>${allData.city}, ${allData.country} is ${allData.diffDays} days away </h3>`
        document.getElementById('weather').innerHTML = `<h3>Typical weather for then is:</h3>`
        document.getElementById('description').innerHTML = `<h4>${allData.description} (High: ${allData.highTemp}, Low: ${allData.lowTemp})`
    } catch(error) {
        console.log("error", error);
    }
}

// Remove function
function cleartripSubmit() {
    tripData = {}
    document.getElementById('picture').innerHTML = ``
    document.getElementById('destination').innerHTML = `<h2>My trip to: </h2>`
    document.getElementById('departingDate').innerHTML = `<h2>Departing: </h2>`
    document.getElementById('toDate').innerHTML = `<h3></h3>`
    document.getElementById('weather').innerHTML = `<h3></h3>`
    document.getElementById('description').innerHTML = `<h4></h4>`
    console.log(tripData)
}

export { handleSubmit }
export { cleartripSubmit }