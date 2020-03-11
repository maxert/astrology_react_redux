import React from "react";
import ReactDOM from "react-dom";
import Astrology from "./Astrology";
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";
import "./styles.scss";
import logger from "redux-logger";
import { ConfigProvider } from "antd";
import { ReducerState } from "./context/reducerState";
import { AlertReducer } from "./context/reducer";
import { BrowserRouter as Router } from "react-router-dom";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import ru from "antd/es/locale/ru_RU";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(AlertReducer,composeWithDevTools(applyMiddleware(logger)));
//Основной блок где рендерится все елементы в указанный класс root
ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={ru}>
      <ReducerState store={store}>
        <Router>
          <Astrology />
        </Router>
      </ReducerState>
    </ConfigProvider>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
