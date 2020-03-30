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
  SEARCH_SORT_FAV_DATE
} from "../types";
import { ShowContext } from "./showContext";
import { ShowReducer } from "./showReducer";
import Axios from "axios";
import { useAlert } from "react-alert";
import { ReduceContext } from "../reducerContext";

export const ShowState = ({ children }) => {
  const initialState = {
    visible: false,
    isSearch: false,
    data_value: []
  };
  const alert = useAlert();
  const [state, dispatch] = useReducer(ShowReducer, initialState);
  const { isLoading, fetch_number } = useContext(ReduceContext);
  const show = (text, type = "warning") => {
    dispatch({
      type: SHOW_ELEMENT,
      visible: true
    });
  };
  const hide = () => {
    dispatch({ type: HIDE_ELEMENT, visible: false });
  };
  const search_sort_fav_data = (bool, data) => {
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
    payload = data.filter(i => i.isfav !== false);
    dispatch({ type: SEARCH_SORT_FAV_DATE, payload });
  };
  const search_sort_favorite = (bool, data) => {
    if (bool) {
      const payload = data.filter(i => i.isfav !== false);
      dispatch({ type: SEARCH_SORT_FAVORITE, payload });
    } else {
      dispatch({ type: SEARCH_SORT_FAVORITE, payload: data });
    }
  };
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
    console.log(payload);
    dispatch({ type: SEARCH_SORT, payload });
  };
  const search_bool = bool => {
    dispatch({ type: SEARCH_BOOL, payload: bool });
  };

  const Fetch_favorite_list = async obj_type => {
    isLoading(false);
    const res = await Axios.get(
      `http://1690550.masgroup.web.hosting-test.net/api/favorites?obj_type=${obj_type}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("users")}`
        }
      }
    );

    isLoading(true);
    dispatch({
      type: FETCH_FAVORITE_LIST,
      payload: res.data
    });
  };

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

  const search_add_favorite = async (id, type, data) => {
    const res = await Axios.post(
      `http://1690550.masgroup.web.hosting-test.net/api/favorites`,
      {
        obj_type: type,
        obj_id: id
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("users")}`
        }
      }
    );
    fetch_number();
    const payload = data.map(Items => {
      if (Items.id === id) {
        Items.isfav = true;
      }
      return Items;
    });

    console.log(payload);
    dispatch({ type: SEARCH_ADD_FAVORITE, payload });
  };

  const delete_favorite_list = async (id, type, data) => {
    const res = await Axios.delete(
      `http://1690550.masgroup.web.hosting-test.net/api/favorites?obj_type=${type}&obj_id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("users")}`
        }
      }
    );
    const payload = data.filter(i => i.id !== id);
    fetch_number();
    dispatch({ type: DELETE_FAVORITE_LIST, payload });
  };

  const search_delete_favorite = async (id, type, data, fav) => {
    const res = await Axios.delete(
      `http://1690550.masgroup.web.hosting-test.net/api/favorites?obj_type=${type}&obj_id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("users")}`
        }
      }
    );
    fetch_number();
    const payload = data.map(Items => {
      if (Items.id === id) {
        Items.isfav = false;
      }
      return Items;
    });
    dispatch({ type: SEARCH_DELETE_FAVORITE, payload });
  };
  const search_delete = async (id, type, data) => {
    const res = await Axios.delete(
      `http://1690550.masgroup.web.hosting-test.net${type}/` + id,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("users")}`
        }
      }
    );
    console.log(res.data);
    fetch_number();
    const payload = data.filter(i => i.id !== id);
    dispatch({ type: SEARCH_DELETE, payload });
  };

  const search_data = async (type, value, url) => {
    const res = await Axios.get(
      `http://1690550.masgroup.web.hosting-test.net${type}?search=${value}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("users")}`
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
            : res.data[Object.keys(res.data)[0]][key].name,
        isfav:
          res.data[Object.keys(res.data)[0]][key].fav === null ? false : true
      };
    });
    payload.sort((a, b) =>
      a.firstname !== undefined
        ? a.firstname.localeCompare(b.firstname, "en-US")
        : a.name.localeCompare(b.name, "en-US")
    );
    console.log(payload);
    dispatch({
      type: SEARCH,
      payload
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
        delete_favorite_list,
        search_add_favorite,
        search_sort,
        search_sort_fav_data,
        search_sort_favorite,
        Fetch_favorite_order,
        Fetch_favorite_list,
        display: state
      }}
    >
      {children}
    </ShowContext.Provider>
  );
};
