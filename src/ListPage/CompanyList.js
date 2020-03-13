import React, { useContext, useEffect } from "react";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { NavLink, useRouteMatch } from "react-router-dom";
import { Button } from "semantic-ui-react";
import Community from "../addElement/community";
import NotalCommunity from "../addElement/notal_community";
import { ReduceContext } from "../context/reducerContext";
import ResultCardPersons from "../addElement/resultcardpersons";

//Страница компании
function CompanyList() {
  const { url } = useRouteMatch();
  const { hide, none, show, Fetch_one_company,number_all } = useContext(ReduceContext);
  useEffect(() => {
    Fetch_one_company(url.replace(/\D+/g, ""));
  });
  function handleClick(){
    let numbers = url.replace(/\D+/g, "");
    number_all(numbers,url);
  }
  return (
    <div className="container_list">
      <div className="button_header">
        <NavLink to={"/company"}>
          <div className="purple">
            <SvgLoader path="../../img/Arrow2.svg">
              <SvgProxy selector="#cst" />
            </SvgLoader>
            Назад
          </div>
        </NavLink>
      </div>
      {none.one_company && (
        <div>
          <div className="header_unite">
            <div className="unit_left">
              <div className="elipse_profiler">{none.one_company.name[0]}</div>
              <div className="text_big_all name_profile">
                {none.one_company.name}
              </div>
              <NavLink to={`/company/${none.one_company.id}/edit`} onClick={handleClick}>
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
                <div className="unit_info_right">
                  {none.one_company.telephone}
                </div>
              </div>
              <div className="d_flex_center">
                <div className="unit_info_left">Email:</div>
                <div className="unit_info_right">{none.one_company.email}</div>
              </div>
            </div>
            <div className="unit_info_adress">
              <div className="d_flex_center">
                <div className="unit_info_left">Дата основания:</div>
                <div className="unit_info_right">
                  {none.one_company.birth_date}
                </div>
              </div>
              <div className="d_flex_center">
                <div className="unit_info_left">Город:</div>
                <div className="unit_info_right">{none.one_company.city}</div>
              </div>
            </div>
            <div className="unit_info_company">
              <div className="d_flex_center">
                <div className="unit_info_left">Основатель:</div>
                <div className="unit_info_right">
                  {none.one_company.osnovatel}
                </div>
              </div>
              <div className="d_flex_center">
                <div className="unit_info_left">Количестов сотрудников:</div>
                <div className="unit_info_right">
                  {none.one_company.cnt_workers} чел.
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
export default CompanyList;
