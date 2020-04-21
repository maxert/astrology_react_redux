import React from "react";

import { Button, Popup } from "semantic-ui-react";

//Выпадающий список слайдера
function DropdownSlider({ Content, handleClose, Close, handleCloseOpen }) {
  return (
    <Popup
      eventsEnabled={true}
      open={Close}
      pinned={true}
      className="popup_slider"
      onClose={() => handleCloseOpen()}
      content={Content}
      on="click"
      trigger={<Button onClick={handleClose} />}></Popup>
  );
}

export default DropdownSlider;
