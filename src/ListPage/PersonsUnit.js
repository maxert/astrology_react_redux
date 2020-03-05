import React, { useContext } from "react";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { NavLink } from "react-router-dom";
import { Button } from "semantic-ui-react";
import Community from "../addElement/community";
import NotalCommunity from "../addElement/notal_community";
import ResultCardPersons from "../addElement/resultcardpersons";
import { ReduceContext } from "../context/reducerContext";

function PersonsUnit() {
  const { hide, none, show } = useContext(ReduceContext);
  return (
    <div className="container_list">
      <div className="button_header">
        <NavLink to="/persons">
          <div className="purple">
            <SvgLoader path="../img/Arrow2.svg">
              <SvgProxy selector="#cst" />
            </SvgLoader>
            Назад
          </div>
        </NavLink>
      </div>
      <div className="header_unite">
        <div className="unit_left">
          <div className="elipse_profiler">
            <img src="../img/Rectangle 89.png" alt="Картинка" />
          </div>
          <div className="text_big_all name_profile">
            Ростислав Кардашевский
          </div>
          <NavLink to="/persons/edit">
          <div className="edit_profile">Изменить</div>
          </NavLink>
        </div>
        <div className="unit_button_right">
          <Button onClick={none.visible ? show : hide}>
            Расчитать натальную карту
          </Button>
        </div>
      </div>
      <div className="unit_grid">
        <div className="unit_info_contact">
          <div className="d_flex_center">
            <div className="unit_info_left">Телефон:</div>
            <div className="unit_info_right">+380 (00) 000 0000</div>
          </div>
          <div className="d_flex_center">
            <div className="unit_info_left">Email:</div>
            <div className="unit_info_right">rostkardash.gmail.com</div>
          </div>
        </div>
        <div className="unit_info_adress">
          <div className="d_flex_center">
            <div className="unit_info_left">День рождения:</div>
            <div className="unit_info_right">20.06.2006</div>
          </div>
          <div className="d_flex_center">
            <div className="unit_info_left">Город:</div>
            <div className="unit_info_right">Зеленодольск</div>
          </div>
          <div className="d_flex_center">
            <div className="unit_info_left">Часовой пояс:</div>
            <div className="unit_info_right">GMT+2</div>
          </div>
        </div>
      </div>

      <ResultCardPersons></ResultCardPersons>
      <Community></Community>
      <NotalCommunity></NotalCommunity>
    </div>
  );
}
export default PersonsUnit;
