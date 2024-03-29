import {
  SHOW_ELEMENT,
  HIDE_ELEMENT,
  SEARCH_BOOL,
  SEARCH,
  SEARCH_DELETE,
  SEARCH_ADD_FAVORITE,
  SEARCH_DELETE_FAVORITE,
  SEARCH_SORT,
  SEARCH_SORT_FAVORITE,
  FETCH_FAVORITE_LIST,
  FETCH_FAVORITE_ORDER,
  DELETE_FAVORITE_LIST,
  SELECT_FAVORITE_LIST,
  SEARCH_FAVORITE_LIST
} from "../types";

//Все состояния с переменными для обращения к ним
const handlers = {
  [SHOW_ELEMENT]: (state, { payload }) => ({
    ...state,
    visible: false
  }),
  [HIDE_ELEMENT]: state => ({
    ...state,
    visible: true
  }),
  [SEARCH_BOOL]: (state, { payload }) => ({
    ...state,
    isSearch: payload
  }),
  [SEARCH_DELETE]: (state, { payload }) => ({
    ...state,
    data_value: payload
  }),
  [SEARCH]: (state, { payload }) => ({
    ...state,
    data_value: payload
  }),
  [SEARCH_DELETE_FAVORITE]: (state, { payload }) => ({
    ...state,
    data_value: payload
  }),
  [SEARCH_ADD_FAVORITE]: (state, { payload }) => ({
    ...state,
    data_value: payload
  }),
  [SEARCH_SORT]: (state, { payload }) => ({
    ...state,
    data_value: payload
  }),
  [SEARCH_SORT_FAVORITE]: (state, { payload }) => ({
    ...state,
    data_value_favorite: payload
  }),

  [DELETE_FAVORITE_LIST]: (state, { payload }) => ({
    ...state,
    data_favorite: payload
  }),
  [FETCH_FAVORITE_LIST]: (state, { payload }) => ({
    ...state,
    data_favorite: payload
  }),
  [SELECT_FAVORITE_LIST]: (state, { payload }) => ({
    ...state,
    select_fav: payload
  }),
  [FETCH_FAVORITE_ORDER]: (state, { payload }) => ({
    ...state,
    data_favorite: payload
  }),
  [SEARCH_FAVORITE_LIST]: (state, { payload }) => ({
    ...state,
    data_favorite_search: payload
  }),
  DEFAULT: state => state
};
export const ShowReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
