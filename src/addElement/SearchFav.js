import _ from "lodash";
import PropTypes from "prop-types";
import React, { useState, useContext, useEffect } from "react";
import { Search, Grid } from "semantic-ui-react";
import SelectExample from "./SelectFav";
import { ReduceContext } from "../context/reducerContext";

//Блок плашки поиска на странице Избранных
function SearchFav() {

  const {
    none,
    Fetch_favorite_list,
    select_favorite_list,
    search_favorite_list,
    saveValue,
  } = useContext(ReduceContext);
  const [dataSearch, setSearch] = useState({ isLoading: false });

  const resultRenderer = ({ title, id_title }) => (
    <div key={id_title}>{title}</div>
  );

  resultRenderer.propTypes = {
    title: PropTypes.string,
    id_title: PropTypes.number,
  };

  function onChangeElement(event, data) {
    const key = data.options.filter((x) => x.value === data.value);
    select_favorite_list(data.value, key[0].key);
    Fetch_favorite_list(key[0].key);

  }

  function handleSearchChange(e, { value }) {
    setSearch({ isLoading: true });
    search_favorite_list(
      value,
      none.data_favorite,
      value.length === 0 ? false : true,
      none.select_fav.type_link,
    );
    saveValue(value);
    setTimeout(() => {
      setSearch({ isLoading: false });
    }, 300);
  }
  function resultSubmite(value) {
    saveValue(value.result.title);
    search_favorite_list(
      value.result.title,
      none.data_favorite,
      value.result.title.length > 0,
      none.select_fav.type_link,
    );
   
  }
  useEffect(() => {
    if(none.value.length>=1){
      search_favorite_list(
        none.value,
        none.data_favorite,
        none.value.length === 0 ? false : true,
        none.select_fav.type_link,
      );
    }else{
      Fetch_favorite_list(none.select_fav.type_link);
    }
  }, []);
  return (
    <Grid>
      <Grid.Column width={6}>
        <SelectExample
          onChangeElement={(event, data) =>
            onChangeElement(event, data)
          }></SelectExample>
        <Search
          defaultValue={none.value}
          onResultSelect={(e, data) => resultSubmite(data)}
          loading={dataSearch.isLoading}
          onSearchChange={_.debounce(handleSearchChange, 500, {
            isLoading: true,
          })}
          results={none.data_favorite_search}
          className="search_new"
          placeholder="Что-то ищете..."
          resultRenderer={resultRenderer}
        />
      </Grid.Column>
    </Grid>
  );
}

export default SearchFav;
