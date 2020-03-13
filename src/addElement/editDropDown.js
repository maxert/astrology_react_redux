import React, { useContext } from "react";
import { Dropdown } from "semantic-ui-react";
import { ReduceContext } from "../context/reducerContext";
import { NavLink, useRouteMatch } from "react-router-dom";
import { SvgLoader, SvgProxy } from "react-svgmt";
//Функциональный Блок изменений карточки
function DropdownExampleInline({ Values, onClickData,onClickDataNew }) {
  const { url } = useRouteMatch();
  const { none } = useContext(ReduceContext);

  
  return (
    <Dropdown
      className={"edit_drop"}
      inline
      floating
      labeled
      button
      onChange={(events, data) => Values(data, events)}
      onClick={(events, data) => onClickData(events, data)}
    >
      <Dropdown.Menu onClick={(events, value) => onClickDataNew(events, value)}>
        <Dropdown.Item data-index="0">
          <SvgLoader path="../../img/favorites.svg">
            <SvgProxy selector="#cst" />
          </SvgLoader>
          В избранные
        </Dropdown.Item>
        <Dropdown.Item data-index="1">
          <SvgLoader path="../../img/Edit1.svg">
            <SvgProxy selector="#cst" />
          </SvgLoader>
          <NavLink to={`${url==="/favorite"?none.number_all.match:url}/${none.number_all.numbers}/edit`}>
            Редактировать
          </NavLink>
        </Dropdown.Item>
        <Dropdown.Item data-index="2">
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
