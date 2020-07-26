# Travel Planner

## Overview
Trevel-APP is offering weather forcast information of the destination. User needs to input destination and departing date which should be within 16 days from search date. APP will show you how many days left to daparting date and brief weather information on that date.

Thge APP used below APIs
1. Geonames API: offers city information including, country code, latitude and longtitude.
2. Weatherbit API: offers future/past/special weather information. The APP pulls future 16 days forcast by city name and country code.
3. Pixabay API: offers images. The app pull picture image related with the city.


## How to Use
download depndecies; see below dependencies list
`npm install`

There are two modes, Development & Production, in webpack.

For production mode,
`npm run build
npm start`

For development mode,
`npm run dev`

### Dependencies
express
body-parser
cors
path
webpack webpack-cli
@babel/core @babel/preset-env babel-loader
style-loader node-sass css-loader sass-loader
clean-webpack-plugin
html-webpack-plugin
mini-css-extract-plugin
optimize-css-assets-webpack-plugin terser-webpack-plugin

### References
Start up codes are coming from my another projects, Proj_3Weather-Journal-App and Proj-4_Webpack.



