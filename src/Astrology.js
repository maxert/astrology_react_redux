import React, { useContext, useEffect, useState, useRef } from "react";
import { Switch, Route, NavLink, Redirect, useRouteMatch } from "react-router-dom";
import { SvgLoader, SvgProxy } from "react-svgmt";
import Home from "./ListPage/Home";
import Company from "./ListPage/Company";
import Persons from "./ListPage/Persons";
import Countries from "./ListPage/Countries";
import Currencies from "./ListPage/Currencies";
import Events from "./ListPage/Events";
import Favorite from "./ListPage/Favorite";
import { ReduceContext } from "./context/reducerContext";
import ModalExit from "./addElement/modalExit";
import { ShowState } from "./context/show/showState";
import NotalHome from "./ListPage/NotalHome";
import { PersonsContext } from "./context/personReducer/personContext";
import { CompanyContext } from "./context/companyReducer/companyContext";

//Блок Навигации, и переход по разным страницам, через route
function Astrology() {
  const { none, fetch_number} = useContext(ReduceContext);
  const {state_persons} = useContext(PersonsContext);
  const {state_company} = useContext(CompanyContext);

  useEffect(() => {
    debugger
    fetch_number();
    
  }, [state_persons.data_persons!==undefined?state_persons.data_persons.count:false,state_company.data_company!==undefined?state_company.data_company.count:false]);


  return (
    <div className="container_home">
      <div className="container_center">
        <div className="menu_fix">
          <div className="container_left">
            <div className="menu_head">
              <div className="elipse">A</div>
              <div className="text_name">АстроСофт</div>
            </div>
            <ul className="menu_list">
              <li>
                <NavLink
                  to="/"
                  exact={none.data_link.type_id === "home_card" ? false : true}
                  activeClassName="active"
                >
                  <SvgLoader path="../../img/Union.svg">
                    <SvgProxy selector="#cod" />
                  </SvgLoader>
                  <div className="img_list">
                    <SvgLoader path="../../img/Home.svg">
                      <SvgProxy selector="#cos" />
                    </SvgLoader>
                  </div>
                  <div className="text_list">Главная</div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/person">
                  <SvgLoader path="../../img/Union.svg">
                    <SvgProxy selector="#cot" />
                  </SvgLoader>
                  <div className="img_list">
                    <SvgLoader path="../../img/Persons.svg">
                      <SvgProxy selector="#cr" />
                    </SvgLoader>
                  </div>
                  <div className="text_list">
                    Персоны{" "}
                    <div className="block_number">
                      {none.data_number && none.data_number.person}
                    </div>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/company">
                  <SvgLoader path="../../img/Union.svg">
                    <SvgProxy selector="#ce" />
                  </SvgLoader>
                  <div className="img_list">
                    <SvgLoader path="../../img/company.svg">
                      <SvgProxy selector="#cw" />
                    </SvgLoader>
                  </div>
                  <div className="text_list">
                    Компании
                    <div className="block_number">
                      {none.data_number && none.data_number.company}
                    </div>
                  </div>
                </NavLink>
              </li>
              {/* <li>
                  <NavLink to="/сountries">
                    <SvgLoader path="../../img/Union.svg">
                      <SvgProxy selector="#cl" />
                    </SvgLoader>
                    <div className="img_list">
                      <SvgLoader src="../../img/country 1.svg">
                        <SvgProxy selector="#ck" />
                      </SvgLoader>
                    </div>
                    <div className="text_list">
                      Страны<div className="block_number">5</div>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/сurrencies">
                    <SvgLoader path="../../img/Union.svg">
                      <SvgProxy selector="#cj" />
                    </SvgLoader>
                    <div className="img_list">
                      <SvgLoader path="../../img/currency.svg">
                        <SvgProxy selector="#cjo" />
                      </SvgLoader>
                    </div>
                    <div className="text_list">
                      Валюты <div className="block_number">5</div>
                    </div>
                  </NavLink>
                </li> */}
              <li>
                <NavLink to="/event">
                  <SvgLoader path="../../img/Union.svg">
                    <SvgProxy selector="#ch" />
                  </SvgLoader>
                  <div className="img_list">
                    <SvgLoader path="../../img/Calendar.svg">
                      <SvgProxy selector="#cg" />
                    </SvgLoader>
                  </div>
                  <div className="text_list">
                    События{" "}
                    <div className="block_number">
                      {none.data_number && none.data_number.event}
                    </div>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/favorite">
                  <SvgLoader path="../../img/Union.svg">
                    <SvgProxy selector="#cf" />
                  </SvgLoader>
                  <div className="img_list">
                    <SvgLoader path="../../img/favorites.svg">
                      <SvgProxy selector="#cs" />
                    </SvgLoader>
                  </div>
                  <div className="text_list">
                    Избранное{" "}
                    <div className="block_number">
                      {none.data_number && none.data_number.fav}
                    </div>
                  </div>
                </NavLink>
              </li>
              <li>
                <ModalExit></ModalExit>
              </li>
            </ul>
          </div>
        </div>
        <div className="container_right">
          <Switch>
            {none.isLogin === false ? (
              <Redirect to="/login" />
            ) : (
              <Route exact path="/" component={Home} />
            )}
            <Route path="/home_card" component={NotalHome} />
            <Route path="/person" component={Persons} />
            <Route path="/company" component={Company} />
            <Route path="/сountries" component={Countries} />
            <Route path="/сurrencies" component={Currencies} />
            <Route path="/event" component={Events} />
            <Route path="/favorite">
              <ShowState>
                <Favorite></Favorite>
              </ShowState>
            </Route>
          </Switch>
        </div>
      </div>

      {/* 
      {none.isLogin === false || localStorage.getItem("users") === null ? (
        <div className="modal_open">
          <Forms></Forms>
        </div>
      ) : (
        <div></div>
      )} */}
    </div>
  );
}

export default Astrology;
