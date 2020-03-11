import React from "react";
import { Select } from "semantic-ui-react";
//Блок с выбором
const countryOptions = [
  { key: "1", value: "1", text: "Персона" },
  { key: "2", value: "2", text: "Компания" },
  { key: "3", value: "3", text: "События" },
  { key: "4", value: "4", text: "Страны" },
  { key: "5", value: "5", text: "Валюты" }
];

export const SelectExample = () => {
  return (<Select placeholder="Компания" options={countryOptions} />)
};
