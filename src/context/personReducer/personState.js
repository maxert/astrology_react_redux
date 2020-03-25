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
import { useAlert } from "react-alert";
import { useHistory } from "react-router";

export const PersonState = ({ children }) => {
  const initialState = {
    token: localStorage.getItem("users"),
    data_perons: []
  };
  const [state, dispatch] = useReducer(PersonsReducer, initialState);
  const { isLoading } = useContext(ReduceContext);
  const alert = useAlert();
  const history = useHistory();
  const Update_persons = async (values, id) => {
    let formData = new FormData();
    Object.keys(values).map(key => {
      if(key==="upload_image"){
      formData.append(key, values[key][0]);
      }else{
        formData.append(key, values[key]);
      }
    });
    
    const res = await Axios.post(
      `http://1690550.masgroup.web.hosting-test.net/api/persons/${id}`,
      formData,
      {
        headers: {

          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );
    alert.success("Персона обновленна");
    debugger;
    dispatch({
      type: UPDATE_PERSONS,
      add_update_json: res.data
    });
  };

  const Add_persons = async values => {
    let formData = new FormData();
  
    Object.keys(values).map(key => {
      if(key==="upload_image"){
      formData.append(key, values[key][0]);
      }else{
        formData.append(key, values[key]);
      }
    });
   

    console.log(formData);
    debugger;
    const res = await Axios.post(
      "http://1690550.masgroup.web.hosting-test.net/api/persons",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );
    alert.success("Персона созданна");
    history.goBack();
    dispatch({
      type: ADD_PERSONS,
      payload: res.data
    });
  };
  const delete_persons = async (id, id_pagination, order_by) => {
    const res = await Axios.delete(
      `http://1690550.masgroup.web.hosting-test.net/api/persons/` + id,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );
    isLoading(false);
    Fetch_data_persons(id_pagination, order_by);
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
      debugger;
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
