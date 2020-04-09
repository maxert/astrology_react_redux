import {
    GEOLOCATION
  } from "../types";


  //Все состояния с переменными для обращения к ним
  const handlers = {
    [GEOLOCATION]: (state, { payload }) => ({
      ...state,
      geolocation: payload
    }),
  
    DEFAULT: state => state
  };
  
  export const GeoReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
  };
  




