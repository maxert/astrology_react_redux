import {
    GEOLOCATION
  } from "../types";
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
  




