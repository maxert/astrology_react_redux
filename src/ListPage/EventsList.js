import React, { useContext } from "react";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { NavLink, useRouteMatch } from "react-router-dom";
import { Button } from "semantic-ui-react";
import Community from "../addElement/community";
import NotalCommunity from "../addElement/notal_community";
import { ReduceContext } from "../context/reducerContext";
import ResultCardEvents from "../addElement/resultcardevents";



//Страница Событий 
function EventsList() {
  const { hide, none, show } = useContext(ReduceContext);
  const {url} = useRouteMatch;
  return (
    <div className="container_list">
      <div className="button_header">
        <NavLink to="/events">
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
          <div className="elipse_profiler">E</div>
          <div className="text_big_all name_profile">
            Ещё одно название события
          </div>
          <NavLink to={`${url}/edit`}>
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
          <div>
            <div className="unit_info_right">Краткое описание:</div>
            <div className="text_events">
              Вдумчивые, сдержанные и чрезвычайно серьезные люди. Еще будучи
              ребенком, они определяются с тем, чего хотят от.
            </div>
          </div>
        </div>
      </div>
      <ResultCardEvents></ResultCardEvents>
      <Community></Community>
      <NotalCommunity></NotalCommunity>
    </div>
  );
}
export default EventsList;
