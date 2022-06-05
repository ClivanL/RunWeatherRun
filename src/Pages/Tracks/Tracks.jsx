import GpxParser from 'gpxparser'
import 'leaflet/dist/leaflet.css'
import { useMap } from 'react-leaflet/hooks'
import { MapContainer, Polyline, TileLayer, Marker, Popup} from 'react-leaflet'
import { DateTime } from 'luxon'
import {useState, useEffect} from 'react'
import Navbar from '../../Components/Navbar'
import runningroutes from '../../runningroutes'
import BasicTabs from '../../Components/Tab'


function Tracks(){

    const gpxMaps=runningroutes.map((x)=>{
        let gpx= new GpxParser();
        gpx.parse(x.route);
        return gpx.tracks[0].points.map(p => [p.lat, p.lon])   
        })
    // let gpx= new GpxParser();
    // gpx.parse(runningroutes[0].route)
    // console.log(gpx)
    // const positions = gpx.tracks[0].points.map(p => [p.lat, p.lon])
    // let gpx2=new GpxParser;
    // gpx2.parse(runningroutes[1].route)
    // const positions2 = gpx2.tracks[0].points.map(p => [p.lat, p.lon])  
        // console.log(gpxMaps);
    return(
        <>
        <Navbar />
        <BasicTabs />
        {/* <MapContainer center={[1.3521, 103.8198]} zoom={13} scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[1.3521, 103.8198]}>
    </Marker>
    {gpxMaps.map((x)=>{
        return <Polyline
        pathOptions={{ fillColor: 'red', color: 'blue' }}
        positions={x}
    />
    })}
  </MapContainer> */}
        </>
    )
}

export default Tracks;