import React from "react";
import ReactDOM from "react-dom";
import Astrology from "./Astrology";
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";
import "./styles.scss";
import {ReducerState} from "./context/reducerState";

ReactDOM.render(
  <ReducerState>
    <Astrology />
  </ReducerState>,
  document.getElementById("root")
);

serviceWorker.unregister();
