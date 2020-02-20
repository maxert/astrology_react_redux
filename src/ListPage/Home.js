import React, { Component } from "react";
import Search from "../addElement/search";
import FormsCreate from "../forms/formsCreate";
import { FormsPosition } from "../forms/formsPosition";
import { History } from "../addElement/History";

export default class Home extends Component {
  render() {
    return (
    
      <div className="container_list">

        <div className="search_container">
          <Search />
        </div>
        <div className="container_grid">
          <div className="container_left_two">
            <div className="create_notal_card">
              <div className="create_notal_card_head">
                <div className="text_all">Создать натальную карту</div>
              </div>
              <div className="create_notal_card_container">
                <FormsCreate></FormsCreate>
              </div>
            </div>
          </div>
          <div className="container_all">
            <FormsPosition></FormsPosition>
            <History></History>
          </div>
        </div>
      </div>
    );
  }
}