import {
  FETCH_NOTE,
  DELETE_NOTE,
  ADD_NOTE,
  UPDATE_NOTE,
  EDIT_NOTE
} from "../types";

//Все состояния с переменными для обращения к ним
const handlers = {
  [FETCH_NOTE]: (state, { payload }) => ({
    ...state,
    data_note: payload
  }),
  [DELETE_NOTE]: (state, { payload }) => ({
    ...state,
    data_note: payload
  }),
  [ADD_NOTE]: state => ({
    ...state,
    add_persons_json: []
  }),
  [UPDATE_NOTE]: state => ({
    ...state,
    add_update_json: []
  }),

  [EDIT_NOTE]: (state, { payload }) => ({
    ...state,
    data_note: payload
  }),

  DEFAULT: state => state
};
export const NoteReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
