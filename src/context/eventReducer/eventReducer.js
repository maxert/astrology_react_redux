import {
    ADD_EVENTS,
    DELETE_EVENTS,
    FETCH_DATA_EVENTS,
    UPDATE_EVENTS,
    SORT_DATA_EVENTS
  } from "../types";
  const handlers = {
    [FETCH_DATA_EVENTS]: (state, { payload }) => ({
      ...state,
      data_events: payload
    }),
    [ADD_EVENTS]: state => ({
      ...state,
      add_events_json: []
    }),
    [UPDATE_EVENTS]: state => ({
      ...state,
      add_events_json: []
    }),
    [DELETE_EVENTS]: state => ({
      ...state
    }),
    [SORT_DATA_EVENTS]: (state, { payload }) => ({
      ...state,
      data_events: payload
    }),
    DEFAULT: state => state
  };
  export const EventReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
  };
  