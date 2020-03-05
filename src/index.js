import React from "react";
import ReactDOM from "react-dom";
import Astrology from "./Astrology";
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";
import "./styles.scss";
import { ConfigProvider } from 'antd';
import { ReducerState } from "./context/reducerState";
import { BrowserRouter as Router } from "react-router-dom";
import "antd/dist/antd.css";
import ru from 'antd/es/locale/ru_RU';

ReactDOM.render(
  <ConfigProvider locale={ru}>
    <ReducerState>
      <Router>
        <Astrology />
      </Router>
    </ReducerState>
  </ConfigProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
