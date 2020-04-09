import {
    FETCH_DATA_PERSONS,
    ADD_PERSONS,
    UPDATE_PERSONS,
    DELETE_PERSONS,
  } from "../types";
  //Все состояния с переменными для обращения к ним
  const handlers = {
    [FETCH_DATA_PERSONS]: (state, { payload }) => ({
      ...state,
      data_persons: payload
    }),
    [DELETE_PERSONS]: (state) => ({
      ...state,
    }),
    [ADD_PERSONS]: (state, { payload }) => ({
      ...state,
      payload
    }),
    [UPDATE_PERSONS]: state => ({
      ...state,
      add_update_json: []
    }),


    DEFAULT: state => state
  };
  export const PersonsReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
  };
  