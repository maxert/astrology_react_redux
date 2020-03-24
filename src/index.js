import React from "react";
import ReactDOM from "react-dom";
import Astrology from "./Astrology";
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";
import "./styles.scss";
import logger from "redux-logger";
import { ConfigProvider } from "antd";
import "smartblock/css/smartblock.css";
import { ReducerState } from "./context/reducerState";
import { AlertReducer } from "./context/reducer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import "antd/dist/antd.css";
import ru from "antd/es/locale/ru_RU";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import Forms from "./forms/formsOpen";
import { PersonsReducer } from "./context/personReducer/personReducer";
import { CompanyReducer } from "./context/companyReducer/companyReducer";
import { EventReducer } from "./context/eventReducer/eventReducer";
import { PersonState } from "./context/personReducer/personState";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { createBrowserHistory } from "history";
const options = {
  timeout: 5000,
  position: positions.TOP_CENTER
};
const store = createStore(
  (AlertReducer, PersonsReducer, CompanyReducer, EventReducer),
  composeWithDevTools(applyMiddleware(logger))
);
const history = createBrowserHistory();
//Основной блок где рендерится все елементы в указанный класс root
ReactDOM.render(
  <Provider store={store} template={AlertTemplate} {...options}>
    <ConfigProvider locale={ru}>
      <Router history={history}>
        <ReducerState store={store}>
          <PersonState>
            <Switch>
              <Route path="/login">
                <Forms></Forms>
              </Route>
              <Route path="/:q">
                <Astrology />
              </Route>
              <Route path="/">
                <Astrology />
              </Route>
            </Switch>
          </PersonState>
        </ReducerState>
      </Router>
    </ConfigProvider>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
