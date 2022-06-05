# RunWeather-app

## Objective
Learnt the basics of React Application development as part of General Assembly's Software Engineering Immersive program and tasked to apply the concepts learnt in a project genre of our choice

## Motivation
Being an avid runner and cyclist, one of the pain points for myself and fellow like-minded runners and cyclist is having plans being affected due to the weather- rain. I embarked on this project with the intention to solve the problem. 

## Overview
A route planning application, integrating weather forecasting for better decision making to avoid the rain, created using vite with React Framework, Material-UI, Leaflet(maps), GpxParser, luxon(date/time). Data fetched from [onemap](https://developers.onemap.sg/) and [data.gov.sg](https://data.gov.sg/dataset/weather-forecast). [Click here to view the live version.](https://runweather.vercel.app/)

### Features
#### Current
- Track current location of user and provide weather forecast for the next 2hrs
- Provide weather forecast for the next 2hrs for locations across Singapore
- Display running routes around Singapore
- Map plotting feature for user to shortlist routes based on details-location, distance, location's weather forecast and displaying them

#### Future improvement considerations
- Weather forecast for 24hrs, 4days
- User customization features- able to add custom routes (GPX files) into website
- Travelling duration from user's location to destination for map plotting feature

### Packages

- [vite-React]
- [material-ui](https://material-ui.com/) - Google's Material Design in easy to use React components
- [Leaflet](https://leafletjs.com/) - Map function to display running routes
- [GpxParser](https://www.npmjs.com/package/gpxparser) - conversion of GPX files to longitude and latitude coordinates
- [luxon](https://moment.github.io/luxon/#/?id=luxon) - extraction of current date and time, based on timezone of user

## Structure

### Components

```
─ src
├── App.css
├── App.jsx
├── Components
   ├── Card.jsx
   ├── Navbar.jsx
   ├── Tab.jsx
   └── Table.jsx
├── Functions
   ├── compareNearest.js
   ├── convertToCoordinates.js
   └── findCenter.js
├── Pages
   ├── Forecast
   │   └── Forecast.js
   ├── Home
   │   └── Home.jsx
   └── Tracks
       ├── ListOfTracks.jsx
       ├── MapPlot.jsx
       └── Tracks.jsx
```

### Data fetched from APIs
[onemap](https://developers.onemap.sg/) Chain API fetches (`Navigator` longitude and latitude -> `onemap` x-coordinates, y coordinates -> `onemap`-> exact location
[data.gov.sg](https://data.gov.sg/dataset/weather-forecast) Weather forecast data fetched using current date and time
### Store

React hooks are used to store values:
```
const [location, setLocation] = useState(""); //longitude and latitude points of key areas in singapore, and weather forecasts in the areas
const [favsRoutes,setFavsRoutes]=useState([]); //storing user's selection in route mapping page
const [longlat, setLonglat] = useState({ lat: "", long: "" }); //storing longitude and latitude of user's location
const [place, setPlace] = useState(""); //user's exact location, postal code, street name etc
```

## Glads:
- Managed to get the application running
- Utilised external libraries (Maps), Material UI and managed to put them to some use
- Able to fetch data, chain API fetches

## Sads:
- Did plan, but plan didn't materialise due to API issues
- Plan was not comprehensive enough to allow for adding in additional features, adding more features required shifting state declarations in the different levels
- Passing down values from parent to child components was inconsistent, passing down props, useContext

## How I could have done better:
- Plan better, define re-usable functions earlier and export them, have functions that are less specific so that they are reusable

## Credits
- Rendering GPX tracks in React(https://www.manuelkruisz.com/blog/posts/gpx-maps-react),
