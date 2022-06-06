import "leaflet/dist/leaflet.css";
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
import useLocation from '../../hooks/useLocation'

const API_KEY = import.meta.env.VITE_API_KEY


function Home({images}) {
  
  const [longlat, setLonglat] = useState({ lat: "", long: "" });
  const [place, setPlace] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Available");
    } else {
      console.log("Not Available");
    }
    navigator.geolocation.getCurrentPosition(function (position) {
      setLonglat({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });

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
  
  const location=useLocation();

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
