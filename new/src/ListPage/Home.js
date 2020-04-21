import React from "react";

import FormsCreate from "../forms/formsCreate";
import { FormsPosition } from "../forms/formsPosition";
import History from "../addElement/History";
import { ShowState } from "../context/show/showState";
import SearchHome from "../addElement/SearchHome";
import { GeoState } from "../context/geolocation/GeoState";

//Блок Главной страниццы
function Home() {
  
  return (
    <div className="container_list">
      <div className="search_container_home">
        <SearchHome />
      </div>

      <div className="container_grid">
        <div className="container_left_two">
          <div className="create_notal_card">
            <div className="create_notal_card_head">
              <div className="text_all">Создать натальную карту</div>
            </div>
            <div className="create_notal_card_container">
              <GeoState>
                <FormsCreate></FormsCreate>
              </GeoState>
            </div>
          </div>
        </div>
        <div className="container_all">
          <ShowState>
            <FormsPosition></FormsPosition>
          </ShowState>
          <History></History>
        </div>
      </div>
    </div>
  );
}

export default Home;
