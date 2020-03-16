

import React from "react";

import { Button, Popup } from "semantic-ui-react";

//Выпадающий список слайдера
function DropdownSlider({Content}) {

  return (
    <Popup
    className="popup_slider"
      content={
        Content
        // <div className="dropdownslider">
        //   <NavLink to={`${url}/all`}>Перейти на страницу</NavLink>
        //   <div className="delete_comunity">Удалить связь</div>
        //   <div className="add_notal"> Добавить натальную карту</div>
        // </div>
      }
      on="click"
      pinned
      trigger={<Button/>}
    />
  );
}

export default DropdownSlider;
