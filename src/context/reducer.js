import { SHOW_ELEMENT, HIDE_ELEMENT } from "./types";
const handlers = {
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
