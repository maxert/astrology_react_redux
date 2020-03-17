import React, { useReducer } from "react";
import { EventContext } from "./eventContext";
import { EventReducer } from "./eventReducer";
import {
  ADD_EVENTS,
  FETCH_DATA_EVENTS,
  DELETE_EVENTS,
  UPDATE_EVENTS,
} from "../types";
import Axios from "axios";

export const EventState = ({ children }) => {
  const initialState = {
    token: localStorage.getItem("users"),
    data_events: null,
  };
  const [state, dispatch] = useReducer(EventReducer, initialState);




  const Fetch_data_events = async number => {
    const res = await Axios.get(
      `http://1690550.masgroup.web.hosting-test.net/api/events?page=${
        number === undefined ? 1 : number
      }`,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );

    console.log(res.data);
    dispatch({
      type: FETCH_DATA_EVENTS,
      payload: res.data
    });
  };
  

 
 
  const delete_events = async id => {
    await Axios.delete(
      "http://1690550.masgroup.web.hosting-test.net/api/events/" + id,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );
    Fetch_data_events();

    dispatch({
      type: DELETE_EVENTS
    });
  };
  

  const Update_events = async (values, id) => {
    var time = values.timezone.match(/[+-]?[0-9]+(.[0-9]+)?/g);
    const res = await Axios.put(
      `http://1690550.masgroup.web.hosting-test.net/api/events/${id}?name&description&event_date&event_time&timezone&latitude&longtitude&city`,
      {
        name: values.name,
        description: values.description,
        email: values.email,
        telephone: values.telephone,
        event_date: values.event_date,
        event_time: values.event_time,
        timezone: parseFloat(time[0]),
        longtitude: parseFloat(values.longtitude),
        latitude: parseFloat(values.latitude),
        city: values.city
      },
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );
    dispatch({
      type: UPDATE_EVENTS,
      add_update_json: res.data
    });
    console.log(res);
  };
  const Add_events = async values => {
    var time = values.timezone.match(/[+-]?[0-9]+(.[0-9]+)?/g);
    const res = await Axios.post(
      "http://1690550.masgroup.web.hosting-test.net/api/events?name&description&event_date&event_time&timezone&latitude&longtitude&city",
      {
        name: values.name,
        description: values.description,
        email: values.email,
        telephone: values.telephone,
        event_date: values.event_date,
        event_time: values.event_time,
        timezone: time[0],
        longtitude: parseFloat(values.longtitude),
        latitude: parseFloat(values.latitude),
        city: values.city
      },
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );
    dispatch({
      type: ADD_EVENTS,
      add_events_json: res.data
    });
    console.log(res);
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
