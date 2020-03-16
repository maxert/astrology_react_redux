import {
    SHOW_ELEMENT,
    HIDE_ELEMENT,
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
    
    DEFAULT: state => state
  };
  export const ShowReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
  };
  