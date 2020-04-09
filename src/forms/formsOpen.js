import React, { useContext, useEffect } from "react";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { ReduceContext } from "../context/reducerContext";
import { useHistory } from "react-router";
import { useAlert } from "react-alert";

//Блок авторизации
function FormExampleForm() {
  const { handleSubmit, register, errors } = useForm();
  const alert = useAlert()
  const { LogIn, none } = useContext(ReduceContext);
  const history = useHistory();
  const onSubmit = values => {
    LogIn(values);
  };

  useEffect(() => {
    if (errors.email !== undefined) {
      alert.error("Введите логин");
    }
    if (errors.password !== undefined) {
      alert.error("Введите пароль");
    }
    
  }, [errors]);


  useEffect(()=>{
    if (none.isLogin === true) {
      history.push("/");
    }
  },[none])
  return (
    <div className="modal_open">
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


        <Button type="submit">Войти</Button>
      </Form>
    </div>
  );
}

export default FormExampleForm;
