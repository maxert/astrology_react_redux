import React from "react";
import "./styles.scss";
import { BrowserRouter as Router, Switch, Route, NavLink  } from "react-router-dom";
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
          <div>
            <div className="menu_head">
              <div className="elipse">A</div>
              <div className="text_name">АстроТаро</div>
            </div>
            <ul className="menu_list">
              <li>
                <NavLink  to="/" exact={true} activeClassName='active'>
                  <div className="img_list">
                    <img src="./img/Home.svg" alt="Картинка"/>
                  </div>
                  <div className="text_list">Главная</div>
                </NavLink >
              </li>
              <li>
                <NavLink  to="/element">1</NavLink >
              </li>
            </ul>
          </div>
          <div className="container_left">
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
