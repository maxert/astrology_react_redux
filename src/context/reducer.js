import { SHOW_ELEMENT, HIDE_ELEMENT, LOG_IN, LOG_OUT } from "./types";
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
    ...payload,
    visible: false
  }),
  //Скрыть элемент
  [HIDE_ELEMENT]: state => ({
    ...state,
    visible: true
  }),
  DEFAULT: state => state
};
export const AlertReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
