import React from "react";
import { SvgLoader, SvgProxy } from "react-svgmt";
import EditDrop from "../addElement/editDropDown";
function NoteList() {
  return (
    <div className="note_list">
      <div className="text_all">Создать заметку</div>
      <div className="note_list_container">
        <div className="note_list_container_list">
          <div className="note_items">
            <div className="persons_items_head d_flex_center">
              <div className="container_info_persons d_flex_center">
                <div className="container_info_persons_name">
                  Какое-то назване заметки
                </div>
              </div>
              <div className="persons_edit">
                <EditDrop></EditDrop>
                <SvgLoader path="../img/Group5.svg">
                  <SvgProxy selector="#co" />
                </SvgLoader>
              </div>
            </div>
            <div className="note_list_date">12 февраля 2020, 12:43</div>
            <div className="note_list_comment">
              Трудолюбивые и скромные, без лишних слов делают свое дело.
              Какое-то время могут быть незаметными исполнителями, но в нужный
              момент проявят себя.
            </div>
          </div>
          <div className="note_items">
            <div className="persons_items_head d_flex_center">
              <div className="container_info_persons d_flex_center">
                <div className="container_info_persons_name">
                  Какое-то назване заметки
                </div>
              </div>
              <div className="persons_edit">
                <EditDrop></EditDrop>
                <SvgLoader path="../img/Group5.svg">
                  <SvgProxy selector="#co" />
                </SvgLoader>
              </div>
            </div>
            <div className="note_list_date">12 февраля 2020, 12:43</div>
            <div className="note_list_comment">
              Трудолюбивые и скромные, без лишних слов делают свое дело.
              Какое-то время могут быть незаметными исполнителями, но в нужный
              момент проявят себя.
            </div>
          </div>
          <div className="note_items">
            <div className="persons_items_head d_flex_center">
              <div className="container_info_persons d_flex_center">
                <div className="container_info_persons_name">
                  Какое-то назване заметки
                </div>
              </div>
              <div className="persons_edit">
                <EditDrop></EditDrop>
                <SvgLoader path="../img/Group5.svg">
                  <SvgProxy selector="#co" />
                </SvgLoader>
              </div>
            </div>
            <div className="note_list_date">12 февраля 2020, 12:43</div>
            <div className="note_list_comment">
              Трудолюбивые и скромные, без лишних слов делают свое дело.
              Какое-то время могут быть незаметными исполнителями, но в нужный
              момент проявят себя.
            </div>
          </div>
          <div className="note_items">
            <div className="persons_items_head d_flex_center">
              <div className="container_info_persons d_flex_center">
                <div className="container_info_persons_name">
                  Какое-то назване заметки
                </div>
              </div>
              <div className="persons_edit">
                <EditDrop></EditDrop>
                <SvgLoader path="../img/Group5.svg">
                  <SvgProxy selector="#co" />
                </SvgLoader>
              </div>
            </div>
            <div className="note_list_date">12 февраля 2020, 12:43</div>
            <div className="note_list_comment">
              Трудолюбивые и скромные, без лишних слов делают свое дело.
              Какое-то время могут быть незаметными исполнителями, но в нужный
              момент проявят себя.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NoteList;
