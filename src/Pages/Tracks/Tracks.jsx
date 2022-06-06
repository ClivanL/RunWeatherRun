import GpxParser from 'gpxparser'
import 'leaflet/dist/leaflet.css'
import Navbar from '../../Components/Navbar'
import runningroutes from '../../runningroutes'
import BasicTabs from '../../Components/Tab'


function Tracks(){

    const gpxMaps=runningroutes.map((x)=>{
        let gpx= new GpxParser();
        gpx.parse(x.route);
        return gpx.tracks[0].points.map(p => [p.lat, p.lon])   
        })

    return(
        <>
        <Navbar />
        <BasicTabs />
        </>
    )
}

export default Tracks;