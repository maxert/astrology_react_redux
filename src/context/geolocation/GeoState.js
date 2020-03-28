
import React, { useReducer, useContext } from "react";
import {
  GEOLOCATION
} from "../types";
import Axios from "axios";
import Geocode from "react-geocode";
import { GeoReducer } from "./GeoReducer";
import { ReduceContext } from "../reducerContext";
import { GeoContext } from "./GeoContext";

export const GeoState = ({ children }) => {
  const initialState = {
    isEdit: true
  };
  const {SelectLocationNew}=useContext(ReduceContext);
  const [state, dispatch] = useReducer(GeoReducer, initialState);
  const geolocation = city => {
    const API = "AIzaSyA8N9Pn8cR6kKibSWGXkY4e9saEvPv-Z-U";
    Geocode.setApiKey(API);
    Geocode.setLanguage("ru");
    Geocode.fromAddress(city).then(
      async response => {
        const res = await Axios.get(
          `https://maps.googleapis.com/maps/api/timezone/json?location=${
            response.results[0].geometry.location.lat
          },${response.results[0].geometry.location.lng}&timestamp=${parseInt(
            Date.now() / 1000
          )}&key=${API}`
        );
        console.log(res);
        SelectLocationNew(parseInt(res.data.rawOffset / 3600));
        SelectLocationNew(parseInt(res.data.rawOffset / 3600));
        localStorage.setItem("city", city);
        
        dispatch({
          type: GEOLOCATION,
          payload: {
            city: city,
            location: response.results[0].geometry.location,
            timezone: parseInt(res.data.rawOffset / 3600),
            letnee: res.data.dstOffset > 0 ? true : false
          }
        });
        
      },
      error => console.log(error)
    );
  };
  return (
    <GeoContext.Provider
      value={{
        geolocation,
        geoGet: state
      }}
    >
      {children}
    </GeoContext.Provider>
  );
};



