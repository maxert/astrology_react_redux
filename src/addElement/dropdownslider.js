

import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import { Button, Popup } from "semantic-ui-react";

function DropdownSlider() {
  let { url } = useRouteMatch();
  return (
    <Popup
    className="popup_slider"
      content={
        <div className="dropdownslider">
          <NavLink to={`${url}/all`}>Перейти на страницу</NavLink>
          <div className="delete_comunity">Удалить связь</div>
          <div className="add_notal"> Добавить натальную карту</div>
        </div>
      }
      on="click"
      pinned
      trigger={<Button/>}
    />
  );
}

export default DropdownSlider;
