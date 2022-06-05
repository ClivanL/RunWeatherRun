import GpxParser from "gpxparser";

const convertToCoordinates=(route)=>{
    const gpx= new GpxParser();
    gpx.parse(route);
    return gpx.tracks[0].points.map(p => [p.lat, p.lon])   
}

export default convertToCoordinates;