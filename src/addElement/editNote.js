import React, { useContext, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { NoteContext } from "../context/noteReducer/noteContext";
//Функциональный Блок изменений карточки
function EditNote({ id_note, ItemsEdit,ClickSave }) {
  const { delete_note, edit_note, state_note } = useContext(NoteContext);

  return (
    <Dropdown className={"edit_drop"} inline floating labeled button>
      <Dropdown.Menu>
        {!ItemsEdit ? (
          <Dropdown.Item
            data-index={id_note}
            onClick={(e,id_note) => {ClickSave(e, id_note);edit_note(id_note, state_note.data_note);}}
          >
            Сохранить
          </Dropdown.Item>
        ) : (
          <Dropdown.Item
            data-index="1"
            onClick={() => edit_note(id_note, state_note.data_note)}
          >
            <SvgLoader path="../../img/Edit1.svg">
              <SvgProxy selector="#cst" />
            </SvgLoader>
            Редактировать
          </Dropdown.Item>
        )}

        <Dropdown.Item
          data-index="2"
          onClick={() => {
            delete_note(id_note, state_note.data_note);
          }}
        >
          <SvgLoader path="../../img/Delete1.svg">
            <SvgProxy selector="#cst" />
          </SvgLoader>
          Удалить
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default EditNote;
