import React, { useReducer, useContext } from "react";
import { CompanyContext } from "./companyContext";
import { CompanyReducer } from "./companyReducer";
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
  const { isLoading } = useContext(ReduceContext);
  const [state, dispatch] = useReducer(CompanyReducer, initialState);

  const Fetch_data_сompany = (number, order_by) => {
    Axios.get(
      `http://1690550.masgroup.web.hosting-test.net/api/companies?page=${
        number === undefined ? 1 : number
      }&order_direction=${order_by}`,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    ).then(res => {
      console.log(res.data);
      debugger;
      dispatch({
        type: FETCH_DATA_COMPANY,
        payload: res.data
      });
      isLoading(true);
    });
  };

  const delete_company = async (id, id_pagination, order_by) => {
    const res = await Axios.delete(
      `http://1690550.masgroup.web.hosting-test.net/api/companies/` + id,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );
    isLoading(false);
    Fetch_data_сompany(id_pagination, order_by);
    dispatch({
      type: DELETE_COMPANY
    });
  };

  const Update_company = async (values, id) => {
    var time = values.timezone.match(/[+-]?[0-9]+(.[0-9]+)?/g);
    const res = await Axios.put(
      `http://1690550.masgroup.web.hosting-test.net/api/companies/${id}?name&telephone&email&birth_date&birth_time&timezone&latitude&longtitude&city&image&osnovatel&cnt_workers`,
      {
        name: values.name,
        osnovatel: values.osnovatel,
        email: values.email,
        telephone: values.telephone,
        birth_date: values.birth_date,
        birth_time: values.birth_time,
        timezone: parseFloat(time[0]),
        longtitude: parseFloat(values.longtitude),
        latitude: parseFloat(values.latitude),
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

  const Add_company = async values => {
    let formData = new FormData();

    Object.keys(values).map(key => {
      if (key === "upload_image") {
        formData.append(key, values[key][0]);
      } else {
        formData.append(key, values[key]);
      }
    });

    console.log(formData);
    debugger;
    const res = await Axios.post(
      "http://1690550.masgroup.web.hosting-test.net/api/companies",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );
    alert.success("Компания созданна");
    history.goBack();
    dispatch({
      type: ADD_COMPANY,
      payload: res.data
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
