import React, { useContext, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";
import { ReduceContext } from "../context/reducerContext";
import { NavLink, useRouteMatch } from "react-router-dom";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { PersonsContext } from "../context/personReducer/personContext";
import { ShowContext } from "../context/show/showContext";
//Функциональный Блок изменений карточки
function DropdownExampleInline({ ID, Type, Favorite, isFavortie }) {
  const { url } = useRouteMatch();

  const { none, Add_favorite } = useContext(ReduceContext);
  const {
    display,
    search_delete,
    search_add_favorite,
    search_delete_favorite
  } = useContext(ShowContext);
  return (
    <Dropdown className={"edit_drop"} inline floating labeled button>
      <Dropdown.Menu>
        {isFavortie === true ? (
          <Dropdown.Item
            data-index="0"
            onClick={() =>
              search_delete_favorite(ID, Type, display.data_value, Favorite)
            }
          >
            <SvgLoader path="../../img/favorites_21.svg">
              <SvgProxy selector="#cst" />
            </SvgLoader>
            Удалить с избранного
          </Dropdown.Item>
        ) : (
          <Dropdown.Item
            data-index="0"
            onClick={() =>
              search_add_favorite(ID, Type, display.data_value, Favorite)
            }
          >
            <SvgLoader path="../../img/favorites.svg">
              <SvgProxy selector="#cst" />
            </SvgLoader>
            В избранные
          </Dropdown.Item>
        )}

        <Dropdown.Item data-index="1">
          <SvgLoader path="../../img/Edit1.svg">
            <SvgProxy selector="#cst" />
          </SvgLoader>
          <NavLink
            to={`${
              url === "/favorite" ? none.data_link_favorite.type_id : url
            }/${ID}/edit`}
          >
            Редактировать
          </NavLink>
        </Dropdown.Item>
        <Dropdown.Item
          data-index="2"
          onClick={() => {
            search_delete(
              ID,
              none.data_link_favorite.type_link,
              display.data_value
            );
          }}
        >
          <SvgLoader path="../../img/Delete1.svg">
            <SvgProxy selector="#cst" />
          </SvgLoader>
          Удалить
        </Dropdown.Item>
        <Dropdown.Item data-index="3">
          <SvgLoader path="../../img/Delete1.svg">
            <SvgProxy selector="#cst" />
          </SvgLoader>
          Удалить из избранного
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownExampleInline;
