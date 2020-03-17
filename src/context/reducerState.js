import React, { useReducer } from "react";
import { ReduceContext } from "./reducerContext";
import { AlertReducer } from "./reducer";

import {
  LOG_OUT,
  LOG_IN,
  SELECT_LOCATION,
  NUMBER_ALL,
  ADD_FAVORITE,
  FETCH_DATA_FAVORITE,
  DELETE_FAVORITE,
  SEARCH,
  SEARCH_SELECT,
  CREATE_LINKS,
  FETCH_LINKS,
  ADD_TYPE_LINKS,
  FETCH_ONE_PERSONS,
  FETCH_ONE_EVENTS,
  FETCH_ONE_COMPANY,
  DELETE_LINK,
  FETCH_NOTAL_CARD,
  FAVORITE_SELECT,
  SELECT_HOME,
  ADD_NOTAL_CARD,
  UPDATE_PERSONS,
  CREATE_NOTAL_HOME
} from "./types";
import Axios from "axios";

export const ReducerState = ({ children }) => {
  const initialState = {
    isLogin: localStorage.getItem("users") !== "null" ? true : false,
    token: localStorage.getItem("users"),
    option_value: "GMT+2",
    data_favorite: null,
    data_fetch_links: null,
    number_all: "",
    data_value: {
      value: [],
      isSearch: false
    },
    data_fetch_value:[],
    data_value_select: [],
    data_link: "/api/companies",
    data_link_favorite: "/api/companies"
  };
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const LogIn = async values => {
    const res = await Axios.post(
      "http://1690550.masgroup.web.hosting-test.net/api/login",
      {
        email: values.email,
        password: values.password
      }
    );

    localStorage.setItem("users", res.data.data.api_token);
    dispatch({
      type: LOG_IN,
      token: res.data.data.api_token
    });
  };
  const SelectLocation = async value => {
    dispatch({
      type: SELECT_LOCATION,
      payload: value
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

    dispatch({
      type: FETCH_DATA_FAVORITE,
      payload: res.data
    });
  };

  const delete_favorite = async (id, type) => {
    const res = await Axios.delete(
      `http://1690550.masgroup.web.hosting-test.net/api/favorites?obj_type=${type}&obj_id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );
    Fetch_data_favorite();
    dispatch({
      type: DELETE_FAVORITE
    });
  };
  const delete_link = async (id, obj_type, obj_id) => {
    const res = await Axios.delete(
      `http://1690550.masgroup.web.hosting-test.net/api/links/${id}`,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );
    Fetch_links(obj_type, obj_id);
    dispatch({
      type: DELETE_LINK
    });
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
  };

  const search_data = async (type, value, url) => {
    var bool = true;
    if (value.length === 0 || value === " ") {
      value = "a";
      bool = false;
    }

    const res = await Axios.get(
      `http://1690550.masgroup.web.hosting-test.net${type}?search=${value}`,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );
    const payload = Object.keys(res.data.persons).map(key => {
      return {
        ...res.data.persons[key],
        id: res.data.persons[key].id,
        title:
          res.data.persons[key].name === undefined
            ? res.data.persons[key].firstname +
              " " +
              res.data.persons[key].lastname
            : res.data.persons[key].name,
        content: url,
        type_id: res.data.persons[key].id
      };
    });

    dispatch({
      type: SEARCH,
      payload: {
        value: payload,
        isSearch: bool
      }
    });
  };
  const search_data_links = async (type, value, url) => {
    if (value.length === 0 || value === " ") {
      value = "a";
    }
   
    const res = await Axios.get(
      `http://1690550.masgroup.web.hosting-test.net${type}?search=${value}`,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );
    const payload = Object.keys(res.data.persons).map(key => {
      return {
        id: res.data.persons[key].id,
        title:
          res.data.persons[key].name === undefined
            ? res.data.persons[key].firstname +
              " " +
              res.data.persons[key].lastname
            : res.data.persons[key].name
      };
    });

    dispatch({
      type: SELECT_HOME,
      payload
    });
  };

  const add_type_links = async (type, id) => {
    dispatch({
      type: ADD_TYPE_LINKS,
      payload: {
        type_link: type,
        type_id: id
      }
    });
  };
  const search_select = async (type, id) => {
    dispatch({
      type: SEARCH_SELECT,
      payload: {
        type_link: type,
        type_id: id
      }
    });
  };

  const favorite_select = async (type, id) => {
    dispatch({
      type: FAVORITE_SELECT,
      payload: {
        type_link: type,
        type_id: id
      }
    });
  };

  const create_links = async value => {
 
    const res = await Axios.post(
      `http://1690550.masgroup.web.hosting-test.net/api/links?obj_type&obj_id&link_obj_type=&link_obj_id=&name=`,
      {
        obj_type: value.obj_type,
        obj_id: value.obj_id,
        link_obj_type: value.link_obj_type,
        link_obj_id: value.link_obj_id,
        name: value.name
      },
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );
    Fetch_links(value.obj_type, value.obj_id);
    dispatch({
      type: CREATE_LINKS,
      create_links: res.data
    });
  };

  const createNotals = async value => {
    var time = value.timezone.match(/[+-]?[0-9]+(.[0-9]+)?/g);
    const res = await Axios.post(
      `http://1690550.masgroup.web.hosting-test.net/api/natals/fast`,
      {
        date: value.date,
        time: value.time,
        lat:  parseFloat(value.lat),
        lng: parseFloat(value.lng),
        timezone: time[0],
        letnee: parseInt(value.letnee)
      },
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );
    console.log(res.data);
    dispatch({
      type:CREATE_NOTAL_HOME,
      payload:res.data
    });
  };
  
  const Fetch_links = async (type, id) => {
    const res = await Axios.get(
      `http://1690550.masgroup.web.hosting-test.net/api/links?obj_type=${type}&obj_id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );
    dispatch({
      type: FETCH_LINKS,
      payload: res.data
    });
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
  const Fetch_one_persons = async id => {
    const res = await Axios.get(
      `http://1690550.masgroup.web.hosting-test.net/api/persons/` + id,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );
    add_type_links(res.data.type, res.data.id);
    Fetch_notal_card(res.data.type, res.data.id);
    Fetch_links(res.data.type, res.data.id);

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
    add_type_links(res.data.type, res.data.id);
    Fetch_notal_card(res.data.type, res.data.id);
    Fetch_links(res.data.type, res.data.id);
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
    add_type_links(res.data.type, res.data.id);
    Fetch_notal_card(res.data.type, res.data.id);
    Fetch_links(res.data.type, res.data.id);
    dispatch({
      type: FETCH_ONE_COMPANY,
      payload: res.data
    });
  };

  const add_notal_card = async (type, id) => {
    const res = await Axios.post(
      `http://1690550.masgroup.web.hosting-test.net/api/natals`,
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
    console.log(res.data.data);
 
    dispatch({
      type: ADD_NOTAL_CARD,
      payload: res.data
    });
  };

  const update_notal_card = async id => {
    const res = await Axios.put(
      `http://1690550.masgroup.web.hosting-test.net/api/natals/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );
    Fetch_notal_card(res.data.obj_type, res.data.obj_id);
    dispatch({
      type: UPDATE_PERSONS,
      payload: res.data
    });
  };
  const Fetch_notal_card = async (type, id) => {
    await Axios.get(
      `http://1690550.masgroup.web.hosting-test.net/api/natals?obj_type=${type}&obj_id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    ).then(
      response => {
        dispatch({
          type: FETCH_NOTAL_CARD,
          payload: response.data
        });
        
      },
      error => {
      
        if (error.response.status === 404) {
          dispatch({
            type: FETCH_NOTAL_CARD,
            payload: undefined
          });
        }
      }
    );
    // dispatch({
    //   type: FETCH_NOTAL_CARD,
    //   payload: res.data
    // });
  };
  return (
    <ReduceContext.Provider
      value={{
        createNotals,
        Fetch_one_company,
        Fetch_one_persons,
        Fetch_notal_card,
        add_notal_card,
        Fetch_one_events,
        add_type_links,
        number_all,
        search_select,
        delete_link,
        delete_favorite,
        Fetch_data_favorite,
        SelectLocation,
        search_data,
        search_data_links,
        create_links,
        Fetch_links,
        LogIn,
        LogOut,
        Add_favorite,
        favorite_select,
        update_notal_card,
        none: state
      }}
    >
      {children}
    </ReduceContext.Provider>
  );
};
