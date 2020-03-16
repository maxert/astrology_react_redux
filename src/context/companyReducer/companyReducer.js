import {
    ADD_COMPANY,
    FETCH_DATA_COMPANY,
    DELETE_COMPANY,
    UPDATE_COMPANY,
  } from "../types";
  const handlers = {
    [FETCH_DATA_COMPANY]: (state, { payload }) => ({
      ...state,
      data_company: payload
    }),
    [ADD_COMPANY]: state => ({
      ...state,
      add_company_json: []
    }),
    [UPDATE_COMPANY]: state => ({
      ...state,
      add_update_json: []
    }),
    [DELETE_COMPANY]: state => ({
      ...state
    }),
    DEFAULT: state => state
  };
  export const CompanyReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
  };
  