import _ from "lodash";
import PropTypes from "prop-types";
import React, { useState, useContext } from "react";
import { Search, Grid } from "semantic-ui-react";
import SelectExample from "./Select.js";
import { ReduceContext } from "../context/reducerContext.js";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

//Блок плашки поиска на странице главная
function SearchHome({ handleResultSelect }) {
  const { search_select, search_data_home, none } = useContext(ReduceContext);
  const [dataSearch, setSearch] = useState({ isLoading: false });
  const location = useLocation();
  const resultRenderer = ({ title, type_id, content }) => (
    <Link
      to={{ pathname: `/${content}/id/${type_id}`, state: location.pathname }}
    >
      {title}
    </Link>
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
  }

  function handleSearchChange(e, { value }) {
    setSearch({ isLoading: true });
    search_data_home(none.data_link.type_link, value, none.data_link.type_id);
    setTimeout(() => {
      setSearch({ isLoading: false });
    }, 300);
  }
  function resultSubmite(value) {
    search_data_home(
      none.data_link.type_link,
      value.result.title,
      none.data_link.type_id
    );
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
          results={none.data_value_home.value}
          className="search_new"
          placeholder="Что-то ищете..."
          resultRenderer={resultRenderer}
        />
      </Grid.Column>
    </Grid>
  );
}

export default SearchHome;
