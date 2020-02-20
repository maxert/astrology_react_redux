import React, { useReducer } from "react";
import { ReduceContext } from "./reducerContext";
import { AlertReducer } from "./reducer";
import { SHOW_ELEMENT, HIDE_ELEMENT } from "./types";

export const ReducerState = ({ children }) => {
  const initialState = {
    visible: false
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
  return (
    <ReduceContext.Provider
      value={{
        show,
        hide,
        none: state
      }}
    >
      {children}
    </ReduceContext.Provider>
  );
};
