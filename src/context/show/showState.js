import React, { useReducer, useContext } from "react";
import {
  SHOW_ELEMENT,
  HIDE_ELEMENT,
  SEARCH_BOOL,
  SEARCH_DELETE,
  SEARCH,
  SEARCH_ADD_FAVORITE,
  SEARCH_DELETE_FAVORITE,
  SEARCH_SORT,
  SEARCH_SORT_FAVORITE,
  FETCH_FAVORITE_LIST,
  FETCH_FAVORITE_ORDER,
  DELETE_FAVORITE_LIST,
  SEARCH_SORT_FAV_DATE,
  SEARCH_FAVORITE_LIST,
  SELECT_FAVORITE_LIST
} from "../types";
import { ShowContext } from "./showContext";
import { ShowReducer } from "./showReducer";
import Axios from "axios";
import manifest from "../../manifest";
import { ReduceContext } from "../reducerContext";

export const ShowState = ({ children }) => {
  const initialState = {
    visible: false,
    isSearch: false,
    data_value: [],
    select_fav: { link_id: "" }
  };

  const [state, dispatch] = useReducer(ShowReducer, initialState);
  const { isLoading, fetch_number, LogOut } = useContext(ReduceContext);

  //Показать блок
  const show = (text, type = "warning") => {
    dispatch({
      type: SHOW_ELEMENT,
      visible: true
    });
  };
  //Скрыть блок
  const hide = () => {
    dispatch({ type: HIDE_ELEMENT, visible: false });
  };

  //Блок поиск(сортировка избранных)
  const search_sort_fav_data = (bool, data, eventSort) => {
    if (eventSort) {
      let payload = !bool
        ? data.sort(
            (a, b) =>
              a.event_date !== undefined &&
              a.event_date.localeCompare(b.event_date, "en-US")
          )
        : data.sort(
            (a, b) =>
              b.event_date !== undefined &&
              b.event_date.localeCompare(a.event_date, "en-US")
          );
      payload = data.filter(i => i.isfav !== 0);
      dispatch({ type: SEARCH_SORT_FAV_DATE, payload });
    } else {
      let payload = bool
        ? data.sort((a, b) =>
            a.firstname !== undefined
              ? a.firstname.localeCompare(b.firstname, "en-US")
              : a.name.localeCompare(b.name, "en-US")
          )
        : data.sort((a, b) =>
            b.firstname !== undefined
              ? b.firstname.localeCompare(a.firstname, "en-US")
              : b.name.localeCompare(a.name, "en-US")
          );
      payload = data.filter(i => i.isfav !== 0);
      dispatch({ type: SEARCH_SORT_FAV_DATE, payload });
    }
  };

  //Блок поиск(сортировка избранных) переключение
  const search_sort_favorite = (bool, data) => {
    if (bool) {
      const payload = data.filter(i => i.isfav !== 0);
      dispatch({ type: SEARCH_SORT_FAVORITE, payload });
    } else {
      dispatch({ type: SEARCH_SORT_FAVORITE, payload: data });
    }
  };

  //Блок поиск(сортировка избранных по возрастанию и убыванию) переключение
  const search_sort = (bool, data) => {
    const payload = bool
      ? data.sort((a, b) =>
          a.firstname !== undefined
            ? a.firstname.localeCompare(b.firstname, "en-US")
            : a.name.localeCompare(b.name, "en-US")
        )
      : data.sort((a, b) =>
          b.firstname !== undefined
            ? b.firstname.localeCompare(a.firstname, "en-US")
            : b.name.localeCompare(a.name, "en-US")
        );
    dispatch({ type: SEARCH_SORT, payload });
  };
  const search_bool = bool => {
    dispatch({ type: SEARCH_BOOL, payload: bool });
  };
  const select_favorite_list = async (link_id, type_link) => {
    dispatch({
      type: SELECT_FAVORITE_LIST,
      payload: {
        link_id: link_id,
        type_link: type_link
      }
    });
  };

  //Избранные поиск
  const search_favorite_list = async (value, data, bool, type_link) => {
    if (bool) {
      const payload = data.filter(user => {
        return user.title.includes(value);
      });
      payload.sort((a, b) =>
        a.firstname !== undefined
          ? a.firstname.localeCompare(b.firstname, "en-US")
          : a.name.localeCompare(b.name, "en-US")
      );
      dispatch({
        type: SEARCH_FAVORITE_LIST,
        payload
      });
    } else {
      Fetch_favorite_list(type_link);
    }
  };

  //Получить список избранных
  const Fetch_favorite_list = async obj_type => {
    isLoading(false);
    await Axios.get(manifest.URL + `/api/favorites?obj_type=${obj_type}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("users")}`
      }
    })
      .then(res => {
        const payload = Object.keys(res.data).map((key, i) => {
          return {
            ...res.data[key],
            id_title: i,
            title:
              res.data[key].firstname !== undefined
                ? res.data[key].firstname + " " + res.data[key].lastname
                : res.data[key].name
          };
        });
        isLoading(true);
        dispatch({
          type: FETCH_FAVORITE_LIST,
          payload
        });
      })
      .catch(error => {
        error.response.status === 401 ? LogOut() : console.log(error);
      });
  };

  //Сортировка в избранных
  const Fetch_favorite_order = (bool, data) => {
    isLoading(false);
    const payload = bool
      ? data.sort((a, b) =>
          a.firstname !== undefined
            ? a.firstname.localeCompare(b.firstname, "en-US")
            : a.name.localeCompare(b.name, "en-US")
        )
      : data.sort((a, b) =>
          b.firstname !== undefined
            ? b.firstname.localeCompare(a.firstname, "en-US")
            : b.name.localeCompare(a.name, "en-US")
        );
    setTimeout(() => {
      isLoading(true);
    }, 500);
    dispatch({ type: FETCH_FAVORITE_ORDER, payload });
  };

  //Поиск(Добавить в избранное)
  const search_add_favorite = async (id, type, data) => {
    await Axios.post(
      manifest.URL + `/api/favorites`,
      {
        obj_type: type,
        obj_id: id
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("users")}`
        }
      }
    )
      .then(res => {
        fetch_number();
        const payload = data.map(Items => {
          if (Items.id === id) {
            Items.isfav = 1;
          }
          return Items;
        });
        dispatch({ type: SEARCH_ADD_FAVORITE, payload });
      })
      .catch(error => {
        error.response.status === 401 ? LogOut() : console.log(error);
      });
  };

  //Удалить из избранных
  const delete_favorite_list = async (id, type, data) => {
    await Axios.delete(
      manifest.URL + `/api/favorites?obj_type=${type}&obj_id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("users")}`
        }
      }
    )
      .then(res => {
        const payload = data.filter(i => i.id !== id);
        fetch_number();
        dispatch({ type: DELETE_FAVORITE_LIST, payload });
      })
      .catch(error => {
        error.response.status === 401 ? LogOut() : console.log(error);
      });
  };

  //Поиск(Удалить из избранных)
  const search_delete_favorite = async (id, type, data, fav) => {
    await Axios.delete(
      manifest.URL + `/api/favorites?obj_type=${type}&obj_id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("users")}`
        }
      }
    )
      .then(res => {
        fetch_number();
        const payload = data.map(Items => {
          if (Items.id === id) {
            Items.isfav = 0;
          }
          return Items;
        });
        dispatch({ type: SEARCH_DELETE_FAVORITE, payload });
      })
      .catch(error => {
        error.response.status === 401 ? LogOut() : console.log(error);
      });
  };

  //Поиск(Удалить сущность избранное)
  const search_delete = async (id, type, data) => {
    await Axios.delete(manifest.URL + `${type}/` + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("users")}`
      }
    })
      .then(res => {
        fetch_number();
        const payload = data.filter(i => i.id !== id);
        dispatch({ type: SEARCH_DELETE, payload });
      })
      .catch(error => {
        error.response.status === 401 ? LogOut() : console.log(error);
      });
  };

  //Поиск список
  const search_data = async (type, value, url) => {
    await Axios.get(manifest.URL + `${type}?search=${value}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("users")}`
      }
    })
      .then(res => {
        const payload = Object.keys(res.data[Object.keys(res.data)[0]]).map(
          key => {
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
                  : res.data[Object.keys(res.data)[0]][key].name,
              isfav:
                res.data[Object.keys(res.data)[0]][key].fav === null ? 0 : 1
            };
          }
        );
        payload.sort((a, b) =>
          a.firstname !== undefined
            ? a.firstname.localeCompare(b.firstname, "en-US")
            : a.name.localeCompare(b.name, "en-US")
        );

        dispatch({
          type: SEARCH,
          payload
        });
      })
      .catch(error => {
        error.response.status === 401 ? LogOut() : console.log(error);
      });
  };

  return (
    <ShowContext.Provider
      value={{
        show,
        search_bool,
        hide,
        search_data,
        search_delete,
        search_delete_favorite,
        search_favorite_list,
        delete_favorite_list,
        search_add_favorite,
        search_sort,
        search_sort_fav_data,
        search_sort_favorite,
        Fetch_favorite_order,
        select_favorite_list,
        Fetch_favorite_list,
        display: state
      }}
    >
      {children}
    </ShowContext.Provider>
  );
};
