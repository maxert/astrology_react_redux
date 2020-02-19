import React from "react";
import ReactDOM from "react-dom";
import Astrology from "./Astrology";
import * as serviceWorker from "./serviceWorker";
import 'semantic-ui-css/semantic.min.css';
import "./styles.scss";

ReactDOM.render(<Astrology />, document.getElementById("root"));

serviceWorker.unregister();
