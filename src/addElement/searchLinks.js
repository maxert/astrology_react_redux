import _ from "lodash";
import React, { useState, useContext, useEffect } from "react";
import { Search, Grid } from "semantic-ui-react";
import SelectExample from "./Select.js";
import { ReduceContext } from "../context/reducerContext.js";
import { useRouteMatch } from "react-router";

//Блок плашки поиска
function SearchLinks({ handleResultSelect, handleSearchChange, isLoading }) {
  const { url } = useRouteMatch();
  useEffect(() => {
    let urls = {
      type_link:
        `/api/` +
        (url.indexOf("person") === 1
          ? "persons"
          : url.indexOf("company") === 1
          ? "companies"
          : url.indexOf("event") === 1
          ? "events"
          : "persons"),
      type_id:
        url.indexOf("person") === 1
          ? "person"
          : url.indexOf("company") === 1
          ? "company"
          : url.indexOf("event") === 1
          ? "event"
          : "person"
    };
    favorite_select(urls.type_link, urls.type_id);
    search_select(urls.type_link, urls.type_id);
  }, []);
  const {
    search_select,
    favorite_select,
    none
  } = useContext(ReduceContext);

  function onChangeElement(event, data) {
    const key = data.options.filter(x => x.value === data.value);
    search_select(data.value, key[0].key);
    console.log(key[0].key);
    debugger;
  }

  return (
    <Grid>
      <Grid.Column width={6}>
        <SelectExample
          onChangeElement={(event, data) => onChangeElement(event, data)}
        ></SelectExample>
        <Search
          selectFirstResult={true}
          loading={isLoading}
          onResultSelect={handleResultSelect}
          onSearchChange={(e, data) => handleSearchChange(e, data)}
          results={none.data_value_select}
          className="search_new"
          placeholder="Что-то ищете..."
        />
      </Grid.Column>
    </Grid>
  );
}

export default SearchLinks;
