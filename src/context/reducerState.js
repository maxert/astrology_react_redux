import React, { useReducer } from "react";
import { ReduceContext } from "./reducerContext";
import { AlertReducer } from "./reducer";
import Geocode from "react-geocode";

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
  CREATE_NOTAL_HOME,
  ONLINE_CARD,
  GEOLOCATION,
  SEARCH_CITY,
  FETCH_NUMBER,
  PAGINATION_NUMBER,
  SEARCH_HOME,
  SORTED,
  LOADING,
  URL_BACK,
  SHOW_NOTAL_CARD
} from "./types";
import Axios from "axios";

import { useAlert } from "react-alert";
export const ReducerState = ({ children }) => {
  const initialState = {
    isLoading: false,
    isLogin: localStorage.getItem("users") ? true : false,
    token: localStorage.getItem("users"),
    option_value: "0",
    data_favorite: null,
    data_fetch_links: null,
    sorted: "asc",
    data_notal_online: {
      type: "hour",
      interval: 1,
      interval_direction: 1
    },
    data_value: {
      value: [],
      isSearch: false
    },
    pagination: 1,
    data_fetch_value: [],
    data_value_home: [],
    data_value_select: [],
    data_link: "/api/companies",
    data_link_favorite: "/api/companies"
  };
  const alert = useAlert();
  const [state, dispatch] = useReducer(AlertReducer, initialState);
  const pagination_number = number => {
    dispatch({
      type: PAGINATION_NUMBER,
      payload: number
    });
  };
  const isLoading = bool => {
    dispatch({
      type: LOADING,
      payload: bool
    });
  };
  const urlBack = url => {
    dispatch({
      type: URL_BACK,
      payload: url
    });
  };
  const LogIn = async values => {
    await Axios.post("http://1690550.masgroup.web.hosting-test.net/api/login", {
      email: values.email,
      password: values.password
    })
      .then(res => {
        localStorage.setItem("users", res.data.data.api_token);
        dispatch({
          type: LOG_IN,
          token: res.data.data.api_token
        });
      })
      .catch(error => {
        if (error.response.status === 401) {
          LogOut();
          alert.error("Некорректно введенны данные.");
        } else {
          console.log(error);
        }
      });
  };
  const SelectLocationNew = value => {
    dispatch({
      type: SELECT_LOCATION,
      payload: value
    });
  };

  const Fetch_data_favorite = async obj_type => {
    const res = await Axios.get(
      `http://1690550.masgroup.web.hosting-test.net/api/favorites?obj_type=${obj_type}`,
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

  const Order_by = order_by => {
    dispatch({
      type: SORTED,
      payload: order_by
    });
  };
  const delete_favorite = async (id, type, id_pagination, order_by) => {
    const res = await Axios.delete(
      `http://1690550.masgroup.web.hosting-test.net/api/favorites?obj_type=${type}&obj_id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );
    fetch_number();
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
    alert.info("Связь удаленна");
    dispatch({
      type: DELETE_LINK
    });
  };
  const Add_favorite = async (type, id, id_pagination, order_by) => {
    const res = await Axios.post(
      "http://1690550.masgroup.web.hosting-test.net/api/favorites",
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
    fetch_number();
    dispatch({
      type: ADD_FAVORITE
    });
  };

  const search_data = async (type, value, url) => {
    const res = await Axios.get(
      `http://1690550.masgroup.web.hosting-test.net${type}?search=${value}`,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );

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
      payload: {
        value: payload
      }
    });
  };

  const search_data_city = async value => {
    const res = await Axios.get(
      `http://1690550.masgroup.web.hosting-test.net/api/custom/getcity?search=${value}`,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );

    const payload = Object.keys(res.data.predictions).map(key => {
      return {
        id: res.data.predictions[key].id,
        title: res.data.predictions[key].description
      };
    });

    dispatch({
      type: SEARCH_CITY,
      payload
    });
  };

  const search_data_links = async (type, value, url) => {
    const res = await Axios.get(
      `http://1690550.masgroup.web.hosting-test.net${type}?search=${value}`,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );

    const payload = Object.keys(res.data[Object.keys(res.data)[0]]).map(key => {
      return {
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
    console.log(payload);

    dispatch({
      type: SELECT_HOME,
      payload
    });
  };

  const add_type_links = (type, id) => {
    dispatch({
      type: ADD_TYPE_LINKS,
      payload: {
        type_link: type,
        type_id: id
      }
    });
  };
  const search_select = (type, id) => {
    dispatch({
      type: SEARCH_SELECT,
      payload: {
        type_link: type,
        type_id: id
      }
    });
  };

  const favorite_select = (type, id) => {
    dispatch({
      type: FAVORITE_SELECT,
      payload: {
        type_link: type,
        type_id: id
      }
    });
  };

  const create_links = async value => {
    await Axios.post(
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
    )
      .then(res => {
        Fetch_links(value.obj_type, value.obj_id);
        alert.success("Связь созданна");
        dispatch({
          type: CREATE_LINKS,
          create_links: res.data
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  const createNotals = async value => {
    isLoading(false);
    console.log(value);
    debugger;
    const res = await Axios.post(
      `http://1690550.masgroup.web.hosting-test.net/api/natals/fast`,
      {
        date: value.date,
        time: value.time,
        lat: parseFloat(value.lat),
        lng: parseFloat(value.lng),
        timezone: value.timezone,
        letnee: parseInt(value.letnee)
      },
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );

    dispatch({
      type: CREATE_NOTAL_HOME,
      payload: res.data
    });
    isLoading(true);
  };
  const show_notal_card = (id, data) => {
    const payload = data.map(items => {
      if (items.id === id) {
        items.isDisplay = items.isDisplay === false ? true : false;
      }
      return items;
    });

    dispatch({
      type: SHOW_NOTAL_CARD,
      payload
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
    const payload = Object.keys(res.data).map(key => {
      return {
        ...res.data[key],
        isDisplay: res.data[key].natal === null ? null : false
      };
    });
    console.log(payload);

    dispatch({
      type: FETCH_LINKS,
      payload
    });
  };
  const number_all = (numbers, type) => {
    dispatch({
      type: NUMBER_ALL,
      payload: {
        numbers: numbers,
        match: type
      }
    });
  };
  const LogOut = () => {
    localStorage.removeItem("users");
    dispatch({
      type: LOG_OUT,
      token: null
    });
  };

  const fetch_number = async () => {
    // console.log(stateNew.getState())
    await Axios.get(
      `http://1690550.masgroup.web.hosting-test.net/api/custom/objcount`,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    )
      .then(res => {
        dispatch({
          type: FETCH_NUMBER,
          payload: res.data
        });
      })
      .catch(error => {
        error.response.status === 401 ? LogOut() : console.log(error);
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
    await Axios.post(
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
    )
      .then(res => {
        dispatch({
          type: ADD_NOTAL_CARD,
          payload: res.data
        });
        isLoading(false);
        alert.success("Натальная карта созданна");
      })
      .catch(error => {
        error.response.data.error.forEach(none => {
          alert.error(none);
        });
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
    alert.info("Натальная карта обновленна");
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
        setTimeout(() => {
          isLoading(true);
        }, 500);
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
  };
  const search_data_home = async (type, value, url) => {
    var bool = true;
    if (value.length === 0 || value === " ") {
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

    const payload = Object.keys(res.data[Object.keys(res.data)[0]]).map(key => {
      return {
        id: res.data[Object.keys(res.data)[0]][key].id,
        title:
          res.data[Object.keys(res.data)[0]][key].name === undefined
            ? res.data[Object.keys(res.data)[0]][key].firstname +
              " " +
              (res.data[Object.keys(res.data)[0]][key].lastname !== null
                ? res.data[Object.keys(res.data)[0]][key].lastname
                : "")
            : res.data[Object.keys(res.data)[0]][key].name,
        content: url,
        type_id: res.data[Object.keys(res.data)[0]][key].id
      };
    });

    dispatch({
      type: SEARCH_HOME,
      payload: {
        value: payload,
        isSearch: bool
      }
    });
  };

  const online_card = async (int_d, int_type, int, refresh) => {
    await Axios.get(
      `http://1690550.masgroup.web.hosting-test.net/api/natals/online?refresh=${refresh}&interval=${int}&interval_type=${int_type}&interval_direction=${int_d}`,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    ).then(res => {
      console.log(res.data);
      dispatch({
        type: ONLINE_CARD,
        payload: res.data
      });
    });
  };

  const geolocation = city => {
    const API = "AIzaSyA8N9Pn8cR6kKibSWGXkY4e9saEvPv-Z-U";
    Geocode.setApiKey(API);
    Geocode.setLanguage("ru");
    Geocode.fromAddress(city).then(
      async response => {
        const res = await Axios.get(
          `https://maps.googleapis.com/maps/api/timezone/json?location=${
            response.results[0].geometry.location.lat
          },${response.results[0].geometry.location.lng}&timestamp=${parseInt(
            Date.now() / 1000
          )}&key=${API}`
        );
        console.log(res);
        SelectLocationNew(parseInt(res.data.rawOffset / 3600));
        SelectLocationNew(parseInt(res.data.rawOffset / 3600));
        localStorage.setItem("city", city);
        dispatch({
          type: GEOLOCATION,
          payload: {
            city: city,
            location: response.results[0].geometry.location,
            timezone: parseInt(res.data.rawOffset / 3600),
            letnee: res.data.dstOffset > 0 ? true : false
          }
        });
      },
      error => console.log(error)
    );
  };
  return (
    <ReduceContext.Provider
      value={{
        search_data_city,
        geolocation,
        createNotals,
        Fetch_one_company,
        online_card,
        Fetch_one_persons,
        Fetch_notal_card,
        add_notal_card,
        Fetch_one_events,
        add_type_links,
        number_all,
        search_select,
        show_notal_card,
        delete_link,
        delete_favorite,
        Fetch_data_favorite,
        SelectLocationNew,
        search_data,
        search_data_links,
        create_links,
        Fetch_links,
        LogIn,
        LogOut,
        urlBack,
        Add_favorite,
        favorite_select,
        update_notal_card,
        fetch_number,
        pagination_number,
        Order_by,
        isLoading,
        search_data_home,
        none: state
      }}
    >
      {children}
    </ReduceContext.Provider>
  );
};
