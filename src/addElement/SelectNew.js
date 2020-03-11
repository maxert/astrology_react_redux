import React from "react";
import { Select } from "semantic-ui-react";

//Блок с выбором
const countryOptions = [
  { key: "1", value: "1", text: "Все" },
  { key: "2", value: "2", text: "Без Айнамши" },
  { key: "3", value: "3", text: "Айнамши" },
];

export const SelectNew = () => {
  return <Select placeholder="Без Айнамши" options={countryOptions} />;
};
