import React, { useReducer, useContext } from "react";
import {
  UPDATE_PERSONS,
  ADD_PERSONS,
  FETCH_DATA_PERSONS,
  DELETE_PERSONS,
} from "../types";
import { PersonsContext } from "./personContext";
import { PersonsReducer } from "./personReducer";
import Axios from "axios";
import { ReduceContext } from "../reducerContext";
import { useAlert } from "react-alert";
import { useHistory } from "react-router";
import manifest from "../../manifest";
export const PersonState = ({ children }) => {
  const initialState = {
    token: localStorage.getItem("users"),
    data_persons: [],
  };
  const [state, dispatch] = useReducer(PersonsReducer, initialState);
  const { isLoading, LogOut } = useContext(ReduceContext);
  const alert = useAlert();
  const history = useHistory();

  //Обновить пользователя
  const Update_persons = async (values, id) => {
    let formData = new FormData();
    Object.keys(values).map((key) =>
      key === "upload_image"
        ? formData.append(key, values[key][0])
        : formData.append(key, values[key]),
    );

    await Axios.post(manifest.URL + `/api/persons/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${initialState.token}`,
      },
    }).then((res) => {
      alert.success("Персона обновленна");
      dispatch({
        type: UPDATE_PERSONS,
        add_update_json: res.data,
      });
    });
  };

  //Добавить пользователя
  const Add_persons = async (values) => {
    let formData = new FormData();

    Object.keys(values).map((key) =>
      key === "upload_image"
        ? formData.append(key, values[key][0])
        : formData.append(key, values[key]),
    );

    await Axios.post(manifest.URL + "/api/persons", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${initialState.token}`,
      },
    })
      .then((res) => {
        alert.success("Персона созданна");
        history.goBack();
        dispatch({
          type: ADD_PERSONS,
          payload: res.data,
        });
      })
      .catch((error) => {
        error.response.status === 401 ? LogOut() : console.log(error);
      });
  };

  //Удалить пользователя
  const delete_persons = async (id, id_pagination, order_by) => {
    await Axios.delete(manifest.URL + `/api/persons/` + id, {
      headers: {
        Authorization: `Bearer ${initialState.token}`,
      },
    }).catch((error) => {});
    isLoading(false);
    Fetch_data_persons(id_pagination, order_by);
    dispatch({
      type: DELETE_PERSONS,
    });
  };

  //Получить список пользователей
  const Fetch_data_persons = (number, order_by) => {
    Axios.get(
      manifest.URL +
        `/api/persons?page=${
          number === undefined ? 1 : number
        }&order_direction=${order_by}`,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`,
        },
      },
    )
      .then((res) => {
        dispatch({
          type: FETCH_DATA_PERSONS,
          payload: res.data,
        });
        isLoading(true);
      })
      .catch((error) => {
        error.response.status === 401 ? LogOut() : console.log(error);
      });
  };
  return (
    <PersonsContext.Provider
      value={{
        Update_persons,
        Add_persons,
        delete_persons,
        Fetch_data_persons,
        state_persons: state,
      }}>
      {children}
    </PersonsContext.Provider>
  );
};
