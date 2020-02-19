import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import { SvgLoader, SvgProxy } from "react-svgmt";
import Home from "./ListPage/Home";
import Company from "./ListPage/Company";
import Persons from "./ListPage/Persons";
import Countries from "./ListPage/Countries";
import Currencies from "./ListPage/Currencies";
import Events from "./ListPage/Events";
import Favorite from "./ListPage/Favorite";
import Forms from "./forms/formsOpen";
function Astrology() {
  return (
    <div className="container_home">
      <Router>
        <div className="container_center">
          <div className="container_left">
            <div className="menu_head">
              <div className="elipse">A</div>
              <div className="text_name">АстроТаро</div>
            </div>
            <ul className="menu_list">
              <li>
                <NavLink to="/" exact={true} activeClassName="active">
                  <SvgLoader path="./img/Union.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                  <div className="img_list">
                    <SvgLoader path="./img/Home.svg">
                      <SvgProxy selector="#co" />
                    </SvgLoader>
                  </div>
                  <div className="text_list">Главная</div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/persons">
                  <SvgLoader path="./img/Union.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                  <div className="img_list">
                    <SvgLoader path="./img/Persons.svg">
                      <SvgProxy selector="#co" />
                    </SvgLoader>
                  </div>
                  <div className="text_list">Персоны</div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/company">
                  <SvgLoader path="./img/Union.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                  <div className="img_list">
                    <SvgLoader path="./img/company.svg">
                      <SvgProxy selector="#co" />
                    </SvgLoader>
                  </div>
                  <div className="text_list">Компании</div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/сountries">
                  <SvgLoader path="./img/Union.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                  <div className="img_list">
                    <SvgLoader path="./img/сountries.svg">
                      <SvgProxy selector="#co" />
                    </SvgLoader>
                  </div>
                  <div className="text_list">Страны</div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/сurrencies">
                  <SvgLoader path="./img/Union.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                  <div className="img_list">
                    <SvgLoader path="./img/currency.svg">
                      <SvgProxy selector="#co" />
                    </SvgLoader>
                  </div>
                  <div className="text_list">Валюты</div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/events">
                  <SvgLoader path="./img/Union.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                  <div className="img_list">
                    <SvgLoader path="./img/Calendar.svg">
                      <SvgProxy selector="#co" />
                    </SvgLoader>
                  </div>
                  <div className="text_list">События</div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/favorite">
                  <SvgLoader path="./img/Union.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                  <div className="img_list">
                    <SvgLoader path="./img/favorites.svg">
                      <SvgProxy selector="#co" />
                    </SvgLoader>
                  </div>
                  <div className="text_list">Избранное</div>
                </NavLink>
              </li>
              <li>
                <div className="footer_menu">
                  <NavLink to="/exit">
                    <SvgLoader path="./img/logout.svg">
                      <SvgProxy selector="#co" />
                    </SvgLoader>
                    <div className="footer_menu_text">
                      Сменить аккаунт/Выйти
                    </div>
                  </NavLink>
                </div>
              </li>
            </ul>
          </div>
          <div className="container_right">
            <Switch>
              <Route exact path="/">
                <Home></Home>
              </Route>
              <Route path="/persons">
                <Persons></Persons>
              </Route>
              <Route path="/company">
                <Company></Company>
              </Route>
              <Route path="/сountries">
                <Countries></Countries>
              </Route>
              <Route path="/сurrencies">
                <Currencies></Currencies>
              </Route>
              <Route path="/events">
                <Events></Events>
              </Route>
              <Route path="/favorite">
                <Favorite></Favorite>
              </Route>
              <Route path="/ASD">
                <Favorite></Favorite>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
      <div className="modal_open">
        <Forms></Forms>
      </div>
    </div>
  );
}

export default Astrology;
