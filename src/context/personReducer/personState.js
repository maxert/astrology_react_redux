import React, { useReducer } from "react";
import {
  UPDATE_PERSONS,
  ADD_PERSONS,
  DELETE_PERSONS,
  FETCH_DATA_PERSONS
} from "../types";
import { PersonsContext } from "./personContext";
import { PersonsReducer } from "./personReducer";
import Axios from "axios";

export const PersonState = ({ children }) => {
  const initialState = {
    token: localStorage.getItem("users"),
    data_persons: null
  };
  const [state, dispatch] = useReducer(PersonsReducer, initialState);

  const Update_persons = async (values, id) => {
    var time = values.timezone.match(/[+-]?[0-9]+(.[0-9]+)?/g);
    const res = await Axios.put(
      `http://1690550.masgroup.web.hosting-test.net/api/persons/${id}?firstname=&lastname=&telephone=&email=&birth_date=&birth_time=&timezone=&latitude=&longtitude=&city=&image=`,
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
      "http://1690550.masgroup.web.hosting-test.net/api/persons?firstname=&lastname=&telephone=&email=&birth_date=&birth_time=&timezone=&latitude=&longtitude=&city=&image=",
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

  const delete_persons = async id => {
    await Axios.delete(
      "http://1690550.masgroup.web.hosting-test.net/api/persons/" + id,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );


    Fetch_data_persons();

    dispatch({
      type: DELETE_PERSONS
    });
  };
const Fetch_data_persons = async (number,isSorted) => {
    const res = await Axios.get(
      `http://1690550.masgroup.web.hosting-test.net/api/persons?page=${
        number === undefined ? 1 : number
      }`,

      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );
    
    isSorted===true?dispatch({
        type: FETCH_DATA_PERSONS,
        payload: res.data
      }):
      res.data.persons.sort().reverse()
      dispatch({
        type: FETCH_DATA_PERSONS,
        payload: res.data
      })
    
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
