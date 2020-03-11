import React,{useContext} from "react";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { NavLink, useRouteMatch } from "react-router-dom";
import { Button } from "semantic-ui-react";
import Community from "../addElement/community";
import NotalCommunity from "../addElement/notal_community";
import ResultCardCurrencies from "../addElement/resultcardcurrencies";
import { ReduceContext } from "../context/reducerContext";


//Страница валюты
function CurrenciesNumber() {
  const {url} = useRouteMatch();
  const { hide, none, show } = useContext(ReduceContext);
  return (
    <div className="container_list">
      <div className="button_header">
        <NavLink to={"/сurrencies"}>
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
          Гривна
          </div>
          <NavLink to={`${url}/edit`}>
          <div className="edit_profile">Изменить</div>
          </NavLink>
        </div>
        <div className="unit_button_right">
          <Button onClick={none.visible ? show : hide}>Расчитать натальную карту</Button>
        </div>
      </div>
      <div className="unit_grid">
        <div className="unit_info_adress">
          <div className="d_flex_center">
            <div className="unit_info_left">Дата основания:</div>
            <div className="unit_info_right">24.08.1991</div>
          </div>
          <div className="d_flex_center">
            <div className="unit_info_left">Страна:</div>
            <div className="unit_info_right">Украина</div>
          </div>
        </div>
      </div>
      <ResultCardCurrencies></ResultCardCurrencies>
      <Community></Community>
      <NotalCommunity></NotalCommunity>
    </div>
  );
}
export default CurrenciesNumber;
