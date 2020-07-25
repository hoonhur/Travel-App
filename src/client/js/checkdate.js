function checkDate (date) {
        // regular expression to match required date format
    const regexp = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    if(date != '' && !date.match(regexp)) {
        alert("Invalid date format. please input date as 'mm/dd/yyyy' format");
        return false;
    } else {
        console.log('Date format is valid')
        return true;
    }
}

export { checkDate }
