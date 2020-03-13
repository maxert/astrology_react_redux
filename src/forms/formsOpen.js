import React, { useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import {ReduceContext} from "../context/reducerContext";



//Блок авторизации
function FormExampleForm() {
  const { handleSubmit, register, errors } = useForm();
  const { LogIn} = useContext(ReduceContext);

  const onSubmit = values => {
    LogIn(values);
  };
  return (
    <Form className="forms_element" onSubmit={handleSubmit(onSubmit)}>
      <div className="head_form">Вход</div>
      <Form.Field>
        <label>Логин</label>
        <input
          type="text"
          name="email"
          className={"" + (errors.email ? "active" : "")}
          ref={register({
            required: true,
            pattern: /[0-9a-zA-Z!@#$%^&*]{3,}/i
          })}
        />
        {errors.email && errors.email.message}
      </Form.Field>
      <Form.Field>
        <label>Пароль</label>

        <input
          type="password"
          name="password"
          className={"" + (errors.password ? "active" : "")}
          ref={register({
            required: true,
            min: 6,
            maxLength: 32,
            pattern: /[0-9a-zA-Z!@#$%^&*]{6,}/i
          })}
        />
        {errors.password && errors.password.message}
      </Form.Field>
      {/* <Form.Field className="checkbox_element">
        <Checkbox label="Запомнить меня" />
        <div className="send_password">Напомнить пароль</div>
      </Form.Field> */}
      <Button type="submit">Войти</Button>
    </Form>
  );
}

export default FormExampleForm;
