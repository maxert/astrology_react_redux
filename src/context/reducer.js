import {
  LOG_IN,
  LOG_OUT,
  SELECT_LOCATION,
  NUMBER_ALL,
  ADD_FAVORITE,
  FETCH_DATA_FAVORITE,
  DELETE_FAVORITE,
  SEARCH_SELECT,
  CREATE_LINKS,
  FETCH_LINKS,
  ADD_TYPE_LINKS,
  FETCH_ONE_EVENTS,
  FETCH_ONE_COMPANY,
  FETCH_ONE_PERSONS,
  DELETE_LINK,
  FETCH_NOTAL_CARD,
  FAVORITE_SELECT,
  SELECT_HOME,
  ADD_NOTAL_CARD,
  UPDATE_NOTAL_CARD,
  CREATE_NOTAL_HOME,
  ONLINE_CARD,
  GEOLOCATION,
  SEARCH_CITY,
  FETCH_NUMBER,
  DELETE_ALL,
  PAGINATION_NUMBER,
  SORTED,
  LOADING,
  SEARCH_HOME,
  SHOW_NOTAL_CARD,
  FETCH_DATA_FAVORITE_ORDER,
  WIDTH,
} from "./types";

//Все состояния с переменными для обращения к ним
const handlers = {
  [LOG_IN]: (state, { token }) => ({
    ...state,
    isLogin: localStorage.getItem("users") !== "null" ? true : false,
    token: token,
  }),
  [LOG_OUT]: (state, { payload }) => ({
    ...state,
    isLogin: false,
    token: null,
  }),
  [DELETE_ALL]: (state) => ({
    ...state,
  }),
  [SELECT_LOCATION]: (state, { payload }) => ({
    ...state,
    option_value: payload,
  }),
  [PAGINATION_NUMBER]: (state, { payload }) => ({
    ...state,
    pagination: payload,
  }),
  [FETCH_DATA_FAVORITE_ORDER]: (state, { payload }) => ({
    ...state,
    data_favorite: payload,
  }),
  [FETCH_DATA_FAVORITE]: (state, { payload }) => ({
    ...state,
    data_favorite: payload,
  }),
  [ADD_FAVORITE]: (state) => ({
    ...state,
    add_favorite_json: [],
  }),
  [DELETE_FAVORITE]: (state) => ({
    ...state,
  }),
  [FETCH_LINKS]: (state, { payload }) => ({
    ...state,
    data_fetch_links: payload,
  }),
  [SHOW_NOTAL_CARD]: (state, { payload }) => ({
    ...state,
    data_fetch_links: payload,
  }),
  [FAVORITE_SELECT]: (state, { payload }) => ({
    ...state,
    data_link_favorite: payload,
  }),
  [NUMBER_ALL]: (state, { payload }) => ({
    ...state,
    number_all: payload,
  }),
  [SEARCH_HOME]: (state, { payload }) => ({
    ...state,
    data_value_home: payload,
  }),
  [SELECT_HOME]: (state, { payload }) => ({
    ...state,
    data_value_select: payload,
  }),
  [SEARCH_SELECT]: (state, { payload }) => ({
    ...state,
    data_link: payload,
  }),
  [ADD_TYPE_LINKS]: (state, { payload }) => ({
    ...state,
    data_id: payload,
  }),
  [CREATE_LINKS]: (state, { payload }) => ({
    ...state,
  }),
  [CREATE_NOTAL_HOME]: (state, { payload }) => ({
    ...state,
    notal_home: payload,
  }),

  [SEARCH_CITY]: (state, { payload }) => ({
    ...state,
    data_city: payload,
  }),
  [ONLINE_CARD]: (state, { payload }) => ({
    ...state,
    online_data: payload,
  }),
  [FETCH_ONE_COMPANY]: (state, { payload }) => ({
    ...state,
    one_company: payload,
  }),
  [FETCH_ONE_EVENTS]: (state, { payload }) => ({
    ...state,
    one_event: payload,
  }),
  [FETCH_ONE_PERSONS]: (state, { payload }) => ({
    ...state,
    one_persons: payload,
  }),
  [FETCH_NOTAL_CARD]: (state, { payload }) => ({
    ...state,
    data_notal: payload,
  }),
  [ADD_NOTAL_CARD]: (state, { payload }) => ({
    ...state,
    data_notal: payload,
  }),
  [UPDATE_NOTAL_CARD]: (state, { payload }) => ({
    ...state,
    data_notal: payload,
  }),
  [DELETE_LINK]: (state) => ({
    ...state,
  }),
  [FETCH_NUMBER]: (state, { payload }) => ({
    ...state,
    data_number: payload,
  }),
  [GEOLOCATION]: (state, { payload }) => ({
    ...state,
    geolocation: payload,
  }),
  [SORTED]: (state, { payload }) => ({
    ...state,
    sorted: payload,
  }),
  [LOADING]: (state, { payload }) => ({
    ...state,
    isLoading: payload,
  }),
  [WIDTH]: (state, { payload }) => ({
    ...state,
    width_mob: payload,
  }),
  DEFAULT: (state) => state,
};
export const AlertReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
