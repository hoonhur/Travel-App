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

// // Function to change date format 
// function changeDateFormat(d) {
//     whtrDate = d[6] + d[7] + d[8] + d [9] + '-' + d[0] + d[1] + '-' + d[3] + d[4];
//     return whtrDate;
// }

// Main Function
function handleSubmit() {
    //declaration of variables
    let city = document.getElementById('city').value;
    let date = document.getElementById('date').value;
    // let whtrDate = date;
  
    // Check Input Date
    // 1. check format
    Client.checkDate(date);
    // 2. check difference number of date between today*/
    checkDiffDays(date);
    // Function to change date format to get API for over 16 days
    if(diffDays < 0 && diffDays >= 16) {
        alert('Please input date within 16 days from today')
        // changeDateFormat(date)
    } 
    
    // Call Function to get Geonames API
    postData('http://localhost:8082/geonames', {city: city})
    //
    .then(() => {
        postData('http://localhost:8082/weatherFcst', {
                city: city,
                country: 'US'
                })
            })
    //     // if(diffDays >= 0 && diffDays < 16) {
    //         postData('http://localhost:8082/weatherFcst', {
    //             city: city,
    //             country: tripData.countryCode
    //             })
    //     // } else {
    //     //     postData('http://localhost:8082/weatherHstr', {
    //     //         city: city,
    //     //         country: tripData.countryCode,
    //     //         date: whtrDate
    //     //         })
    //     // }
    //     })
    // Call Function to get pixabay API
    .then(() => {
        postData('http://localhost:8082/pixabay', {
            city: city,
            country: 'US'
        })
    })

// Call Function updateUI
    .then(updateUI())
}

// POST Route, function postData
const postData = async(url = '', data = {}) => {
    const res = await fetch(url)
    try {
        const newData = await res.text();
        console.log(newData)
    } catch(error) {
        console.log("error", error);
    }
};

// GET Route for Project Data and updateUI
const updateUI = async() =>{
    const request = await fetch('http://localhost:8082/projectData')
    try{
        const allData = await request.json()
        document.getElementById('picture').innerHTML = `<img src='${allData.largeimgURL}' alt='${allData.tags}' width=300px height=200px>`;
        document.getElementById('destination').innerHTML = `<h2>My trip to: ${city}, ${allData.countryCode}</h2>`;
        document.getElementById('departingDate').innerHTML = `<h2>Departing: ${date}</h2>`;
        document.getElementById('toDate').innerHTML = `<h3>${diffDays}</h3>`;
        document.getElementById('weather').innerHTML = `<h3>${allData.highTemp}, ${allData.lowTemp}, ${allData.weather.description}</h3>`;
        console.log(allData);
    }catch (error) {
        console.log('error', error);
    }
};

export { handleSubmit }
