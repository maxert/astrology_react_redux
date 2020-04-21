import React, { useContext } from "react";
import { Select } from "semantic-ui-react";
import { ShowContext } from "../context/show/showContext";
import { ReduceContext } from "../context/reducerContext";

//Блок с выбором сущностей на избранных
const countryOptions = [
  { key: "all", value: "default", text: "Все" },
  { key: "person", value: "/api/persons", text: "Персона" },
  { key: "company", value: "/api/companies", text: "Компания" },
  { key: "event", value: "/api/events", text: "События" }
];

function SelectExample({ onChangeElement }) {
  const {none}= useContext(ReduceContext)

  return (
    <Select
      value={none.select_fav.link_id===""?"default":none.select_fav.link_id}
      options={countryOptions}
      onChange={(event, data) => {onChangeElement(event, data)}}
    />
  );
}
export default SelectExample;
