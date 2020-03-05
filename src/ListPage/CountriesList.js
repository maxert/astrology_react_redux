import React, { useContext } from "react";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { NavLink } from "react-router-dom";
import { Button } from "semantic-ui-react";
import Community from "../addElement/community";
import NotalCommunity from "../addElement/notal_community";
import { ReduceContext } from "../context/reducerContext";
import ResultCardPersons from "../addElement/resultcardpersons";

function CompanyList() {
  const { hide, none, show } = useContext(ReduceContext);
  return (
    <div className="container_list">
      <div className="button_header">
        <NavLink to={"/сountries"}>
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
          <div className="elipse_profiler">У</div>
          <div className="text_big_all name_profile">
          Украина
          </div>
          <NavLink to="/сountries/edit">
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
        <div className="unit_info_adress">
          <div className="d_flex_center">
            <div className="unit_info_left">Дата основания:</div>
            <div className="unit_info_right">24.08.1991</div>
          </div>
          <div className="d_flex_center">
            <div className="unit_info_left">Президент:</div>
            <div className="unit_info_right">Владимир Зеленский</div>
          </div>
        </div>
      </div>
      <ResultCardPersons></ResultCardPersons>
      <Community></Community>
      <NotalCommunity></NotalCommunity>
    </div>
  );
}
export default CompanyList;
