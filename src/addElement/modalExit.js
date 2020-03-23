import React, { useContext, useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import { SvgLoader, SvgProxy } from "react-svgmt";
import {ReduceContext} from "../context/reducerContext";
import { useHistory } from "react-router";

//Модальной окно ВЫХОДА
function ModalExit() {
  const { LogOut } = useContext(ReduceContext);
  const [open, setOpen] = useState(false);
  const history = useHistory();

  function handleClick() {
    LogOut();
    history.push("/login")
  }
  return (
    <div>
      <div className="footer_menu" onClick={()=>{setOpen(true)}}>
        <SvgLoader path="../../img/logout.svg">
          <SvgProxy selector="#ca" />
        </SvgLoader>
        <div className="footer_menu_text">Сменить аккаунт/Выйти</div>
      </div>

      <Modal
        open={open}
        onClose={()=>setOpen(false)}
        className="close_modal"
        closeIcon
      >
        <div className="header_close_modal">
          Подтверждение выхода из аккаунта
        </div>
        <div className="button_footer">
          <Button onClick={handleClick}>Подтвердить</Button>
          <Button className="reset" onClick={()=>setOpen(false)}>
            Отмена
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default ModalExit;
