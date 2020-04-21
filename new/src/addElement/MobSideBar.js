import React, { useState, useContext } from "react";
import { Menu, Sidebar } from "semantic-ui-react";
import ModalExit from "./modalExit";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { NavLink } from "react-router-dom";
import { ReduceContext } from "../context/reducerContext";
const SidebarExampleSidebar = () => {
  const [visible, setVisible] = useState(false);
  const { none } = useContext(ReduceContext);
  return (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        onHide={() => setVisible(false)}
        vertical
        visible={visible}
        width="thin">
        <div className="menu_head" onClick={() => visible===true?setVisible(false):setVisible(true)}>
          <div className="menu_head_row">
            <div className="elipse">A</div>
            <div className="text_name">АстроСофт</div>
          </div>
          <div className="button_sidebar">
            <SvgLoader path="../../img/Arrow_left.svg">
              <SvgProxy selector="#cod" />
            </SvgLoader>
          </div>
        </div>
        <ul className="menu_list">
          <li>
            <NavLink
              to="/"
              isActive={(match, location) => {
                return location.state === "/" || location.pathname === "/"
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

                return location.state === null || location.state === "null"
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
                return location.state === null || location.state === "null"
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
                return location.state === null || location.state === "null"
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
            <ModalExit />
          </li>
        </ul>
      </Sidebar>
    </Sidebar.Pushable>
  );
};

export default SidebarExampleSidebar;
