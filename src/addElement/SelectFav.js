import React, { useContext } from "react";
import { Select } from "semantic-ui-react";
import { ShowContext } from "../context/show/showContext";

//Блок с выбором сущностей на избранных
const countryOptions = [
  { key: "all", value: "default", text: "Все" },
  { key: "person", value: "/api/persons", text: "Персона" },
  { key: "company", value: "/api/companies", text: "Компания" },
  { key: "event", value: "/api/events", text: "События" }
];

function SelectExample({ onChangeElement }) {
  const {display}= useContext(ShowContext)

  return (
    <Select
      value={display.select_fav.link_id===""?"default":display.select_fav.link_id}
      options={countryOptions}
      onChange={(event, data) => {onChangeElement(event, data)}}
    />
  );
}
export default SelectExample;
