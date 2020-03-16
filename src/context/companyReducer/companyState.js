import React, { useReducer } from "react";
import { CompanyContext } from "./companyContext";
import { CompanyReducer } from "./companyReducer";
import {
  ADD_COMPANY,
  FETCH_DATA_COMPANY,
  DELETE_COMPANY,
  UPDATE_COMPANY
} from "../types";
import Axios from "axios";

export const CompanyState = ({ children }) => {
  const initialState = {
    token: localStorage.getItem("users"),
    data_company: null
  };
  const [state, dispatch] = useReducer(CompanyReducer, initialState);

  const Fetch_data_сompany = async number => {
    const res = await Axios.get(
      `http://1690550.masgroup.web.hosting-test.net/api/companies?page=${
        number === undefined ? 1 : number
      }`,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );

    console.log(res.data);
    dispatch({
      type: FETCH_DATA_COMPANY,
      payload: res.data
    });
  };


  const delete_company = async id => {
    await Axios.delete(
      "http://1690550.masgroup.web.hosting-test.net/api/companies/" + id,
      {
        headers: {
          Authorization: `Bearer ${initialState.token}`
        }
      }
    );
    Fetch_data_сompany();

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
        birth_time: values.time,
        timezone: parseFloat(time[0]),
        longtitude: parseFloat(values.longitude),
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
    var time = values.timezone.match(/[+-]?[0-9]+(.[0-9]+)?/g);
    const res = await Axios.post(
      "http://1690550.masgroup.web.hosting-test.net/api/companies?name&telephone&email&birth_date&birth_time&timezone&latitude&longtitude&city&image&osnovatel&cnt_workers",
      {
        name: values.name,
        osnovatel: values.osnovatel,
        email: values.email,
        telephone: values.telephone,
        birth_date: values.birth_date,
        birth_time: values.time,
        timezone: parseFloat(time[0]),
        longtitude: parseFloat(values.longitude),
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
      type: ADD_COMPANY,
      add_company_json: res.data
    });
    console.log(res);
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
