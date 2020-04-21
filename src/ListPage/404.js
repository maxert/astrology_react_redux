import React from "react";

import { SvgLoader, SvgProxy } from "react-svgmt";
import { Button } from "semantic-ui-react";
import { useHistory, useLocation } from "react-router";

//Блок 404
function NoErorrs() {
    const history = useHistory();
    const location = useLocation();
  return (
    <div className="container_list not_found">
      <SvgLoader path="../../img/404.svg">
        <SvgProxy selector="#cst" />
      </SvgLoader>
      <div className="no_match_row">
        <div className="no_match_text">
          К сожалению такой страницы больше не существует( <code>{location.pathname}</code> )
        </div>
        <Button onClick={()=>history.push("/")}>На главную</Button>
      </div>
    </div>
  );
}

export default NoErorrs;
