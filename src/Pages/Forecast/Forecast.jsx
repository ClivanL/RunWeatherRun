import { DateTime } from 'luxon'
import {useState, useEffect} from 'react'
import ActionAreaCard from '../../Components/Card';
import Navbar from '../../Components/Navbar'
import useLocation from '../../hooks/useLocation'

function Forecast({images}){
      // const location=useLocation();
      const [location, setLocation]=useState("")
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
                return <ActionAreaCard key={x.area} legend={x.area} text={x.forecast} images={images}/>
            })}
        </div>

        </>
    )
}

export default Forecast;