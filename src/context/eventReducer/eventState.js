import React, { useReducer, useContext } from "react";
import { EventContext } from "./eventContext";
import { EventReducer } from "./eventReducer";
import manifest from "../../manifest";
import {
  ADD_EVENTS,
  FETCH_DATA_EVENTS,
  DELETE_EVENTS,
  UPDATE_EVENTS,
  SORT_DATA_EVENTS,
} from "../types";
import Axios from "axios";
import { useAlert } from "react-alert";
import { useHistory } from "react-router";
import { ReduceContext } from "../reducerContext";

export const EventState = ({ children }) => {
  const initialState = {
    token: localStorage.getItem("users"),
    data_events: [],
  };
  const [state, dispatch] = useReducer(EventReducer, initialState);
  const alert = useAlert();
  const history = useHistory();
  const { isLoading, fetch_number, LogOut } = useContext(ReduceContext);

  //Сортировка событий
  const sort_data_events = async (number, order_by, date) => {
    await Axios.get(
      manifest.URL +
        `/api/events?page=${
          number === undefined ? 1 : number
        }&order_direction=${order_by}&date=` +
        date,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`,
        },
      },
    )
      .then((res) => {
        if (res.data.events.length === 0) {
          Fetch_data_events(number, order_by);
          isLoading(true);
        } else {
          fetch_number();
          alert.info("Событие отсортированно");
          dispatch({
            type: SORT_DATA_EVENTS,
            payload: res.data,
          });
          isLoading(true);
        }
      })
      .catch((error) => {
        if (error.response !== undefined) {
          error.response.status === 401 ? LogOut() : console.log(error);
        }
      });
  };

  //Получить список событий
  const Fetch_data_events = async (number, order_by, date) => {
    await Axios.get(
      manifest.URL +
        `/api/events?page=${
          number === undefined ? 1 : number
        }&order_direction=${order_by}&date=` +
        date,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`,
        },
      },
    )
      .then((res) => {
        fetch_number();
        dispatch({
          type: FETCH_DATA_EVENTS,
          payload: res.data,
        });
        isLoading(true);
      })
      .catch((error) => {
        if (error.response !== undefined) {
          error.response.status === 401 ? LogOut() : console.log(error);
        }
      });
  };

  //Удалить событие
  const delete_events = async (id, id_pagination, order_by) => {
    await Axios.delete(manifest.URL + "/api/events/" + id, {
      headers: {
        Authorization: `Bearer ${initialState.token}`,
      },
    })
      .then((res) => {
        isLoading(false);
        Fetch_data_events(id_pagination, order_by);
        fetch_number();
        dispatch({
          type: DELETE_EVENTS,
        });
      })
      .catch((error) => {
        error.response.status === 401 ? LogOut() : console.log(error);
      });
  };

  //Обновить событие
  const Update_events = async (values, id) => {
    let formData = new FormData();

    Object.keys(values).map((key) =>
      key === "upload_image"
        ? formData.append(key, values[key][0])
        : formData.append(key, values[key]),
    );
    await Axios.post(manifest.URL + "/api/events/" + id, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${initialState.token}`,
      },
    }).then((res) => {
      alert.success("Событие обновленно");
      dispatch({
        type: UPDATE_EVENTS,
        payload: res.data,
      });
    });
  };

  //Добавить событие
  const Add_events = async (values) => {
    let formData = new FormData();

    Object.keys(values).map((key) =>
      key === "upload_image"
        ? formData.append(key, values[key][0])
        : formData.append(key, values[key]),
    );
    await Axios.post(manifest.URL + "/api/events", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${initialState.token}`,
      },
    })
      .then((res) => {
        alert.success("Событие созданно");
        fetch_number();
        history.goBack();
        dispatch({
          type: ADD_EVENTS,
          payload: res.data,
        });
      })
      .catch((error) => {
        error.response.status === 401 ? LogOut() : console.log(error);
      });
  };

  return (
    <EventContext.Provider
      value={{
        Add_events,
        Update_events,
        delete_events,
        Fetch_data_events,
        sort_data_events,
        state_event: state,
      }}>
      {children}
    </EventContext.Provider>
  );
};
