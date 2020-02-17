import React from "react";
import "./styles.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import { SvgLoader, SvgProxy } from "react-svgmt";
import Search from "./addElement/search";
function About() {
  return <h2>Home</h2>;
}
function Element() {
  return <h2>Text</h2>;
}
function Home() {
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
                <NavLink to="/element">
                  <SvgLoader path="./img/Union.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                  1
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="container_right">
            <div className="search_container">
              <Search></Search>
            </div>
            <Switch>
              <Route exact path="/">
                <About>1</About>
              </Route>
              <Route path="/element">
                <Element></Element>
              </Route>
              <Route path="/users"></Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default Home;
