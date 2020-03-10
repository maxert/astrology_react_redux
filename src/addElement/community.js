import React from "react";
import Slider from "../addElement/Slider"

//Блок связи с слайдером
function Community() {

  return (
    <div className="communication">
      <div className="text_big_all">Связи</div>
      <div className="communication_slider_contenter">
        <Slider></Slider>
      </div>
    </div>
  );
}
export default Community;
