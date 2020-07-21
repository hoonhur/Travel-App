/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=' 
const apiKey = '&appid=1abcfc6e85bd279b18d28db525ee1240';
//http://api.openweathermap.org/data/2.5/weather?zip=07024&appid=1abcfc6e85bd279b18d28db525ee1240

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction (e) {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeather (baseURL, zip, apiKey)
    .then(function(data){
        console.log(data);
        postData('/addData', {
            date: d,
            temp: data.main.temp,
            content: feelings
        })
    })
    .then(function(){updateUI()}
    )     
}

/* Function to GET Web API Data*/ 
const getWeather = async (baseURL, zip, key) => {
    const req = await fetch(baseURL+zip+key)
    try {
        data = await req.json();
        console.log(data);
        return data;
    } catch(error) {
        console.log('error', error);
    }
}

/* Function to POST data */
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

/* Function to GET Project Data */
const updateUI = async() =>{
    const request = await fetch('/all');
    try{
        const allData = await request.json();
        const last = allData.length - 1;
        document.getElementById('date').innerHTML = allData[last].date;
        document.getElementById('temp').innerHTML = allData[last].temperature;
        document.getElementById('content').innerHTML = allData[last].userResponse;
        console.log(allData);
    }catch (error) {
        console.log('error', error);
    }
};
