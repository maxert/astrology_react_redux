import React, { useContext, useEffect } from "react";
import {
  Switch,
  Route,
  NavLink,
  Redirect,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
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
import { EventContext } from "./context/eventReducer/eventContext";
import SidebarExampleSidebar from "./addElement/MobSideBar";

//Блок Навигации, и переход по разным страницам, через route
function Astrology() {
  const { pathname } = useLocation();

  const {
    none,
    fetch_number,
    favorite_select,
    search_select,
    width_mobile,
  } = useContext(ReduceContext);
  const { state_persons } = useContext(PersonsContext);
  const { state_company } = useContext(CompanyContext);
  const { state_event } = useContext(EventContext);

  const { url } = useRouteMatch();
  useEffect(() => {
    let urls = {
      type_link:
        `/api/` +
        (url.indexOf("person") === 1
          ? "persons"
          : url.indexOf("company") === 1
          ? "companies"
          : url.indexOf("event") === 1
          ? "events"
          : "persons"),
      type_id:
        url.indexOf("person") === 1
          ? "person"
          : url.indexOf("company") === 1
          ? "company"
          : url.indexOf("event") === 1
          ? "event"
          : url.indexOf("home_card") === 1
          ? "home_card"
          : "person",
    };
    favorite_select(urls.type_link, urls.type_id);
    search_select(urls.type_link, urls.type_id);
  }, [url]);

  useEffect(() => {
    window.addEventListener("resize", width_mobile);
    return () => window.removeEventListener("resize", width_mobile);
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    fetch_number();
  }, [
    state_persons.data_persons !== undefined
      ? state_persons.data_persons.count
      : false,
    state_company.data_company !== undefined
      ? state_company.data_company.count
      : false,
    state_event.data_events !== undefined
      ? state_event.data_events.count
      : false,
  ]);

  return (
    none !== undefined && (
      <div className="container_home">
        <div className="container_center">
          <div className="menu_fix">
            {none.width_mob <= 1280 ? (
              <SidebarExampleSidebar></SidebarExampleSidebar>
            ) : (
              <div className="container_left">
                <div className="menu_head">
                  <div className="elipse">A</div>
                  <div className="text_name">АстроСофт</div>
                </div>
                <ul className="menu_list">
                  <li>
                    <NavLink
                      to="/"
                      isActive={(match, location) => {
                        return location.state === "/" ||
                          location.pathname === "/"
                          ? location.pathname
                          : false || location.pathname === "/home_card";
                      }}>
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
                    <NavLink
                      to="/person"
                      isActive={(match, location) => {
                        if (!match) {
                          return false;
                        }

                        return location.state === null ||
                          location.state === "null"
                          ? location.pathname
                          : false;
                      }}>
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
                    <NavLink
                      to="/company"
                      isActive={(match, location) => {
                        if (!match) {
                          return false;
                        }
                        return location.state === null ||
                          location.state === "null"
                          ? location.pathname
                          : false;
                      }}>
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
                    <NavLink
                      to="/event"
                      isActive={(match, location) => {
                        if (!match) {
                          return false;
                        }
                        return location.state === null ||
                          location.state === "null"
                          ? location.pathname
                          : false;
                      }}>
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
                    <NavLink
                      to={"/favorite"}
                      isActive={(match, location) => {
                        return location.state === "/favorite" ||
                          location.pathname === "/favorite"
                          ? location.pathname
                          : false;
                      }}>
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
            )}
          </div>
          <div className="container_right">
            <Switch>
              {none.isLogin === false ? (
                <Redirect to="/login" />
              ) : (
                <Route exact path="/" component={Home} />
              )}

              <Route path="/home_card">
                <ShowState>
                  <NotalHome></NotalHome>
                </ShowState>
              </Route>
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
    )
  );
}

export default Astrology;
