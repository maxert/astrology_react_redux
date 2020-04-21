import React, { useContext } from "react";
import { Dropdown } from "semantic-ui-react";
import { ReduceContext } from "../context/reducerContext";
import { NavLink, useRouteMatch } from "react-router-dom";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { ShowContext } from "../context/show/showContext";

//Функциональный Блок изменений карточки
function DropdownExampleInline({ ID, Type, Favorite, ClickDelete, Data }) {
  const { url } = useRouteMatch();
  const { delete_favorite_list } = useContext(ShowContext);
  const { none, delete_favorite, Add_favorite } = useContext(ReduceContext);

  return (
    <Dropdown className={"edit_drop"} inline floating labeled button>
      <Dropdown.Menu>
        {Favorite > 0 ? (
          <Dropdown.Item
            data-index="0"
            onClick={() =>
              delete_favorite(
                ID,
                Type,
                none.pagination !== 1 ? none.pagination : 1,
                none.sorted
              )
            }
          >
            <div>
              <SvgLoader path="../../img/favorites_21.svg">
                <SvgProxy selector="#cst" />
              </SvgLoader>
              Удалить с избранного
            </div>
          </Dropdown.Item>
        ) : (
          <Dropdown.Item
            data-index="0"
            onClick={() =>
              Add_favorite(
                Type,
                ID,
                none.pagination !== 1 ? none.pagination : 1,
                none.sorted
              )
            }
          >
            <div>
              <SvgLoader path="../../img/favorites.svg">
                <SvgProxy selector="#cst" />
              </SvgLoader>
              В избранные
            </div>
          </Dropdown.Item>
        )}

        <Dropdown.Item data-index="1">
          <NavLink to={url === "/favorite"?{pathname:`${url === "/favorite" ? Type : Type}/${ID}/edit`,state:"/favorite"}:`${url === "/favorite" ? Type : Type}/${ID}/edit`}>
            <SvgLoader path="../../img/Edit1.svg">
              <SvgProxy selector="#cst" />
            </SvgLoader>
            Редактировать
          </NavLink>
        </Dropdown.Item>
        <Dropdown.Item
          data-index="2"
          onClick={(e, data) => ClickDelete(e, data)}
        >
          <div>
            <SvgLoader path="../../img/Delete1.svg">
              <SvgProxy selector="#cst" />
            </SvgLoader>
            Удалить
          </div>
        </Dropdown.Item>
        <Dropdown.Item
          data-index="3"
          onClick={() => delete_favorite_list(ID, Type, Data)}
        >
          <div>
            <SvgLoader path="../../img/Delete1.svg">
              <SvgProxy selector="#cst" />
            </SvgLoader>
            Удалить из избранного
          </div>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownExampleInline;
