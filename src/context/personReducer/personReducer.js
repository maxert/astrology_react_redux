import {
    FETCH_DATA_PERSONS,
    ADD_PERSONS,
    DELETE_PERSONS,
    UPDATE_PERSONS,
  } from "../types";
  const handlers = {
    [FETCH_DATA_PERSONS]: (state, { payload }) => ({
      ...state,
      data_persons: payload
    }),
    [ADD_PERSONS]: state => ({
      ...state,
      add_persons_json: []
    }),
    [UPDATE_PERSONS]: state => ({
      ...state,
      add_update_json: []
    }),
    [DELETE_PERSONS]: state => ({
      ...state
    }),


    DEFAULT: state => state
  };
  export const PersonsReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
  };
  