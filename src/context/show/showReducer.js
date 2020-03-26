import {
    SHOW_ELEMENT,
    HIDE_ELEMENT,
    SEARCH_BOOL,
    SEARCH,
    SEARCH_DELETE
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
      data_value:payload
    }),
    DEFAULT: state => state
  };
  export const ShowReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
  };
  