import { SHOW_ELEMENT, HIDE_ELEMENT, LOG_IN, LOG_OUT } from "./types";
const handlers = {
  [LOG_IN]: (state, { token }) => ({
    ...state,
    isLogin: true,
    token: token
  }),
  [LOG_OUT]: (state, { payload }) => ({
    ...payload,
    isLogin: false,
    token: null
  }),
  [SHOW_ELEMENT]: (state, { payload }) => ({
    ...payload,
    visible: false
  }),
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
