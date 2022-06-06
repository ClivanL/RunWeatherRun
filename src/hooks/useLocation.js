import {useEffect, useState} from 'react'
import { DateTime } from "luxon";


function useLocation(){
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
      return location;
}

export default useLocation;