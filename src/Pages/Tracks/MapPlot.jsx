import Navbar from "../../Components/Navbar";
import {useContext} from 'react'
import {FavsRoutes} from '../../App'
import GpxParser from 'gpxparser'
import 'leaflet/dist/leaflet.css'
import { MapContainer, Polyline, TileLayer, Marker, Popup} from 'react-leaflet'
///

function MapPlot(){
    const context=useContext(FavsRoutes);
    const gpxMaps=context.favsRoutes.map((x)=>{
    let gpx= new GpxParser();
    gpx.parse(x.route);
    return gpx.tracks[0].points.map(p => [p.lat, p.lon])   
    })
    return (
        <>
        <Navbar/>
        <h2>Routes selected to be plotted</h2>
        {context.favsRoutes.map((x)=>{
            return <p key={x.description}>{x.description},{x.location}:{x.distance}km</p>
        })}
        <MapContainer center={[1.3521, 103.8198]} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[1.3521, 103.8198]}>
    </Marker>
    {gpxMaps.map((x)=>{
        return     <Polyline key={x}
        pathOptions={{ fillColor: 'red', color: 'blue' }}
        positions={x}
    />
    })}

  </MapContainer>
        </>
    )
}

export default MapPlot;