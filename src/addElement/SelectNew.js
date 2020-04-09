import React from "react";
import { Select } from "semantic-ui-react";

//Блок с выбором натальной карты
const countryOptions = [
  { key: "0", value: "0", text: "Все" },
  { key: "1", value: "1", text: "Без Айнамши" },
  { key: "2", value: "2", text: "Айнамши" },
];

export const SelectNew = ({ChangeSelect,ValueNew}) => {
  return <Select placeholder="Без Айнамши"  value={ValueNew} options={countryOptions} onChange={(event,data)=>ChangeSelect(event,data)}/>;
};
