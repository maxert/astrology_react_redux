import React, { useContext, useEffect } from "react";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { NavLink, useRouteMatch } from "react-router-dom";
import { Button } from "semantic-ui-react";
import Community from "../addElement/community";
import NotalCommunity from "../addElement/notal_community";
import ResultCardPersons from "../addElement/resultcardpersons";
import { ReduceContext } from "../context/reducerContext";

import { ShowContext } from "../context/show/showContext";

//Страница Персоны
function PersonsUnit() {
  const { url } = useRouteMatch();
  const { number_all, Fetch_one_persons, none } = useContext(ReduceContext);
  const { hide, display, show } = useContext(ShowContext);

  useEffect(() => {
    Fetch_one_persons(url.replace(/\D+/g, ""));
  }, []);


  
  function handleClick() {
    let numbers = url.replace(/\D+/g, "");
    number_all(numbers, url);
  }

  return (
    <div className="container_list">
      <div className="button_header">
        <NavLink to="/person">
          <div className="purple">
            <SvgLoader path="../../img/Arrow2.svg">
              <SvgProxy selector="#cst" />
            </SvgLoader>
            Назад
          </div>
        </NavLink>
      </div>
      {none.one_persons && (
        <div>
          <div className="header_unite">
            <div className="unit_left">
              <div className="elipse_profiler">{none.one_persons.firstname[0]}</div>
              <div className="text_big_all name_profile">
                {none.one_persons.firstname + " " + none.one_persons.lastname}
              </div>
              <NavLink
                to={`/person/${none.one_persons.id}/edit`}
                onClick={handleClick}
              >
                <div className="edit_profile">Изменить</div>
              </NavLink>
            </div>
            <div className="unit_button_right">
              <Button onClick={display.visible ? show : hide}>
                Расчитать натальную карту
              </Button>
            </div>
          </div>
          <div className="unit_grid">
            <div className="unit_info_contact">
              <div className="d_flex_center">
                <div className="unit_info_left">Телефон:</div>
                <div className="unit_info_right">{none.one_persons.telephone}</div>
              </div>
              <div className="d_flex_center">
                <div className="unit_info_left">Email:</div>
                <div className="unit_info_right">{none.one_persons.email}</div>
              </div>
            </div>
            <div className="unit_info_adress">
              <div className="d_flex_center">
                <div className="unit_info_left">День рождения:</div>
                <div className="unit_info_right">{none.one_persons.birth_date}</div>
              </div>
              <div className="d_flex_center">
                <div className="unit_info_left">Город:</div>
                <div className="unit_info_right">{none.one_persons.city}</div>
              </div>
              <div className="d_flex_center">
                <div className="unit_info_left">Часовой пояс:</div>
                <div className="unit_info_right">
                  GMT+{none.one_persons.timezone}
                </div>
              </div>
            </div>
          </div>

          <ResultCardPersons></ResultCardPersons>
          <Community></Community>
          <NotalCommunity></NotalCommunity>
        </div>
      )}
    </div>
  );
}
export default PersonsUnit;
