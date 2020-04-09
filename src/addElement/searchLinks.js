
import React, {useContext } from "react";
import { Search, Grid } from "semantic-ui-react";
import SelectExample from "./Select.js";
import { ReduceContext } from "../context/reducerContext.js";

//Блок плашки поиска связей
function SearchLinks({ handleResultSelect, handleSearchChange, isLoading }) {
  const { search_select, none } = useContext(ReduceContext);

  function onChangeElement(event, data) {
    const key = data.options.filter(x => x.value === data.value);
    search_select(data.value, key[0].key);
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
