import React, { useReducer } from "react";
import { ReduceContext } from "./reducerContext";
import { AlertReducer } from "./reducer";
import {
  SHOW_ELEMENT,
  HIDE_ELEMENT,
  LOG_OUT,
  LOG_IN,
  SELECT_LOCATION,
  FETCH_DATA_PERSONS,
  ADD_PERSONS
} from "./types";
import Axios from "axios";

export const ReducerState = ({ children }) => {
  const initialState = {
    visible: false,
    isLogin: localStorage.getItem("users") !== "null" ? true : false,
    token: localStorage.getItem("users"),
    option_value: "GMT+2",
    data_persons: []
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
    const res = await Axios.post(
      "http://1690550.masgroup.web.hosting-test.net/api/login",
      {
        email: values.email,
        password: values.password
      }
    );

    console.log(res);
    localStorage.setItem("users", res.data.data.api_token);
    dispatch({
      type: LOG_IN,
      token: res.data.data.api_token
    });
  };
  const SelectLocation = async value => {
    dispatch({
      type: SELECT_LOCATION,
      option_value: value
    });
  };

  const Fetch_data_persons = async () => {
    const res = await Axios.get(
      `http://1690550.masgroup.web.hosting-test.net/api/persons?page=1`,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );
    const payload = Object.keys(res.data.persons).map(key => {
      return {
        ...res.data.persons[key],
        id: key
      };
    });
    dispatch({
      type: FETCH_DATA_PERSONS,
      payload
    });
  };
  const Add_persons = async values => {
    const res = Axios.post(
      "http://1690550.masgroup.web.hosting-test.net/api/persons?firstname=&lastname=&telephone=&email=&birth_date=&birth_time=&timezone=&latitude=&longtitude=&city=&image=",
      {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        telephone: values.telephone,
        birth_date: values.birth_date,
        birth_time: values.time,
        timezone: parseInt(values.timezone.replace(/\D+/g, "")),
        longtitude: parseInt(values.longitude.replace(/\D+/g, "")),
        latitude: parseInt(values.latitude.replace(/\D+/g, "")),
        city: values.city,
        image: "asd"
      },
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );
    dispatch({
      type: ADD_PERSONS,
      add_persons_json: res.data
    });
    console.log(res);
  };
  const LogOut = async () => {
    localStorage.setItem("users", null);
    dispatch({
      type: LOG_OUT,
      token: null
    });
  };
  return (
    <ReduceContext.Provider
      value={{
        Add_persons,
        Fetch_data_persons,
        SelectLocation,
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
