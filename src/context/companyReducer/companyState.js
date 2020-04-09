import React, { useReducer, useContext } from "react";
import { CompanyContext } from "./companyContext";
import { CompanyReducer } from "./companyReducer";
import manifest from "../../manifest";
import {
  ADD_COMPANY,
  FETCH_DATA_COMPANY,
  DELETE_COMPANY,
  UPDATE_COMPANY
} from "../types";
import Axios from "axios";
import { ReduceContext } from "../reducerContext";
import { useHistory } from "react-router";
import { useAlert } from "react-alert";

export const CompanyState = ({ children }) => {
  const initialState = {
    token: localStorage.getItem("users"),
    data_company: []
  };
  const alert = useAlert();
  const history = useHistory();
  const { isLoading, LogOut } = useContext(ReduceContext);
  const [state, dispatch] = useReducer(CompanyReducer, initialState);

  //Получить список компаний
  const Fetch_data_сompany = (number, order_by) => {
    Axios.get(
      manifest.URL +
        `/api/companies?page=${
          number === undefined ? 1 : number
        }&order_direction=${order_by}`,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    ).then(res => {
      dispatch({
        type: FETCH_DATA_COMPANY,
        payload: res.data
      });
      isLoading(true);
    });
  };

  //Удалить компанию
  const delete_company = async (id, id_pagination, order_by) => {
    await Axios.delete(manifest.URL + `/api/companies/` + id, {
      headers: {
        Authorization: `Bearer ${initialState.token}`
      }
    });
    isLoading(false);
    Fetch_data_сompany(id_pagination, order_by);
    dispatch({
      type: DELETE_COMPANY
    });
  };

  //Обновить компанию
  const Update_company = async (values, id) => {
    let formData = new FormData();
    Object.keys(values).map(key => {
      if (key === "upload_image") {
        formData.append(key, values[key][0]);
      } else {
        formData.append(key, values[key]);
      }
    });

    await Axios.post(manifest.URL + `/api/companies/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${initialState.token}`
      }
    })
      .then(res => {
        alert.success("Компания обновленна");
        dispatch({
          type: UPDATE_COMPANY,
          add_update_json: res.data
        });
      })
      .catch(error => {
        error.response.status === 401 ? LogOut() : console.log(error);
      });
  };

  //Добавить компанию
  const Add_company = async values => {
    let formData = new FormData();

    Object.keys(values).map(key => {
      if (key === "upload_image") {
        formData.append(key, values[key][0]);
      } else {
        formData.append(key, values[key]);
      }
    });
    await Axios.post(manifest.URL + "/api/companies", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${initialState.token}`
      }
    })
      .then(res => {
        alert.success("Компания созданна");
        history.goBack();
        dispatch({
          type: ADD_COMPANY,
          payload: res.data
        });
      })
      .catch(error => {
        error.response.status === 401 ? LogOut() : console.log(error);
      });
  };

  return (
    <CompanyContext.Provider
      value={{
        Update_company,
        delete_company,
        Add_company,
        Fetch_data_сompany,
        state_company: state
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};
