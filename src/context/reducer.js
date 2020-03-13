import {
  SHOW_ELEMENT,
  HIDE_ELEMENT,
  LOG_IN,
  LOG_OUT,
  SELECT_LOCATION,
  FETCH_DATA_PERSONS,
  ADD_PERSONS,
  DELETE_PERSONS,
  FETCH_ONE_PERSONS,
  NUMBER_ALL,
  UPDATE_PERSONS,
  ADD_COMPANY,
  FETCH_DATA_COMPANY,
  DELETE_COMPANY,
  FETCH_ONE_COMPANY,
  UPDATE_COMPANY,
  ADD_EVENTS,
  DELETE_EVENTS,
  FETCH_DATA_EVENTS,
  FETCH_ONE_EVENTS,
  UPDATE_EVENTS,
  ADD_FAVORITE,
  FETCH_DATA_FAVORITE,
  DELETE_FAVORITE
} from "./types";
const handlers = {
  //Залогиненый пользователь
  [LOG_IN]: (state, { token }) => ({
    ...state,
    isLogin: localStorage.getItem("users") !== "null" ? true : false,
    token: token
  }),
  //Разлогиненый пользователь
  [LOG_OUT]: (state, { payload }) => ({
    ...state,
    isLogin: false,
    token: null
  }),
  //Показать элемент
  [SHOW_ELEMENT]: (state, { payload }) => ({
    ...state,
    visible: false
  }),
  //Скрыть элемент
  [HIDE_ELEMENT]: state => ({
    ...state,
    visible: true
  }),
  [SELECT_LOCATION]: state => ({
    ...state,
    option_value: ""
  }),
  [FETCH_DATA_PERSONS]: (state, { payload }) => ({
    ...state,
    data_persons: payload
  }),
  [FETCH_DATA_COMPANY]: (state, { payload }) => ({
    ...state,
    data_company: payload
  }),
  [FETCH_DATA_EVENTS]: (state, { payload }) => ({
    ...state,
    data_events: payload
  }),
  [FETCH_DATA_FAVORITE]: (state, { payload }) => ({
    ...state,
    data_favorite: payload
  }),
  [ADD_PERSONS]: state => ({
    ...state,
    add_persons_json: []
  }),
  [ADD_COMPANY]: state => ({
    ...state,
    add_company_json: []
  }),
  [ADD_EVENTS]: state => ({
    ...state,
    add_events_json: []
  }),
  [ADD_FAVORITE]: state => ({
    ...state,
    add_favorite_json: []
  }),
  [UPDATE_PERSONS]: state => ({
    ...state,
    add_update_json: []
  }),
  [UPDATE_COMPANY]: state => ({
    ...state,
    add_update_json: []
  }),
  [UPDATE_EVENTS]: state => ({
    ...state,
    add_events_json: []
  }),
  [DELETE_PERSONS]: state => ({
    ...state
  }),
  [DELETE_COMPANY]: state => ({
    ...state
  }),
  [DELETE_EVENTS]: state => ({
    ...state
  }),
  [DELETE_FAVORITE]: state => ({
    ...state
  }),
  [FETCH_ONE_PERSONS]: (state, { payload }) => ({
    ...state,
    one_persons: payload
  }),
  [FETCH_ONE_COMPANY]: (state, { payload }) => ({
    ...state,
    one_company: payload
  }),
  [FETCH_ONE_EVENTS]: (state, { payload }) => ({
    ...state,
    one_events: payload
  }),
  [NUMBER_ALL]: (state, { payload }) => ({
    ...state,
    number_all: payload
  }),
  
  DEFAULT: state => state
};
export const AlertReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
