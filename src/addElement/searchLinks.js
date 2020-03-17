import _ from "lodash";
import React, { useState, useContext, useEffect } from "react";
import { Search, Grid } from "semantic-ui-react";
import SelectExample from "./Select.js";
import { ReduceContext } from "../context/reducerContext.js";
import { useRouteMatch } from "react-router";

//Блок плашки поиска
function SearchLinks({handleResultSelect}) {
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
  const { search_select,favorite_select, search_data_links, none } = useContext(ReduceContext);
  const [dataSearch, setSearch] = useState({ isLoading: false });

  function onChangeElement(event, data) {
    const key = data.options.filter(x => x.value === data.value);
    search_select(data.value, key[0].key);
    console.log(key[0].key);
  }

  function handleSearchChange(e, { value }) {
    setSearch({ isLoading: true });
    search_data_links(none.data_link.type_link, value,none.data_link.type_id);
    setTimeout(() => {
      setSearch({ isLoading: false });
    }, 300);
    console.log(value);
  }
 


  return (
    <Grid>
      <Grid.Column width={6}>
        <SelectExample
          onChangeElement={(event, data) => onChangeElement(event, data)}
        ></SelectExample>
        <Search
          loading={dataSearch.isLoading}
          onResultSelect={handleResultSelect}
          onSearchChange={_.debounce(handleSearchChange, 500, {
            isLoading: true
          })}
          results={none.data_value_select}
          className="search_new"
          placeholder="Что-то ищете..."
        />
      </Grid.Column>
    </Grid>
  );
}

export default SearchLinks;
