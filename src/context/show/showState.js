import React, { useReducer } from "react";
import {
  SHOW_ELEMENT,
  HIDE_ELEMENT,
} from "../types";
import { ShowContext } from "./showContext";
import { ShowReducer } from "./showReducer";

export const ShowState = ({ children }) => {
  const initialState = {
    visible: false,
  };
  const [state, dispatch] = useReducer(ShowReducer, initialState);

  const show = (text, type = "warning") => {
    dispatch({
      type: SHOW_ELEMENT,
      visible: true
    });
  };
  const hide = () => {
    dispatch({ type: HIDE_ELEMENT, visible: false });
  };

  return (
    <ShowContext.Provider
      value={{
        show,
        hide,
        display: state
      }}
    >
      {children}
    </ShowContext.Provider>
  );
};
