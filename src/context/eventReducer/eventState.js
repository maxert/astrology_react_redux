import React, { useReducer, useContext } from "react";
import { EventContext } from "./eventContext";
import { EventReducer } from "./eventReducer";
import {
  ADD_EVENTS,
  FETCH_DATA_EVENTS,
  DELETE_EVENTS,
  UPDATE_EVENTS
} from "../types";
import Axios from "axios";
import { useAlert } from "react-alert";
import { useHistory } from "react-router";
import { ReduceContext } from "../reducerContext";

export const EventState = ({ children }) => {
  const initialState = {
    token: localStorage.getItem("users"),
    data_events: []
  };
  const [state, dispatch] = useReducer(EventReducer, initialState);
  const alert = useAlert();
  const history = useHistory();
  const { isLoading, fetch_number } = useContext(ReduceContext);

  const Fetch_data_events = async (number, order_by) => {
    const res = await Axios.get(
      `http://1690550.masgroup.web.hosting-test.net/api/events?page=${
        number === undefined ? 1 : number
      }&order_direction=${order_by}`,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );
    fetch_number();
    console.log(res.data);
    dispatch({
      type: FETCH_DATA_EVENTS,
      payload: res.data
    });
    isLoading(true);
  };

  const delete_events = async (id, id_pagination, order_by) => {
    await Axios.delete(
      "http://1690550.masgroup.web.hosting-test.net/api/events/" + id,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );
    isLoading(false);

    Fetch_data_events(id_pagination, order_by);
    fetch_number();
    dispatch({
      type: DELETE_EVENTS
    });
  };

  const Update_events = async (values, id) => {
    let formData = new FormData();

    Object.keys(values).map(key => {
      if (key === "upload_image") {
        formData.append(key, values[key][0]);
      } else {
        formData.append(key, values[key]);
      }
    });

    console.log(formData);
    debugger;
    const res = await Axios.post(
      "http://1690550.masgroup.web.hosting-test.net/api/events/" + id,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );
    alert.success("Событие обновленно");
    dispatch({
      type: UPDATE_EVENTS,
      payload: res.data
    });
  };
  const Add_events = async values => {
    let formData = new FormData();

    Object.keys(values).map(key => {
      if (key === "upload_image") {
        formData.append(key, values[key][0]);
      } else {
        formData.append(key, values[key]);
      }
    });

    console.log(formData);
    debugger;
    const res = await Axios.post(
      "http://1690550.masgroup.web.hosting-test.net/api/events",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );
    alert.success("Событие созданно");
    fetch_number();
    history.goBack();
    dispatch({
      type: ADD_EVENTS,
      payload: res.data
    });
  };

  return (
    <EventContext.Provider
      value={{
        Add_events,
        Update_events,
        delete_events,
        Fetch_data_events,
        state_event: state
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
