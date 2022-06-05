import { DateTime } from 'luxon'
import {useState, useEffect} from 'react'
import ActionAreaCard from '../../Components/Card';
import Navbar from '../../Components/Navbar'

function Forecast({images}){
const [place, setPlace]= useState("");
const [longlat, setLonglat]=useState({lat:"", long:""});
const [location, setLocation]=useState("");
// console.log(images);
    useEffect(() => {
        if ("geolocation" in navigator) {
          console.log("Available");
        } else {
          console.log("Not Available");
        }
        // console.log(navigator);
        navigator.geolocation.getCurrentPosition(function (position) {
        //   console.log("Latitude is :", position.coords.latitude);
          setLonglat({lat:position.coords.latitude,long:position.coords.longitude})
        //   console.log("Longitude is :", position.coords.longitude);
    
          fetch(
            `https://developers.onemap.sg/commonapi/convert/4326to3414?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`
          )
            .then((res) => res.json())
            .then((data) =>
              fetch(
                `https://developers.onemap.sg/privateapi/commonsvc/revgeocodexy?location=${data.X},${data.Y}&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjg4MjAsInVzZXJfaWQiOjg4MjAsImVtYWlsIjoiY2xpdmFuOTNAZ21haWwuY29tIiwiZm9yZXZlciI6ZmFsc2UsImlzcyI6Imh0dHA6XC9cL29tMi5kZmUub25lbWFwLnNnXC9hcGlcL3YyXC91c2VyXC9zZXNzaW9uIiwiaWF0IjoxNjUzODI5Nzc2LCJleHAiOjE2NTQyNjE3NzYsIm5iZiI6MTY1MzgyOTc3NiwianRpIjoiYzA2NjBiZTU3MWZkOGEyNDZmYTc2NDY5MzFiZTdjNGQifQ.2xnWvtckpvsMinrqeWXbr0uwXSJi6Nek9K9DRLVwdN8`
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

    return (
        <>
        <Navbar/>
        <h1>Weather Forecast</h1>
        <h6>Time of update:  {DateTime.now()
          .setZone("Asia/Singapore")
          .set({ milliseconds: 0 })
          .toISO({ includeOffset: false, suppressMilliseconds: true })}
        </h6>
        <h6>Forecast Validity period: {location?.items?.[0]?.valid_period?.start} - {location?.items?.[0]?.valid_period?.end} </h6>
        <div className="personal-location">
        {location?.items?.[0]?.forecasts?.map((x)=>{
                return <ActionAreaCard legend={x.area} text={x.forecast} images={images}/>
            })}
        </div>

        </>
    )
}

export default Forecast;