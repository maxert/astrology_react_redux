import React, { useEffect, useContext, useState } from "react";
import { Form, Button } from "semantic-ui-react";
// import { SvgLoader, SvgProxy } from "react-svgmt";
import { SmartBlock, Extensions, Image, Heading1 } from "smartblock";
import { useForm } from "react-hook-form";
import { useAlert } from "react-alert";
import { NoteContext } from "../context/noteReducer/noteContext";
Extensions.push(
  new Image({
    group: "blocks",
    parseDOM: [{ tag: "img" }, { style: "width=200px" }],
    toDOM: () => [
      "img",
      {
        style: "width:200px"
      }
    ]
  })
);
//Создание заметки
function CreateNote({ ID, Type }) {
  const { add_note } = useContext(NoteContext);
  const alert = useAlert();
  const [htmlDesc, setHtml] = useState("<p></p>");
  const { handleSubmit, register, errors } = useForm({
    reValidateMode: onSubmit
  });

  useEffect(() => {
    if (errors.name !== undefined) {
      alert.error("Введите название");
    }
  }, [errors]);
  function onSubmit(values) {
    values["description"] = htmlDesc;
    values["obj_type"] = Type;
    values["obj_id"] = ID;
    console.log(values);
    add_note(values);
  }
  return (
    <div className="create_note">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="text_all">Создать заметку</div>
        <Form.Field className="text_note">
          <label>Название заметки</label>
          <input
            type="text"
            name="name"
            className={"" + (errors.name ? "active" : "")}
            ref={register({
              required: true,
              pattern: /[0-9a-zA-Z!@#$%^&*]{0,}/i
            })}
          />
        </Form.Field>
        <div className="textarea_container">
          <div className="textarea_note">
            Заметка
            {/* <div className="checkbox">
              <div className="checkbox_list">
                <input type="checkbox" id="bold" />
                <label htmlFor="bold">
                  <SvgLoader path="../../img/В.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                </label>
              </div>
              <div className="checkbox_list">
                <input type="checkbox" id="italic" />
                <label htmlFor="italic">
                  <SvgLoader path="../../img/І.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                </label>
              </div>
              <div className="checkbox_list">
                <input type="checkbox" id="underline" />
                <label htmlFor="underline">
                  <SvgLoader path="../../img/U.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                </label>
              </div>
              <div className="checkbox_list">
                <input type="checkbox" id="createImg" />
                <label htmlFor="createImg">
                  <SvgLoader path="../../img/picture 2.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                </label>
              </div>
            </div> */}
          </div>
          <SmartBlock
            extensions={Extensions}
            html={htmlDesc}
            onChange={({ html }) => {
              setHtml(html);
            }}
          />
          {/* <Form.TextArea rows="8"/> */}
          <div className="button_footer">
            <Button>Создать</Button>
            <Button
              className="clear_buttton"
              type="reset"
              onClick={() => setHtml("<p></p>")}
            >
              Очистить
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
export default CreateNote;
