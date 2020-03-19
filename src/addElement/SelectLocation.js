import React, { useContext } from "react";
import { Select } from "semantic-ui-react";
import { ReduceContext } from "../context/reducerContext";
//Блок с выбором
const countryOptions = [
  { key: "0", value: "12", text: "GMT+12" },
  { key: "1", value: "11", text: "GMT+11" },
  { key: "2", value: "10", text: "GMT+10" },
  { key: "3", value: "9", text: "GMT+9" },
  { key: "4", value: "8", text: "GMT+8" },
  { key: "5", value: "7", text: "GMT+7" },
  { key: "6", value: "6", text: "GMT+6" },
  { key: "7", value: "5", text: "GMT+5" },
  { key: "8", value: "4", text: "GMT+4" },
  { key: "9", value: "3", text: "GMT+3" },
  { key: "10", value: "2", text: "GMT+2" },
  { key: "11", value: "1", text: "GMT+1" },
  { key: "12", value: "0", text: "GMT 0" },
  { key: "13", value: "-1", text: "GMT-1" },
  { key: "14", value: "-2", text: "GMT-2" },
  { key: "15", value: "-3", text: "GMT-3" },
  { key: "16", value: "-4", text: "GMT-4" },
  { key: "17", value: "-5", text: "GMT-5" },
  { key: "18", value: "-6", text: "GMT-6" },
  { key: "19", value: "-7", text: "GMT-7" },
  { key: "20", value: "-8", text: "GMT-8" },
  { key: "21", value: "-9", text: "GMT-9" },
  { key: "22", value: "-10", text: "GMT-10" },
  { key: "23", value: "-11", text: "GMT-11" },
  { key: "24", value: "-12", text: "GMT-12" }
];

function SelectLocation({ValueOptions}) {
  const { SelectLocationNew,none } = useContext(ReduceContext);
  return (
    <Select
      placeholder="GMT+2"
      options={countryOptions}
      value={ValueOptions}
      onChange={(e, { value }) => {SelectLocationNew(value)}}
    />
  );
}

export default SelectLocation;
