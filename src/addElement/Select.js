import React from "react";
import { Select } from "semantic-ui-react";
import { useRouteMatch } from "react-router";
//Блок с выбором
const countryOptions = [
  { key: "person", value: "/api/persons", text: "Персона",  },
  { key: "company", value: "/api/companies", text: "Компания"  },
  { key: "event", value: "/api/events", text: "События"  }
  // { key: "4", value: "4", text: "Страны" },
  // { key: "5", value: "5", text: "Валюты" }
];

function SelectExample({ onChangeElement }) {
  const { url } = useRouteMatch();
  console.log();
  return (
    <Select
      placeholder="Компания"
      defaultValue={
        `/api/` +
        (url.indexOf("person") === 1
          ? "persons"
          : url.indexOf("company") === 1
          ? "companies"
          : url.indexOf("event") === 1
          ? "events"
          : "persons")
      }
      options={countryOptions}
      onChange={(event, data) => onChangeElement(event, data)}
    />
  );
}
export default SelectExample;
