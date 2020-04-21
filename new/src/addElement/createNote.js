import React, { useEffect, useContext, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import { useAlert } from "react-alert";
import { NoteContext } from "../context/noteReducer/noteContext";

//Создание заметки
function CreateNote({ ID, Type }) {
  const { add_note } = useContext(NoteContext);
  const alert = useAlert();
  const [htmlDesc, setHtml] = useState("<p key={0}> </p>");
  const { handleSubmit, register, errors, setValue } = useForm({
    reValidateMode: onSubmit,
  });

  useEffect(() => {
    if (errors.name !== undefined) {
      alert.error("Введите название");
    } else {
      setHtml("");
      setValue("name", "");
    }
  }, [errors]);
  function onSubmit(values) {
    values["description"] = htmlDesc;
    values["obj_type"] = Type;
    values["obj_id"] = ID;

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
              pattern: /[0-9a-zA-Z!@#$%^&*]{0,}/i,
            })}
          />
        </Form.Field>
        <div className="textarea_container">
          <div className="textarea_note">Заметка</div>
          <ReactQuill
            theme="snow"
            value={htmlDesc}
            onChange={(data) => {
              setHtml(data);
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
          <div className="button_footer">
            <Button>Создать</Button>
            <Button
              className="clear_buttton"
              type="reset"
              onClick={() => {
                setHtml(" ");
              }}>
              Очистить
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
export default CreateNote;
