import React, { useReducer } from "react";
import { ReduceContext } from "./reducerContext";
import { AlertReducer } from "./reducer";
import { SHOW_ELEMENT, HIDE_ELEMENT, LOG_OUT, LOG_IN } from "./types";
import Axios from "axios";

export const ReducerState = ({ children }) => {
  const initialState = {
    visible: false,
    isLogin: false,
    token:null
  };
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const show = (text, type = "warning") => {
    dispatch({
      type: SHOW_ELEMENT,
      payload: {
        text,
        type
      }
    });
  };
  const hide = () => dispatch({ type: HIDE_ELEMENT });

  const LogIn = async values => {
    const res = await Axios.post("/api/login", {
      email: values.email,
      password: values.password
    });
    dispatch({
      type: LOG_IN,
      token:res.data.data.api_token
    });
  };

  const LogOut = () => dispatch({ type: LOG_OUT });
  return (
    <ReduceContext.Provider
      value={{
        LogIn,
        LogOut,
        show,
        hide,
        none: state
      }}
    >
      {children}
    </ReduceContext.Provider>
  );
};
