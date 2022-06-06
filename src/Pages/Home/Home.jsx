import GpxParser from "gpxparser";
import "leaflet/dist/leaflet.css";
import { useMap } from "react-leaflet/hooks";
import {
  MapContainer,
  Polyline,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import { DateTime } from "luxon";
import { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import ActionAreaCard from "../../Components/Card";
import compareNearest from "../../Functions/compareNearest";

const API_KEY = import.meta.env.VITE_API_KEY


function Home({images,location,setLocation}) {
  
  const [longlat, setLonglat] = useState({ lat: "", long: "" });
  const [place, setPlace] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Available");
    } else {
      console.log("Not Available");
    }
    // console.log(navigator);
    navigator.geolocation.getCurrentPosition(function (position) {
      //   console.log("Latitude is :", position.coords.latitude);
      setLonglat({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
      //   console.log("Longitude is :", position.coords.longitude);

      fetch(
        `https://developers.onemap.sg/commonapi/convert/4326to3414?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`
      )
        .then((res) => res.json())
        .then((data) =>
          fetch(
            `https://developers.onemap.sg/privateapi/commonsvc/revgeocodexy?location=${data.X},${data.Y}&token=${API_KEY}`
          )
            .then((response) => response.json())

            .then((data) => setPlace(data))
        );
    });
  }, []);

  useEffect(() => {
    fetch(
      `https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=${DateTime.now()
        .setZone("Asia/Singapore")
        .set({ milliseconds: 0 })
        .toISO({ includeOffset: false, suppressMilliseconds: true })}`
    )
      .then((response) => response.json())

      .then((data) => setLocation(data));
  }, []);

  // console.log(place);
  // console.log(location);
  // console.log(longlat);
  const position = [longlat.lat, longlat.long];
  // console.log(position);

  // const compareNearest=(cityDetails, position)=>{
  // let addCity=cityDetails.map((x)=>{
  //     return x.label_location.longitude+x.label_location.latitude;
  // })
  // // console.log(addCity)
  // // console.log(position);
  // let diff=Math.abs(addCity[0]-position.LONGTITUDE-position.LATITUDE);
  // console.log(diff);
  // let index;
  // for (let i=1;i<addCity.length;i++){
  // const curr=Math.abs(addCity[i]-position.LONGTITUDE-position.LATITUDE);
  // if (curr<diff){
  //     diff=curr;
  //     index=i;
  // }
  // // console.log(index);
  // }
  // return index;
  // }

  return (
    <>
      <Navbar />
      <h1>Weather Forecast</h1>
      <div className="personal-location">
        <ActionAreaCard
          legend={
            place &&
            location?.area_metadata?.[
              compareNearest(location?.area_metadata, place?.GeocodeInfo?.[0])
            ]?.name
          }
          text={"Current Location"}
          images={images}
        />
        <ActionAreaCard
          legend={
            place &&
            location?.items?.[0]?.forecasts?.[
              compareNearest(location?.area_metadata, place?.GeocodeInfo?.[0])
            ]?.forecast
          }
          text={"Weather Forecast (2hrs)"}
          images={images}

        />
        <ActionAreaCard
          legend={DateTime.now()
            .setZone("Asia/Singapore")
            .set({ milliseconds: 0 })
            .toISO({ includeOffset: false, suppressMilliseconds: true })}
          text={"Current Timing"}
          images={images}
        />
      </div>
      <h6>
        Forecast Validity period: {location?.items?.[0]?.valid_period?.start} -{" "}
        {location?.items?.[0]?.valid_period?.end}{" "}
      </h6>

      {/* <h2>Current Location:{place && location?.area_metadata?.[compareNearest(location?.area_metadata,place?.GeocodeInfo?.[0])]?.name}</h2>
        <h2>Location Weather: {place &&location?.items?.[0]?.forecasts?.[compareNearest(location?.area_metadata,place?.GeocodeInfo?.[0])]?.forecast} </h2> */}
      {/* <h2>Current Location: {place?.GeocodeInfo?.[0].POSTALCODE} Longitude:{place?.GeocodeInfo?.[0].LONGTITUDE} Latitude:{place?.GeocodeInfo?.[0].LATITUDE}</h2> */}
      {/* <h3>Time of update:  {DateTime.now()
          .setZone("Asia/Singapore")
          .set({ milliseconds: 0 })
          .toISO({ includeOffset: false, suppressMilliseconds: true })}
        </h3>
        <h3>Forecast Validity period: {location?.items?.[0]?.valid_period?.start} - {location?.items?.[0]?.valid_period?.end} </h3> */}
      {/* {location?.items?.[0]?.forecasts?.map((x)=>{
                return <li>{x.area}: {x.forecast}</li>
            })}

        
    <h1>{longlat.lat}, {longlat.long}</h1> */}
      {longlat.lat && (
        <MapContainer
          center={{ lat: longlat.lat, lng: longlat.long }}
          zoom={15}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={{ lat: longlat.lat, lng: longlat.long }}>
            <Popup>
              This is where you are. <br />
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </>
  );
}

export default Home;
