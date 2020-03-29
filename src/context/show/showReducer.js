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
  DELETE_FAVORITE_LIST
} from "../types";
const handlers = {
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

  [FETCH_FAVORITE_ORDER]: (state, { payload }) => ({
    ...state,
    data_favorite: payload
  }),
  DEFAULT: state => state
};
export const ShowReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
