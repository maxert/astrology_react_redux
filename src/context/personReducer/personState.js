import React, { useReducer, useContext } from "react";
import {
  UPDATE_PERSONS,
  ADD_PERSONS,
  FETCH_DATA_PERSONS,
  DELETE_PERSONS
} from "../types";
import { PersonsContext } from "./personContext";
import { PersonsReducer } from "./personReducer";
import Axios from "axios";
import { ReduceContext } from "../reducerContext";

export const PersonState = ({ children }) => {
  const initialState = {
    token: localStorage.getItem("users"),
    data_perons:[]
  };
  const [state, dispatch] = useReducer(PersonsReducer, initialState);
  const {isLoading} = useContext(ReduceContext);
  const Update_persons = async (values, id) => {
    var time = values.timezone.match(/[+-]?[0-9]+(.[0-9]+)?/g);
    const res = await Axios.put(
      `http://1690550.masgroup.web.hosting-test.net/api/persons/${id}`,
      {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        telephone: values.telephone,
        birth_date: values.birth_date,
        birth_time: values.birth_time,
        timezone: parseFloat(time[0]),
        longtitude: parseFloat(values.longtitude),
        latitude: parseFloat(values.latitude),
        city: values.city,
        image: "asd"
      },
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );
    debugger;
    dispatch({
      type: UPDATE_PERSONS,
      add_update_json: res.data
    });
  };

  const Add_persons = async values => {
    var time = values.timezone.match(/[+-]?[0-9]+(.[0-9]+)?/g);
    debugger;
    const res = await Axios.post(
      "http://1690550.masgroup.web.hosting-test.net/api/persons",
      {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        telephone: values.telephone,
        birth_date: values.birth_date,
        birth_time: values.birth_time,
        timezone: parseFloat(time[0]),
        longtitude: parseFloat(values.longtitude),
        latitude: parseFloat(values.latitude),
        city: values.city,
        image: "asd"
      },
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );
    debugger;
    dispatch({
      type: ADD_PERSONS,
      add_persons_json: res.data
    });
  };
  const delete_persons = async (id,id_pagination,order_by) => {
    const res = await Axios.delete(
      `http://1690550.masgroup.web.hosting-test.net/api/persons/` + id,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );
    Fetch_data_persons(id_pagination,order_by)
    dispatch({
      type: DELETE_PERSONS
    });
  };
  const Fetch_data_persons = (number, order_by) => {
    Axios.get(
      `http://1690550.masgroup.web.hosting-test.net/api/persons?page=${
        number === undefined ? 1 : number
      }&order_direction=${order_by}`,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    ).then(res => {
      console.log(res.data);
      debugger
      dispatch({
        type: FETCH_DATA_PERSONS,
        payload: res.data
      });
      isLoading(true);
    });
  };
  return (
    <PersonsContext.Provider
      value={{
        Update_persons,
        Add_persons,
        delete_persons,
        Fetch_data_persons,
        state_persons: state
      }}
    >
      {children}
    </PersonsContext.Provider>
  );
};
