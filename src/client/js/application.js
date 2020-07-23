// Decalaration of Global Variables

// URL for geonames
const geoBaseURL = 'http://api.geonames.org/postalCodeSearchJSON?placename='
const geoUsername = '&username=hunhuh10'
//http://api.geonames.org/postalCodeSearchJSON?placename=raleigh&username=demo//


// Function

//changeDateFormat(d) {
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

// POST Route, function postData

// GET Route for Project Data (/projectdata)

// Update UI with Project Data




