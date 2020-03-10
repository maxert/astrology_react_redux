import React, { useContext } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import { SvgLoader, SvgProxy } from "react-svgmt";
import Home from "./ListPage/Home";
import Company from "./ListPage/Company";
import Persons from "./ListPage/Persons";
import Countries from "./ListPage/Countries";
import Currencies from "./ListPage/Currencies";
import Events from "./ListPage/Events";
import Favorite from "./ListPage/Favorite";
import Forms from "./forms/formsOpen";
import { ReduceContext } from "./context/reducerContext";

function Astrology() {

  const { none } = useContext(ReduceContext);
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
                <NavLink to="/" exact={true} activeClassName="active">
                  <SvgLoader path="../img/Union.svg">
                    <SvgProxy selector="#cod" />
                  </SvgLoader>
                  <div className="img_list">
                    <SvgLoader path="../img/Home.svg">
                      <SvgProxy selector="#cos" />
                    </SvgLoader>
                  </div>
                  <div className="text_list">Главная</div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/persons">
                  <SvgLoader path="../img/Union.svg">
                    <SvgProxy selector="#cot" />
                  </SvgLoader>
                  <div className="img_list">
                    <SvgLoader path="../img/Persons.svg">
                      <SvgProxy selector="#cr" />
                    </SvgLoader>
                  </div>
                  <div className="text_list">
                    Персоны <div className="block_number">5</div>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/company">
                  <SvgLoader path="../img/Union.svg">
                    <SvgProxy selector="#ce" />
                  </SvgLoader>
                  <div className="img_list">
                    <SvgLoader path="../img/company.svg">
                      <SvgProxy selector="#cw" />
                    </SvgLoader>
                  </div>
                  <div className="text_list">
                    Компании<div className="block_number">5</div>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/сountries">
                  <SvgLoader path="../img/Union.svg">
                    <SvgProxy selector="#cl" />
                  </SvgLoader>
                  <div className="img_list">
                    <SvgLoader src="../img/country 1.svg">
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
                  <SvgLoader path="../img/Union.svg">
                    <SvgProxy selector="#cj" />
                  </SvgLoader>
                  <div className="img_list">
                    <SvgLoader path="../img/currency.svg">
                      <SvgProxy selector="#cjo" />
                    </SvgLoader>
                  </div>
                  <div className="text_list">
                    Валюты <div className="block_number">5</div>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/events">
                  <SvgLoader path="../img/Union.svg">
                    <SvgProxy selector="#ch" />
                  </SvgLoader>
                  <div className="img_list">
                    <SvgLoader path="../img/Calendar.svg">
                      <SvgProxy selector="#cg" />
                    </SvgLoader>
                  </div>
                  <div className="text_list">
                    События <div className="block_number">5</div>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/favorite">
                  <SvgLoader path="../img/Union.svg">
                    <SvgProxy selector="#cf" />
                  </SvgLoader>
                  <div className="img_list">
                    <SvgLoader path="../img/favorites.svg">
                      <SvgProxy selector="#cs" />
                    </SvgLoader>
                  </div>
                  <div className="text_list">
                    Избранное <div className="block_number">5</div>{" "}
                  </div>
                </NavLink>
              </li>
              <li>
                <div className="footer_menu">
                  <NavLink to="/exit">
                    <SvgLoader path="../img/logout.svg">
                      <SvgProxy selector="#ca" />
                    </SvgLoader>
                    <div className="footer_menu_text">
                      Сменить аккаунт/Выйти
                    </div>
                  </NavLink>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="container_right">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/persons" component={Persons} />
            <Route path="/company" component={Company} />
            <Route path="/сountries" component={Countries} />
            <Route path="/сurrencies" component={Currencies} />
            <Route path="/events" component={Events} />
            <Route path="/favorite" component={Favorite} />
            <Route path="/ASD" component={Favorite} />
          </Switch>
        </div>
      </div>

      {(none.isLogin === false) && (
        <div className="modal_open">
          <Forms></Forms>
        </div>
      )}
    </div>
  );
}

export default Astrology;
