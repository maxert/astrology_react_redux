import React, { useContext } from "react";
import { Search } from "semantic-ui-react";
import { ReduceContext } from "../context/reducerContext.js";
import { GeoContext } from "../context/geolocation/GeoContext.js";

//Блок плашки поиска
function SearchCity({ ValueData, ValueLocation, HandleChange }) {
  const { geolocation } = useContext(GeoContext);
  const { none, search_data_city } = useContext(ReduceContext);
  function newSubmite(e, resulte) {
    geolocation(resulte.result.title);
  }
  function handleSearchChange(e, { value }) {
    search_data_city(value);
    console.log(value);
  }

  return (
    <Search
      icon={false}
      onResultSelect={(e, resulte) => {
        newSubmite(e, resulte);
      }}
      onSearchChange={handleSearchChange}
      results={none.data_city}
      defaultValue={ValueData}
      className="search_new"
      placeholder="Киев"
    />
  );
}

export default SearchCity;
