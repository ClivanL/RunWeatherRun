import { useState, createContext} from 'react'
import './App.css'
import GpxParser from 'gpxparser'
import 'leaflet/dist/leaflet.css'
import { useMap } from 'react-leaflet/hooks'
import { MapContainer, Polyline, TileLayer, Marker, Popup} from 'react-leaflet'
import { DateTime } from 'luxon'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Tracks from './Pages/Tracks/Tracks'
import ListOfTracks from './Pages/Tracks/ListOfTracks'
import PlotMap from './Pages/Tracks/MapPlot'
import Forecast from './Pages/Forecast/Forecast'
import images from './images'

export const FavsRoutes = createContext();


function App() {
const [location, setLocation] = useState("");
const [favsRoutes,setFavsRoutes]=useState([]);

  return (
    <FavsRoutes.Provider value={{favsRoutes,setFavsRoutes}}>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home images={images} location={location} setLocation={setLocation}/>} />
    <Route path="/forecast" element={<Forecast images={images}/>} />
    <Route path="/listoftracks" element={<ListOfTracks location={location}/>}/> 
    <Route path="/listoftracks/mapplot" element={<PlotMap/>} />
    <Route path="/tracks" element={<Tracks />} />
    </Routes>
    </BrowserRouter>
    </FavsRoutes.Provider>
  )
}

export default App
