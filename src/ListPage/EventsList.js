import React, { useContext, useEffect } from "react";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { NavLink, useRouteMatch } from "react-router-dom";
import { Button } from "semantic-ui-react";
import Community from "../addElement/community";
import NotalCommunity from "../addElement/notal_community";
import { ReduceContext } from "../context/reducerContext";
import ResultCardEvents from "../addElement/resultcardevents";

//Страница Событий
function EventsList() {
  const { hide, none, show, Fetch_one_events,number_all } = useContext(ReduceContext);
  const { url } = useRouteMatch();
  function handleClick(){
    let numbers = url.replace(/\D+/g, "");
    number_all(numbers,url);
  }
  useEffect(() => {
    Fetch_one_events(url.replace(/\D+/g, ""));
  });

  return (
    <div className="container_list">
      <div className="button_header">
        <NavLink to={"/event"}>
          <div className="purple">
            <SvgLoader path="../../img/Arrow2.svg">
              <SvgProxy selector="#cst" />
            </SvgLoader>
            Назад
          </div>
        </NavLink>
      </div>
      {none.one_events && (
        <div>
          <div className="header_unite">
            <div className="unit_left">
              <div className="elipse_profiler"> {none.one_events.name[0]}</div>
              <div className="text_big_all name_profile">
                {none.one_events.name}
              </div>
              <NavLink to={`/event/${none.one_events.id}/edit`} onClick={handleClick}>
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
              <div>
                <div className="unit_info_right">Краткое описание:</div>
                <div className="text_events">
                {none.one_events.description}
                </div>
              </div>
            </div>
          </div>
          <ResultCardEvents></ResultCardEvents>
          <Community></Community>
          <NotalCommunity></NotalCommunity>
        </div>
      )}
    </div>
  );
}
export default EventsList;
