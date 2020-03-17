import _ from "lodash";
import PropTypes from "prop-types";
import React, { useState, useContext, useEffect } from "react";
import { Search, Grid } from "semantic-ui-react";
import SelectExample from "./Select.js";
import { ReduceContext } from "../context/reducerContext.js";
import { useRouteMatch } from "react-router";
import { Link } from "react-router-dom";

//Блок плашки поиска
function SearchExampleStandard({ handleResultSelect }) {
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
          : url.indexOf("home_card") === 1
          ? "home_card"
          : "person"
    };
    console.log(urls);
    favorite_select(urls.type_link, urls.type_id);
    search_select(urls.type_link, urls.type_id);
  }, []);
  const { search_select, favorite_select, search_data, none } = useContext(
    ReduceContext
  );
  const [dataSearch, setSearch] = useState({ isLoading: false });

  const resultRenderer = ({ title, type_id, content }) => (
    <Link to={`/${content}/id/${type_id}`}>{title}</Link>
  );

  resultRenderer.propTypes = {
    title: PropTypes.string,
    id: PropTypes.number,
    content: PropTypes.string,
    type_id: PropTypes.number
  };
  function onChangeElement(event, data) {
    const key = data.options.filter(x => x.value === data.value);
    search_select(data.value, key[0].key);
    console.log(key[0].key);
  }

  function handleSearchChange(e, { value }) {
    setSearch({ isLoading: true });
    search_data(none.data_link.type_link, value, none.data_link.type_id);
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
          onSearchChange={_.debounce(handleSearchChange, 500, {
            isLoading: true
          })}
          results={none.data_value.value}
          className="search_new"
          placeholder="Что-то ищете..."
          resultRenderer={resultRenderer}
        />
      </Grid.Column>
    </Grid>
  );
}

export default SearchExampleStandard;
