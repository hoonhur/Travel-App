// Decalaration of Global Variables

// URL for geonames
const geoBaseURL = 'http://api.geonames.org/postalCodeSearchJSON?placename='
const geoUsername = '&username=hunhuh10'
//http://api.geonames.org/postalCodeSearchJSON?placename=raleigh&username=demo//


// Function
function handleSubmit () {
//declaration of variables
let city
let date
let geoDate

/* Check Input Date
1. check format
2. check difference number of date between today*/
Client.checkDate(date);
checkDiffDays(date);

// Function to change date format to get API for over 16 days
if(diffDays < 0 & diffDays >= 16) {
changeDateFormat(date)
} else {
geoDate = date
};

// Async Function for Geonames
getGeonames(city)
// Call Function postData for Geonames API
.then (function(geoData){
}) 
// Async Func for Weatherbit
// Forecast 16 days API for input date within 16 days
// Historical weather API for date difference is over 16 days (including past date)

// Call Function postData for Weatherbit API

// Async Func for pixabay
// Call Function postData for Pixabay API

// POST Route, function postData

// GET Route for Project Data (/projectdata)

// Update UI with Project Data




