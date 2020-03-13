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
  FETCH_ONE_PERSONS,
  ADD_PERSONS,
  DELETE_PERSONS,
  NUMBER_ALL,
  UPDATE_PERSONS,
  ADD_COMPANY,
  FETCH_DATA_COMPANY,
  DELETE_COMPANY,
  FETCH_ONE_COMPANY,
  UPDATE_COMPANY,
  ADD_EVENTS,
  FETCH_DATA_EVENTS,
  DELETE_EVENTS,
  FETCH_ONE_EVENTS,
  UPDATE_EVENTS,
  ADD_FAVORITE,
  FETCH_DATA_FAVORITE,
  DELETE_FAVORITE
} from "./types";
import Axios from "axios";

export const ReducerState = ({ children }) => {
  const initialState = {
    visible: false,
    isLogin: localStorage.getItem("users") !== "null" ? true : false,
    token: localStorage.getItem("users"),
    option_value: "GMT+2",
    data_persons: null,
    data_company: null,
    data_events: null,
    data_favorite: null,
    number_all: ""
  };
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const show = (text, type = "warning") => {
    dispatch({
      type: SHOW_ELEMENT,
      visible: true
    });
  };
  const hide = () => {
    dispatch({ type: HIDE_ELEMENT, visible: false });
  };
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

  const Fetch_data_favorite = async number => {
    const res = await Axios.get(
      `http://1690550.masgroup.web.hosting-test.net/api/favorites`,

      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );

    console.log(res.data);
    dispatch({
      type: FETCH_DATA_FAVORITE,
      payload: res.data
    });
  };
  const Fetch_data_persons = async number => {
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

    console.log(res.data);
    dispatch({
      type: FETCH_DATA_PERSONS,
      payload: res.data
    });
  };
  const Fetch_data_сompany = async number => {
    const res = await Axios.get(
      `http://1690550.masgroup.web.hosting-test.net/api/companies?page=${
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
      type: FETCH_DATA_COMPANY,
      payload: res.data
    });
  };

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
  const Fetch_one_persons = async id => {
    const res = await Axios.get(
      `http://1690550.masgroup.web.hosting-test.net/api/persons/` + id,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );

    console.log(res.data);
    dispatch({
      type: FETCH_ONE_PERSONS,
      payload: res.data
    });
  };
  const Fetch_one_events = async id => {
    const res = await Axios.get(
      `http://1690550.masgroup.web.hosting-test.net/api/events/` + id,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );

    console.log(res.data);
    dispatch({
      type: FETCH_ONE_EVENTS,
      payload: res.data
    });
  };
  const Fetch_one_company = async id => {
    const res = await Axios.get(
      `http://1690550.masgroup.web.hosting-test.net/api/companies/` + id,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );

    console.log(res.data);
    dispatch({
      type: FETCH_ONE_COMPANY,
      payload: res.data
    });
  };
  const delete_favorite = async (id,type) => {
    const res = await Axios.delete(
      `http://1690550.masgroup.web.hosting-test.net/api/favorites?obj_type=${type}&obj_id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );
    Fetch_data_persons();
    console.log(res.data);
    Fetch_data_favorite();
    dispatch({
      type: DELETE_FAVORITE
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
  const delete_company = async id => {
    await Axios.delete(
      "http://1690550.masgroup.web.hosting-test.net/api/companies/" + id,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );
    Fetch_data_сompany();

    dispatch({
      type: DELETE_COMPANY
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
  const Update_persons = async (values, id) => {
    const res = await Axios.put(
      `http://1690550.masgroup.web.hosting-test.net/api/persons/${id}?firstname=&lastname=&telephone=&email=&birth_date=&birth_time=&timezone=&latitude=&longtitude=&city=&image=`,
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
      type: UPDATE_PERSONS,
      add_update_json: res.data
    });
    console.log(res);
  };

  const Add_persons = async values => {
    const res = await Axios.post(
      "http://1690550.masgroup.web.hosting-test.net/api/persons/?firstname=&lastname=&telephone=&email=&birth_date=&birth_time=&timezone=&latitude=&longtitude=&city=&image=",
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

  const Add_favorite = async (type, id) => {
    const res = await Axios.post(
      "http://1690550.masgroup.web.hosting-test.net/api/favorites?obj_type=&obj_id=",
      {
        obj_type: type,
        obj_id: id
      },
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );
    dispatch({
      type: ADD_FAVORITE,
      add_favortie_json: res.data
    });
    console.log(res);
  };
  const Update_company = async (values, id) => {
    const res = await Axios.put(
      `http://1690550.masgroup.web.hosting-test.net/api/companies/${id}?name&telephone&email&birth_date&birth_time&timezone&latitude&longtitude&city&image&osnovatel&cnt_workers`,
      {
        name: values.name,
        osnovatel: values.osnovatel,
        email: values.email,
        telephone: values.telephone,
        birth_date: values.birth_date,
        birth_time: values.time,
        timezone: parseInt(values.timezone.replace(/\D+/g, "")),
        longtitude: parseInt(values.longitude.replace(/\D+/g, "")),
        latitude: parseInt(values.latitude.replace(/\D+/g, "")),
        city: values.city,
        cnt_workers: parseInt(values.cnt_workers.replace(/\D+/g, "")),
        image: "asd"
      },
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );
    dispatch({
      type: UPDATE_COMPANY,
      add_company_json: res.data
    });
    console.log(res);
  };
  const Update_events = async (values, id) => {
    const res = await Axios.put(
      `http://1690550.masgroup.web.hosting-test.net/api/events/${id}?name&description&event_date&event_time&timezone&latitude&longtitude&city`,
      {
        name: values.name,
        description: values.description,
        email: values.email,
        telephone: values.telephone,
        event_date: values.event_date,
        event_time: values.event_time,
        timezone: parseInt(values.timezone.replace(/\D+/g, "")),
        longtitude: parseInt(values.longitude.replace(/\D+/g, "")),
        latitude: parseInt(values.latitude.replace(/\D+/g, "")),
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
    const res = await Axios.post(
      "http://1690550.masgroup.web.hosting-test.net/api/events?name&description&event_date&event_time&timezone&latitude&longtitude&city",
      {
        name: values.name,
        description: values.description,
        email: values.email,
        telephone: values.telephone,
        event_date: values.event_date,
        event_time: values.event_time,
        timezone: parseInt(values.timezone.replace(/\D+/g, "")),
        longtitude: parseInt(values.longitude.replace(/\D+/g, "")),
        latitude: parseInt(values.latitude.replace(/\D+/g, "")),
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

  const Add_company = async values => {
    const res = await Axios.post(
      "http://1690550.masgroup.web.hosting-test.net/api/companies?name&telephone&email&birth_date&birth_time&timezone&latitude&longtitude&city&image&osnovatel&cnt_workers",
      {
        name: values.name,
        osnovatel: values.osnovatel,
        email: values.email,
        telephone: values.telephone,
        birth_date: values.birth_date,
        birth_time: values.time,
        timezone: parseInt(values.timezone.replace(/\D+/g, "")),
        longtitude: parseInt(values.longitude.replace(/\D+/g, "")),
        latitude: parseInt(values.latitude.replace(/\D+/g, "")),
        city: values.city,
        cnt_workers: parseInt(values.cnt_workers.replace(/\D+/g, "")),
        image: "asd"
      },
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );
    dispatch({
      type: ADD_COMPANY,
      add_company_json: res.data
    });
    console.log(res);
  };
  const number_all = async (numbers, links) => {
    dispatch({
      type: NUMBER_ALL,
      payload: {
        numbers: numbers,
        match: links
      }
    });
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
        Add_events,
        Update_company,
        Update_persons,
        Update_events,
        number_all,
        delete_company,
        delete_persons,
        delete_events,
        Add_company,
        Add_persons,
        delete_favorite,
        Fetch_data_events,
        Fetch_data_сompany,
        Fetch_data_favorite,
        Fetch_one_events,
        Fetch_one_persons,
        Fetch_one_company,
        Fetch_data_persons,
        SelectLocation,
        LogIn,
        LogOut,
        show,
        hide,
        Add_favorite,
        none: state
      }}
    >
      {children}
    </ReduceContext.Provider>
  );
};
