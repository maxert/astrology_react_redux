import React, { useEffect, useContext, useState } from "react";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { NoteContext } from "../context/noteReducer/noteContext";
import EditNote from "./editNote";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.bubble.css";
import moment from "moment";

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
    update_note(data["data-index"], name, description, Type, ID);
  }
  return (
    <div className="note_list">
      <div className="text_all">Заметки</div>
      <div className="note_list_container">
        <div className="note_list_container_list">
          {state_note.data_note &&
            state_note.data_note.map((items, i) =>
              !items.isEdit ? (
                <div className="note_items" key={i}>
                  <div className="persons_items_head d_flex_center">
                    <div className="container_info_persons d_flex_center">
                      <ReactQuill
                        theme={null}
                        defaultValue={`<div className="container_info_persons_name"> ${items.name}</div>`}
                        onChange={(data) => {
                          setName(data);
                        }}
                      />
                    </div>
                    <div className="persons_edit">
                      <EditNote
                        ID={ID}
                        id_note={items.id}
                        type_note={Type}
                        ItemsEdit={items.isEdit}
                        ClickSave={(e, data) => ClickSave(e, data)}></EditNote>
                      <SvgLoader path="../../img/Group5.svg">
                        <SvgProxy selector="#co" />
                      </SvgLoader>
                    </div>
                  </div>
                  <div className="note_list_date">
                    {" "}
                    {moment(items.created_at, "YYYY-MM-DD").format(
                      "DD.MM.YYYY",
                    )}
                  </div>
                  <div className="note_list_comment">
                    <ReactQuill
                      theme="snow"
                      defaultValue={items.description}
                      onChange={(data) => {
                        setDescription(data);
                      }}
                      modules={{
                        toolbar: [
                          [{ header: "1" }, { header: "2" }, { font: [] }],
                          [{ size: [] }],
                          ["bold", "italic", "underline"],
                          [
                            { list: "ordered" },
                            { list: "bullet" },
                            { indent: "-1" },
                            { indent: "+1" },
                          ],
                          ["image"],
                          ["clean"],
                        ],
                        clipboard: {
                          // toggle to add extra line breaks when pasting HTML:
                          matchVisual: false,
                        },
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="note_items" key={i}>
                  <div className="persons_items_head d_flex_center">
                    <div className="container_info_persons d_flex_center">
                      <div
                        className="container_info_persons_name"
                        dangerouslySetInnerHTML={{
                          __html: items.name,
                        }}></div>
                    </div>
                    <div className="persons_edit">
                      <EditNote
                        ID={ID}
                        id_note={items.id}
                        type_note={Type}
                        ItemsEdit={items.isEdit}></EditNote>
                      <SvgLoader path="../../img/Group5.svg">
                        <SvgProxy selector="#co" />
                      </SvgLoader>
                    </div>
                  </div>
                  <div className="note_list_date">
                    {" "}
                    {moment(items.created_at, "YYYY-MM-DD").format(
                      "DD.MM.YYYY",
                    ) +
                      " " +
                      moment(items.created_at).format("HH:mm:ss")}
                  </div>
                  <div
                    className="note_list_comment"
                    dangerouslySetInnerHTML={{
                      __html: items.description,
                    }}></div>
                </div>
              ),
            )}
        </div>
      </div>
    </div>
  );
}
export default NoteList;
