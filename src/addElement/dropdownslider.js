import React from "react";

import { Button, Popup } from "semantic-ui-react";

//Выпадающий список слайдера
function DropdownSlider({ Content,disabledPop }) {
  return (
    <Popup
      disabled={disabledPop}
      className="popup_slider"
      content={Content}
      on="click"
      pinned
      trigger={<Button onClick={()=>disabledPop=true}/>}
    />
  );
}

export default DropdownSlider;
