import _ from "lodash";
import PropTypes from "prop-types";
import React, { useState, useContext } from "react";
import { Search, Grid } from "semantic-ui-react";
import SelectExample from "./SelectFav";
import { ShowContext } from "../context/show/showContext.js";

//Блок плашки поиска на странице Избранных
function SearchFav() {
  const {
    display,
    select_favorite_list,
    Fetch_favorite_list,
    search_favorite_list
  } = useContext(ShowContext);

  const [dataSearch, setSearch] = useState({ isLoading: false });

  const resultRenderer = ({ title,id_title }) => <div key={id_title}>{title}</div>;

  resultRenderer.propTypes = {
    title: PropTypes.string,
    id_title:PropTypes.number
  };

  function onChangeElement(event, data) {
    const key = data.options.filter(x => x.value === data.value);
    select_favorite_list(data.value, key[0].key);
    Fetch_favorite_list(key[0].key);
    debugger
  }

  function handleSearchChange(e, { value }) {
    setSearch({ isLoading: true });
    search_favorite_list(
      value,
      display.data_favorite,
      value.length === 0 ? false : true,
      display.select_fav.link_id
    );
    debugger
    setTimeout(() => {
      setSearch({ isLoading: false });
    }, 300);
  }
  function resultSubmite(value) {
    debugger
    search_favorite_list(
      value.result.title,
      display.data_favorite,
      value.result.title.length > 0,
      display.select_fav.link_id
    );
    debugger
  }
  return (
    <Grid>
      <Grid.Column width={6}>
        <SelectExample
          onChangeElement={(event, data) => onChangeElement(event, data)}
        ></SelectExample>
        <Search
          onResultSelect={(e, data) => resultSubmite(data)}
          loading={dataSearch.isLoading}
          onSearchChange={_.debounce(handleSearchChange, 500, {
            isLoading: true
          })}
          results={display.data_favorite_search}
          className="search_new"
          placeholder="Что-то ищете..."
          resultRenderer={resultRenderer}
        />
      </Grid.Column>
    </Grid>
  );
}

export default SearchFav;
