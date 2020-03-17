import React from "react";
import { Select } from "semantic-ui-react";

//Блок с выбором
const countryOptions = [
  { key: "0", value: "0", text: "Без Айнамши" },
  { key: "1", value: "1", text: "Айнамши" },
];

export const SelectNew = ({ChangeSelect}) => {
  return <Select placeholder="Без Айнамши" options={countryOptions} onChange={(event,data)=>ChangeSelect(event,data)}/>;
};
