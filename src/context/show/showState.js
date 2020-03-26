import React, { useReducer } from "react";
import {
  SHOW_ELEMENT,
  HIDE_ELEMENT,
  SEARCH_BOOL,
  SEARCH_DELETE,
  SEARCH
} from "../types";
import { ShowContext } from "./showContext";
import { ShowReducer } from "./showReducer";
import Axios from "axios";

export const ShowState = ({ children }) => {
  const initialState = {
    visible: false,
    isSearch:false,
    data_value:[],
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

  const search_bool = (bool) => {
    dispatch({ type: SEARCH_BOOL, payload: bool });
  };
  const search_delete = async (type,id,data) => {
      const res = await Axios.delete(
        `http://1690550.masgroup.web.hosting-test.net${type}` + id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("users")}`
          }
        }
      );
      console.log(res.data)
      const payload = data.filter(i => i.id !== id);
      alert.info("Заметка удаленна");
       console.log(payload)
  
    dispatch({ type: SEARCH_DELETE, payload });
  };

  const search_data = async (type, value, url) => {
    if (value.length === 0 || value === " ") {
      value = "a";
    }

    const res = await Axios.get(
      `http://1690550.masgroup.web.hosting-test.net${type}?search=${value}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("users")}`
        }
      }
    );
    debugger;
    const payload = Object.keys(res.data[Object.keys(res.data)[0]]).map(key => {
      return {
        ...res.data[Object.keys(res.data)[0]][key],
        id: res.data[Object.keys(res.data)[0]][key].id,
        title:
          res.data[Object.keys(res.data)[0]][key].name === undefined
            ? res.data[Object.keys(res.data)[0]][key].firstname +
              " " +
              (res.data[Object.keys(res.data)[0]][key].lastname !== null
                ? res.data[Object.keys(res.data)[0]][key].lastname
                : "")
            : res.data[Object.keys(res.data)[0]][key].name
      };
    });

    dispatch({
      type: SEARCH,
      payload
    });
  };


  return (
    <ShowContext.Provider
      value={{
        show,
        search_bool,
        hide,
        search_data,
        search_delete,
        display: state
      }}
    >
      {children}
    </ShowContext.Provider>
  );
};
