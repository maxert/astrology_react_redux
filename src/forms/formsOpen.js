import React from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";

const FormExampleForm = () => (
  <Form className="forms_element">
    <div className="head_form">
    Вход
    </div>
    <Form.Field>
      <label>Логин</label>
      <input type="text" />
    </Form.Field>
    <Form.Field>
      <label>Пароль</label>
      <input type="password" />
    </Form.Field>
    <Form.Field className="checkbox_element">
      <Checkbox label="Запомнить меня" />
      <div className="send_password">Напомнить пароль</div>
    </Form.Field>
    <Button type="submit">Войти</Button>
  </Form>
);

export default FormExampleForm;
