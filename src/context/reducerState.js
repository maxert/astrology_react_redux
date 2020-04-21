import React, { useReducer } from "react";
import { ReduceContext } from "./reducerContext";
import { AlertReducer } from "./reducer";
import manifest from ".././manifest.json";
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
  SEARCH_CITY,
  FETCH_NUMBER,
  PAGINATION_NUMBER,
  SEARCH_HOME,
  LOADING,
  SHOW_NOTAL_CARD,
  FETCH_DATA_FAVORITE_ORDER,
  WIDTH,
  FETCH_FAVORITE_LIST,
  FETCH_FAVORITE_ORDER,
  SEARCH_FAVORITE_LIST,
  ORDER_ALL,
  SAVE_DISPLAY_FAV,
  SELECT_FAVORITE_LIST,
  DELETE_FAVORITE_LIST,
  SAVEVALUE_FAV
} from "./types";
import Axios from "axios";

import { useAlert } from "react-alert";
import { useHistory } from "react-router";
export const ReducerState = ({ children }) => {
  const initialState = {
    isLoading: false,
    isLogin: localStorage.getItem("users") ? true : false,
    token: localStorage.getItem("users"),
    option_value: "0",
    data_favorite: null,
    data_fetch_links: null,
    data_notal_online: {
      type: "hour",
      interval: 1,
      interval_direction: 1,
    },
    select_fav: { link_id: "" },
    data_value: {
      value: [],
      isSearch: false,
    },
    value: "",
    pagination: 1,
    isOrder: true,
    isDisplayFav: false,
    data_favorite_search: [],
    data_fetch_value: [],
    data_value_home: [],
    data_value_select: [],
    data_link: "/api/companies",
    data_link_favorite: "/api/companies",
    width_mob: window.innerWidth,
  };
  const alert = useAlert();
  const CancelToken = Axios.CancelToken;
  const history = useHistory();
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  //Получение номера пагинации
  const pagination_number = (number) => {
    dispatch({
      type: PAGINATION_NUMBER,
      payload: number,
    });
  };

  //Загрузка
  const isLoading = (bool) => {
    dispatch({
      type: LOADING,
      payload: bool,
    });
  };

  //Залогиненый пользователь

  const LogIn = async (values) => {
    await Axios.post(manifest.URL + "/api/login", {
      email: values.email,
      password: values.password,
    })
      .then((res) => {
        localStorage.setItem("users", res.data.data.api_token);
        dispatch({
          type: LOG_IN,
          token: res.data.data.api_token,
        });
      })
      .catch((error) => {
        if (error.response.status === 401) {
          LogOut();
          alert.error("Некорректно введенны данные.");
        } else {
          console.log(error);
        }
      });
  };

  //Выбор Локации
  const SelectLocationNew = (value) => {
    dispatch({
      type: SELECT_LOCATION,
      payload: value,
    });
  };

  //Сортировка избранных
  const Fetch_data_favorite_order = (bool, data) => {
    isLoading(false);
    const payload = bool
      ? data.sort((a, b) =>
          a.firstname !== undefined
            ? a.firstname.localeCompare(b.firstname, "en-US")
            : a.name.localeCompare(b.name, "en-US"),
        )
      : data.sort((a, b) =>
          b.firstname !== undefined
            ? b.firstname.localeCompare(a.firstname, "en-US")
            : b.name.localeCompare(a.name, "en-US"),
        );
    setTimeout(() => {
      isLoading(true);
    }, 500);
    dispatch({ type: FETCH_DATA_FAVORITE_ORDER, payload });
  };

  //Загрузка избранных
  const Fetch_data_favorite = async (obj_type) => {
    await Axios.get(manifest.URL + `/api/favorites?obj_type=${obj_type}`, {
      headers: {
        Authorization: `Bearer ${initialState.token}`,
      },
    })
      .then((res) => {
        isLoading(true);
        dispatch({
          type: FETCH_DATA_FAVORITE,
          payload: res.data,
        });
      })
      .catch((error) => {
        error.response.status === 401 ? LogOut() : console.log(error);
      });
  };

  //Удаление с избранных
  const delete_favorite = async (id, type, id_pagination, order_by) => {
    await Axios.delete(
      manifest.URL + `/api/favorites?obj_type=${type}&obj_id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`,
        },
      },
    )
      .then((res) => {
        fetch_number();
        Fetch_data_favorite(type);
        dispatch({
          type: DELETE_FAVORITE,
        });
      })
      .catch((error) => {
        error.response.status === 401 ? LogOut() : console.log(error);
      });
  };
  //Мобильная версия ширина экрана
  const width_mobile = async () => {
    dispatch({
      type: WIDTH,
      payload: window.innerWidth,
    });
  };
  //Удаление Связей
  const delete_link = async (id, obj_type, obj_id) => {
    await Axios.delete(manifest.URL + `/api/links/${id}`, {
      headers: {
        Authorization: `Bearer ${initialState.token}`,
      },
    })
      .then((res) => {
        Fetch_links(obj_type, obj_id);
        alert.info("Связь удаленна");
        dispatch({
          type: DELETE_LINK,
        });
      })
      .catch((error) => {
        error.response.status === 401 ? LogOut() : console.log(error);
      });
  };

  //Добавить в избранные
  const Add_favorite = async (type, id, id_pagination, order_by) => {
    await Axios.post(
      manifest.URL + "/api/favorites",
      {
        obj_type: type,
        obj_id: id,
      },
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`,
        },
      },
    )
      .then((res) => {
        fetch_number();
        dispatch({
          type: ADD_FAVORITE,
        });
      })
      .catch((error) => {
        error.response.status === 401 ? LogOut() : console.log(error);
      });
  };

  //Поиск
  const search_data = async (type, value, url) => {
    await Axios.get(manifest.URL + `${type}?search=${value}`, {
      headers: {
        Authorization: `Bearer ${initialState.token}`,
      },
    })
      .then((res) => {
        const payload = Object.keys(res.data[Object.keys(res.data)[0]]).map(
          (key) => {
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
            };
          },
        );

        dispatch({
          type: SEARCH,
          payload: {
            value: payload,
          },
        });
      })
      .catch((error) => {
        error.response.status === 401 ? LogOut() : console.log(error);
      });
  };

  //Поиск по городам
  const search_data_city = async (value) => {
    await Axios.get(manifest.URL + `/api/custom/getcity?search=${value}`, {
      headers: {
        Authorization: `Bearer ${initialState.token}`,
      },
    })
      .then((res) => {
        const payload = Object.keys(res.data.predictions).map((key) => {
          return {
            id: res.data.predictions[key].id,
            title: res.data.predictions[key].description,
          };
        });

        dispatch({
          type: SEARCH_CITY,
          payload,
        });
      })
      .catch((error) => {
        error.response.status === 401 ? LogOut() : console.log(error);
      });
  };

  //Поиск по связям
  const search_data_links = async (type, value, url) => {
    await Axios.get(manifest.URL + `${type}?search=${value}`, {
      headers: {
        Authorization: `Bearer ${initialState.token}`,
      },
    })
      .then((res) => {
        const payload = Object.keys(res.data[Object.keys(res.data)[0]]).map(
          (key) => {
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
            };
          },
        );

        dispatch({
          type: SELECT_HOME,
          payload,
        });
      })
      .catch((error) => {
        error.response.status === 401 ? LogOut() : console.log(error);
      });
  };

  //Ссылки связей
  const add_type_links = (type, id) => {
    dispatch({
      type: ADD_TYPE_LINKS,
      payload: {
        type_link: type,
        type_id: id,
      },
    });
  };

  //Выбранная ссылка на выпадающем блоке
  const search_select = (type, id) => {
    dispatch({
      type: SEARCH_SELECT,
      payload: {
        type_link: type,
        type_id: id,
      },
    });
  };

  //Выбранная ссылка на избранных выпадающем блоке
  const favorite_select = (type, id) => {
    dispatch({
      type: FAVORITE_SELECT,
      payload: {
        type_link: type,
        type_id: id,
      },
    });
  };

  //Создание свзяей
  const create_links = async (value) => {
    await Axios.post(
      manifest.URL + `/api/links`,
      {
        obj_type: value.obj_type,
        obj_id: value.obj_id,
        link_obj_type: value.link_obj_type,
        link_obj_id: value.link_obj_id,
        name: value.name,
      },
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`,
        },
      },
    )
      .then((res) => {
        Fetch_links(value.obj_type, value.obj_id);
        alert.success("Связь созданна");
        dispatch({
          type: CREATE_LINKS,
          create_links: res.data,
        });
      })
      .catch((error) => {
        error.response.status === 401 ? LogOut() : console.log(error);

        if (error.response.status === 400) {
          alert.error("Связь уже существует");
        }
      });
  };

  //Создание Нотальной карты
  const createNotals = async (value) => {
    isLoading(false);
    await Axios.post(
      manifest.URL + `/api/natals/fast`,
      {
        date: value.date,
        time: value.time,
        lat: parseFloat(value.lat),
        lng: parseFloat(value.lng),
        timezone: value.timezone,
        letnee: parseInt(value.letnee),
      },
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`,
        },
      },
    )
      .then((res) => {
        dispatch({
          type: CREATE_NOTAL_HOME,
          payload: res.data,
        });
        isLoading(true);
      })
      .catch((error) => {
        error.response.status === 401 ? LogOut() : console.log(error);
      });
  };

  //Показать натальную карту в связях
  const show_notal_card = async (id, data, shownatal) => {
    await Axios.put(
      manifest.URL + `/api/links/` + id,
      {
        shownatal: shownatal,
      },
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`,
        },
      },
    )
      .then((res) => {
        const payload = data.map((items) => {
          if (items.id === id) {
            items.isDisplay = items.isDisplay === true ? false : true;
          }
          return items;
        });

        dispatch({
          type: SHOW_NOTAL_CARD,
          payload,
        });
      })
      .catch((error) => {
        error.response.status === 401 ? LogOut() : console.log(error);
      });
  };

  //Получение связей
  const Fetch_links = async (type, id) => {
    await Axios.get(manifest.URL + `/api/links?obj_type=${type}&obj_id=${id}`, {
      headers: {
        Authorization: `Bearer ${initialState.token}`,
      },
    })
      .then((res) => {
        const payload = Object.keys(res.data).map((key) => {
          return {
            ...res.data[key],
            isDisplay: res.data[key].shownatal === 0 ? false : true,
          };
        });

        dispatch({
          type: FETCH_LINKS,
          payload,
        });
      })
      .catch((error) => {
        if (error.response !== undefined) {
          error.response.status === 401 ? LogOut() : console.log(error);
        }
      });
  };

  //Номер сущености
  const number_all = (numbers, type) => {
    dispatch({
      type: NUMBER_ALL,
      payload: {
        numbers: numbers,
        match: type,
      },
    });
  };

  //Разлогинится
  const LogOut = () => {
    localStorage.removeItem("users");
    dispatch({
      type: LOG_OUT,
      token: null,
    });
  };

  //Получить боковые номера
  const fetch_number = async () => {
    await Axios.get(manifest.URL + `/api/custom/objcount`, {
      headers: {
        Authorization: `Bearer ${initialState.token}`,
      },
    })
      .then((res) => {
        dispatch({
          type: FETCH_NUMBER,
          payload: res.data,
        });
      })
      .catch((error) => {
        if (error.response !== undefined) {
          error.response.status === 401 ? LogOut() : console.log(error);
        }
      });
  };
  //Получить одного пользователя
  const Fetch_one_persons = async (id) => {
    isLoading(false);
    await Axios.get(manifest.URL + `/api/persons/` + id, {
      headers: {
        Authorization: `Bearer ${initialState.token}`,
      },
    })
      .then((res) => {
        setTimeout(() => {
          isLoading(true);
        }, 1500);

        dispatch({
          type: FETCH_ONE_PERSONS,
          payload: res.data,
        });
      })
      .catch((error) => {
        if (error.response !== undefined) {
          error.response.status === 401 ? LogOut() : history.push("/404");
        }
      });
  };

  //Получить одну событие
  const Fetch_one_events = async (id) => {
    isLoading(false);
    await Axios.get(manifest.URL + `/api/events/` + id, {
      headers: {
        Authorization: `Bearer ${initialState.token}`,
      },
    })
      .then((res) => {
        setTimeout(() => {
          isLoading(true);
        }, 1500);
        dispatch({
          type: FETCH_ONE_EVENTS,
          payload: res.data,
        });
      })
      .catch((error) => {
        error.response.status === 401 ? LogOut() : history.push("/404");
      });
  };

  //Получить одну компанию
  const Fetch_one_company = async (id) => {
    isLoading(false);
    await Axios.get(manifest.URL + `/api/companies/` + id, {
      headers: {
        Authorization: `Bearer ${initialState.token}`,
      },
    })
      .then((res) => {
        setTimeout(() => {
          isLoading(true);
        }, 1500);
        dispatch({
          type: FETCH_ONE_COMPANY,
          payload: res.data,
        });
      })
      .catch((error) => {
        if (error.response !== undefined) {
          error.response.status === 401 ? LogOut() : history.push("/404");
        }
      });
  };

  //Добавить нотальную карту
  const add_notal_card = async (type, id) => {
    await Axios.post(
      manifest.URL + `/api/natals`,
      {
        obj_type: type,
        obj_id: id,
      },
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`,
        },
      },
    )
      .then((res) => {
        dispatch({
          type: ADD_NOTAL_CARD,
          payload: res.data,
        });
        setTimeout(() => {
          isLoading(true);
        }, 500);

        alert.success("Натальная карта расчитанна");
      })
      .catch((error) => {
        error.response.status === 401 ? LogOut() : console.log(error);
        error.response.data.error.forEach((none) => {
          alert.error(none);
        });
      });
  };

  //Обновить нотальную карту
  const update_notal_card = async (id, bool) => {
    await Axios.put(
      manifest.URL + `/api/natals/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`,
        },
      },
    )
      .then((res) => {
        if (!bool) {
          alert.info("Натальная карта обновленна");
        }
        Fetch_notal_card(res.data.obj_type, res.data.obj_id);
        dispatch({
          type: UPDATE_PERSONS,
          payload: res.data,
        });
      })
      .catch((error) => {
        error.response.status === 401 ? LogOut() : console.log(error);
      });
  };

  //Получить нотальную карту
  const Fetch_notal_card = async (type, id) => {
    await Axios.get(
      manifest.URL + `/api/natals?obj_type=${type}&obj_id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`,
        },
      },
    )
      .then((response) => {
        setTimeout(() => {
          isLoading(true);
        }, 500);
        dispatch({
          type: FETCH_NOTAL_CARD,
          payload: response.data,
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          dispatch({
            type: FETCH_NOTAL_CARD,
            payload: undefined,
          });
        }
      });
  };

  //Поиск на главной странице
  const search_data_home = async (type, value, url) => {
    var bool = true;
    if (value.length === 0 || value === " ") {
      bool = false;
    }

    await Axios.get(manifest.URL + `${type}?search=${value}`, {
      headers: {
        Authorization: `Bearer ${initialState.token}`,
      },
    })
      .then((res) => {
        const payload = Object.keys(res.data[Object.keys(res.data)[0]]).map(
          (key) => {
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
              type_id: res.data[Object.keys(res.data)[0]][key].id,
            };
          },
        );

        dispatch({
          type: SEARCH_HOME,
          payload: {
            value: payload,
            isSearch: bool,
          },
        });
      })
      .catch((error) => {
        error.response.status === 401 ? LogOut() : console.log(error);
      });
  };

  //Онлайн натальная карта
  let cancel;
  const online_card = (int_d, int_type, int, refresh, isc) => {
    cancel && cancel();

    Axios.get(
      manifest.URL +
        `/api/natals/online?refresh=${refresh}&interval=${int}&interval_type=${int_type}&interval_direction=${int_d}`,
      {
        cancelToken: new CancelToken(function executor(c) {
          cancel = c;
        }),
        headers: {
          Authorization: `Bearer ${initialState.token}`,
        },
      },
    )

      .then((res) => {
        dispatch({
          type: ONLINE_CARD,
          payload: res.data,
        });
      })
      .catch((error) => {
        error.response !== undefined
          ? error.response.status === 401
            ? LogOut()
            : console.log(error)
          : console.log(error);
      });
  };
  //Получить список избранных
  const Fetch_favorite_list = async (obj_type) => {
    isLoading(false);
    await Axios.get(manifest.URL + `/api/favorites?obj_type=${obj_type}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("users")}`,
      },
    })
      .then((res) => {
        const payload = Object.keys(res.data).map((key, i) => {
          return {
            ...res.data[key],
            id_title: i,
            title:
              res.data[key].firstname !== undefined
                ? res.data[key].firstname + " " + (res.data[key].lastname!==null?res.data[key].lastname:"")
                : res.data[key].name,
          };
        });
        isLoading(true);
        dispatch({
          type: FETCH_FAVORITE_LIST,
          payload,
        });
      })
      .catch((error) => {
        if (error.response !== undefined) {
          error.response.status === 401 ? LogOut() : console.log(error);
        }
      });
  };

  //Сортировка в избранных
  const Fetch_favorite_order = (bool, data) => {
    isLoading(false);
    const payload = bool
      ? data.sort((a, b) =>
          a.firstname !== undefined
            ? a.firstname.localeCompare(b.firstname, "en-US")
            : a.name.localeCompare(b.name, "en-US"),
        )
      : data.sort((a, b) =>
          b.firstname !== undefined
            ? b.firstname.localeCompare(a.firstname, "en-US")
            : b.name.localeCompare(a.name, "en-US"),
        );
    setTimeout(() => {
      isLoading(true);
    }, 500);
    dispatch({ type: FETCH_FAVORITE_ORDER, payload });
  };
  //Избранные поиск
  const search_favorite_list = async (value, data, bool, type_link) => {

    if (bool) {
      await Axios.get(
        manifest.URL + `/api/favorites?obj_type=${type_link}&search=` + value,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("users")}`,
          },
        },
      )
        .then((res) => {
          const payloads = Object.keys(res.data).map((key, i) => {
            return {
              ...res.data[key],
              id_title: i,
              title:
                res.data[key].firstname !== undefined
                  ? res.data[key].firstname + " " + (res.data[key].lastname!==null?res.data[key].lastname:"")
                  : res.data[key].name,
            };
          });

          const filter = payloads.filter((user) => {
            return user.title.includes(value);
          });

          filter.sort((a, b) =>
            a.firstname !== undefined
              ? a.firstname.localeCompare(b.firstname, "en-US")
              : a.name.localeCompare(b.name, "en-US"),
          );
          dispatch({
            type: FETCH_FAVORITE_LIST,
            payload: filter,
          });

          dispatch({
            type: SEARCH_FAVORITE_LIST,
            payload: filter,
          });
          isLoading(true);
        })
        .catch((error) => {
          if (error.response !== undefined) {
            error.response.status === 401 ? LogOut() : console.log(error);
          }
        });
    } else {
      Fetch_favorite_list(type_link);
    }
  };

  const Order_all = (bool) => {
    dispatch({
      type: ORDER_ALL,
      payload: bool,
    });
  };

  const setDisplayFav = (bool) => {
    dispatch({
      type: SAVE_DISPLAY_FAV,
      payload: bool,
    });
  };
  const select_favorite_list = async (link_id, type_link) => {
    dispatch({
      type: SELECT_FAVORITE_LIST,
      payload: {
        link_id: link_id,
        type_link: type_link,
      },
    });
  };
    //Удалить из избранных
    const delete_favorite_list = async (id, type, data) => {
      await Axios.delete(
        manifest.URL + `/api/favorites?obj_type=${type}&obj_id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("users")}`,
          },
        },
      )
        .then((res) => {
          const payload = data.filter((i) => i.id !== id);
          fetch_number();
          dispatch({ type: DELETE_FAVORITE_LIST, payload });
        })
        .catch((error) => {
          error.response.status === 401 ? LogOut() : console.log(error);
        });
    };


    const saveValue = (value) => {
      dispatch({
        type: SAVEVALUE_FAV,
        payload: value,
      });
    };
  
  return (
    <ReduceContext.Provider
      value={{
        saveValue,
        delete_favorite_list,
        select_favorite_list,
        setDisplayFav,
        Order_all,
        search_data_city,
        search_favorite_list,
        Fetch_favorite_order,
        Fetch_favorite_list,
        width_mobile,
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
        Fetch_data_favorite_order,
        SelectLocationNew,
        search_data,
        search_data_links,
        create_links,
        Fetch_links,
        LogIn,
        LogOut,
        Add_favorite,
        favorite_select,
        update_notal_card,
        fetch_number,
        pagination_number,
        isLoading,
        search_data_home,
        none: state,
      }}>
      {children}
    </ReduceContext.Provider>
  );
};
