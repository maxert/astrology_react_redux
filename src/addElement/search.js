import _ from "lodash";
import PropTypes from "prop-types";
import React, { useState, useContext, useEffect } from "react";
import { Search, Grid } from "semantic-ui-react";
import SelectExample from "./Select.js";
import { ReduceContext } from "../context/reducerContext.js";
import { ShowContext } from "../context/show/showContext.js";

//Блок плашки поиска
function SearchExampleStandard() {
  const { search_bool, search_data, display } = useContext(ShowContext);

  const { search_select, none } = useContext(ReduceContext);
  const [dataSearch, setSearch] = useState({ isLoading: false });
  const [values, setValue] = useState("");

  const resultRenderer = ({ title }) => <div>{title}</div>;

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
  useEffect(() => {
    if (none.data_link.type_link !== undefined) {
      search_data(none.data_link.type_link, values, none.data_link.type_id);
    }
  }, [display.data_value !== undefined ? display.data_value.fav : false]);

  function handleSearchChange(e, { value }) {
    if (value.length === 0) {
      search_bool(false);
    } else {
      search_bool(true);
    }
    setValue(value);
    setSearch({ isLoading: true });
    search_data(none.data_link.type_link, value, none.data_link.type_id);
    setTimeout(() => {
      setSearch({ isLoading: false });
    }, 300);
 
  }
  function resultSubmite(value) {
    search_data(
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
          results={display.data_value}
          className="search_new"
          placeholder="Что-то ищете..."
          resultRenderer={resultRenderer}
        />
      </Grid.Column>
    </Grid>
  );
}

export default SearchExampleStandard;
