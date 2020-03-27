import React, { useReducer } from "react";
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
  FETCH_FAVORITE_ORDER
} from "../types";
import { ShowContext } from "./showContext";
import { ShowReducer } from "./showReducer";
import Axios from "axios";
import { useAlert } from "react-alert";

export const ShowState = ({ children }) => {
  const initialState = {
    visible: false,
    isSearch: false,
    data_value: []
  };
  const alert = useAlert();
  const [state, dispatch] = useReducer(ShowReducer, initialState);

  const show = (text, type = "warning") => {
    dispatch({
      type: SHOW_ELEMENT,
      visible: true
    });
  };
  const hide = () => {
    dispatch({ type: HIDE_ELEMENT, visible: false });
  };
  const search_sort_favorite = (bool, data) => {
 
    if (bool) { 
      const payload = data.filter(i => i.isFav !== false);
      dispatch({ type: SEARCH_SORT_FAVORITE, payload });
    } else {
      dispatch({ type: SEARCH_SORT_FAVORITE, payload: data });
    }
  };
  const search_sort = (bool, data) => {
    const payload = bool
      ? data.sort((a, b) => a.firstname.localeCompare(b.firstname))
      : data.sort((a, b) => b.firstname.localeCompare(a.firstname));
    console.log(payload);
    debugger;
    dispatch({ type: SEARCH_SORT, payload });
  };
  const search_bool = bool => {
    dispatch({ type: SEARCH_BOOL, payload: bool });
  };



  
  const Fetch_favorite_list = async obj_type => {
    const res = await Axios.get(
      `http://1690550.masgroup.web.hosting-test.net/api/favorites?obj_type=${obj_type}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("users")}`
        }
      }
    );
    console.log(res.data);
    debugger;
    dispatch({
      type: FETCH_FAVORITE_LIST,
      payload: res.data
    });

  };


  const Fetch_favorite_order = (bool, data) => {
    const payload = bool
      ? data.sort((a, b) => a.firstname.localeCompare(b.firstname))
      : data.sort((a, b) => b.firstname.localeCompare(a.firstname));
    console.log(payload);
    debugger;
    dispatch({ type: FETCH_FAVORITE_ORDER, payload });
  };


  const search_add_favorite = async (id, type, data, fav) => {
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
    const payload = data.map(Items => {
      if (Items.id === id) {
        Items.isFav = true;
      }
      return Items;
    });

    console.log(payload);
    dispatch({ type: SEARCH_ADD_FAVORITE, payload });
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
    const payload = data.map(Items => {
      if (Items.id === id) {
        Items.isFav = false;
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
    debugger;
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
        isFav:
          res.data[Object.keys(res.data)[0]][key].fav === null ? false : true
      };
    });
    payload.sort((a, b) =>  a.firstname!==undefined?a.firstname.localeCompare(b.firstname):a.name.localeCompare(b.name));
    console.log(payload)
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
        search_add_favorite,
        search_sort,
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
