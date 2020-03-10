import React from "react";
import { Form, Button } from "semantic-ui-react";
import { SvgLoader, SvgProxy } from "react-svgmt";

//Создание заметки
function CreateNote() {
  return (
    <div className="create_note">
      <Form>
        <div className="text_all">Создать заметку</div>
        <Form.Field className="text_note">
          <label>Название заметки</label>
          <input/>
        </Form.Field>
        <div className="textarea_container">
          <div className="textarea_note">
            Заметка
            <div className="checkbox">
              <div className="checkbox_list">
                <input type="checkbox" id="bold" />
                <label htmlFor="bold">
                  <SvgLoader path="../img/В.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                </label>
              </div>
              <div className="checkbox_list">
                <input type="checkbox" id="italic" />
                <label htmlFor="italic">
                  <SvgLoader path="../img/І.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                </label>
              </div>
              <div className="checkbox_list">
                <input type="checkbox" id="underline" />
                <label htmlFor="underline">
                  <SvgLoader path="../img/U.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                </label>
              </div>
              <div className="checkbox_list">
                <input type="checkbox" id="createImg" />
                <label htmlFor="createImg">
                  <SvgLoader path="../img/picture 2.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                </label>
              </div>
            </div>
          </div>
          <Form.TextArea rows="8"/>
          <div className="button_footer">
            <Button>Создать</Button>
            <Button className="clear_buttton">
            Очистить
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
export default CreateNote;
