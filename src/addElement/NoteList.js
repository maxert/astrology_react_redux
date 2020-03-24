import React, { useEffect, useContext, useState } from "react";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { NoteContext } from "../context/noteReducer/noteContext";
import EditNote from "./editNote";
import { SmartBlock, Extensions } from "smartblock";

//Блок Заметок
function NoteList({ Type, ID, id_node }) {
  const { Fetch_note, state_note, update_note } = useContext(NoteContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    Fetch_note(Type, ID);
  }, []);
  if (state_note.data_note >= 0) {
    return null;
  }
  function ClickSave(e, data) {
    update_note(data["data-index"], name, description,Type, ID);
  
  }
  return (
    <div className="note_list">
      <div className="text_all">Заметки</div>
      <div className="note_list_container">
        <div className="note_list_container_list">
          {state_note.data_note &&
            state_note.data_note.map(items =>
              !items.isEdit ? (
                <div className="note_items" key={items.id}>
                  <div className="persons_items_head d_flex_center">
                    <div className="container_info_persons d_flex_center">
                      <SmartBlock
                        extensions={Extensions}
                        html={`<div className="container_info_persons_name"> ${items.name}</div>`}
                        onChange={({ html }) => {
                          setName(html);
                        }}
                      />
                    </div>
                    <div className="persons_edit">
                      <EditNote
                        ID={ID}
                        id_note={items.id}
                        type_note={Type}
                        ItemsEdit={items.isEdit}
                        ClickSave={(e, data) => ClickSave(e, data)}
                      ></EditNote>
                      <SvgLoader path="../../img/Group5.svg">
                        <SvgProxy selector="#co" />
                      </SvgLoader>
                    </div>
                  </div>
                  <div className="note_list_date"> {items.created_at}</div>
                  <div className="note_list_comment">
                    <SmartBlock
                      extensions={Extensions}
                      html={items.description}
                      onChange={({ html }) => {
                        setDescription(html);
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="note_items" key={items.id}>
                  <div className="persons_items_head d_flex_center">
                    <div className="container_info_persons d_flex_center">
                      <div
                        className="container_info_persons_name"
                        dangerouslySetInnerHTML={{
                          __html: items.name
                        }}
                      ></div>
                    </div>
                    <div className="persons_edit">
                      <EditNote
                        ID={ID}
                        id_note={items.id}
                        type_note={Type}
                        ItemsEdit={items.isEdit}
                      ></EditNote>
                      <SvgLoader path="../../img/Group5.svg">
                        <SvgProxy selector="#co" />
                      </SvgLoader>
                    </div>
                  </div>
                  <div className="note_list_date"> {items.created_at}</div>
                  <div
                    className="note_list_comment"
                    dangerouslySetInnerHTML={{
                      __html: items.description
                    }}
                  ></div>
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
}
export default NoteList;
