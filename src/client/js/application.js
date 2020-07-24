// Decalaration of Global Variables
let tripData = {}
let diffDays

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
function changeDateFormat(d) {
    whtrDate = d[6] + d[7] + d[8] + d [9] + '-' + d[0] + d[1] + '-' + d[3] + d[4];
    return whtrDate;
}

// Main Function
function handleSubmit() {
    //declaration of variables
    let city = document.getElementById('city').value;
    let date = document.getElementById('date').value;
    let whtrDate = date;
  
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
    postData('http://localhost:8082/geonames', {city: city})
    //
    .then(() => {
        if(diffDays >= 0 && diffDays < 16) {
            postData('http://localhost:8082/weatherFcst', {
                city: city,
                country: tripData.countryCode
                })
        } else {
            postData('http://localhost:8082/weatherHstr', {
                city: city,
                country: tripData.countryCode,
                date: whtrDate
                })
        }
        })
    // Call Function to get pixabay API
    .then(() => {
        postData('http://localhost:8082/pixabay', {
            city: city,
            country: tripData.countryCode
        })
    })

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
        tripData = newData
    } catch(error) {
        console.log("error", error);
    }
};

const getData = async (url) => {
    const res = await fetch ('http://localhost:8082/projectData')
    try {
        const data = await res.json()
        return data
    } catch(error) {
        console.log('error at getData', error)
    }
}

// GET Route for Project Data and updateUI
const updateUI = async() =>{
    const request = await fetch('http://localhost:8082/projectData');
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

export { handleSubmit }
