import React, { useContext, useEffect, useState } from "react";
import { NavLink, useRouteMatch, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { Form, Button, Input, Icon, Checkbox } from "semantic-ui-react";
import SelectLocation from "../addElement/SelectLocation";
import NumberFormat from "react-number-format";

import { PersonsContext } from "../context/personReducer/personContext";
import { ReduceContext } from "../context/reducerContext";
import { DatePicker } from "antd";

//Блок Редактирования Персоны
function PersonsEdit() {
  const [count, setCount] = useState("");
  const { handleSubmit, register, errors } = useForm();
  const { url } = useRouteMatch();
  const { none, Fetch_one_persons } = useContext(ReduceContext);
  const { Update_persons } = useContext(PersonsContext);
  const history = useHistory();
  useEffect(() => {
    Fetch_one_persons(url.replace(/\D+/g, ""));
  }, []);

  const onSubmit = values => {
    values["timezone"] = none.option_value;
    Update_persons(values, none.one_persons.id);
  };
  return (
    <div className="container_add">
      {none.one_persons && (
        <div>
          <div className="button_header" onClick={()=>history.goBack()}>
            <div className="purple">
              <SvgLoader path="../../img/Arrow2.svg">
                <SvgProxy selector="#cst" />
              </SvgLoader>
              Назад
            </div>
          </div>
          <div className="container_list container_create">
            <h2>Редактирования персоны</h2>
            <Form className="create_persons" onSubmit={handleSubmit(onSubmit)}>
              <div className="create_persons_left">
                <div className="personal_date all_box">
                  <div className="text_all">Личные данные</div>
                  <div className="grid_column">
                    <Form.Field>
                      <label>Имя</label>
                      <input
                        type="text"
                        name="firstname"
                        placeholder="Введите имя"
                        defaultValue={none.one_persons.firstname}
                        className={"" + (errors.firstname ? "active" : "")}
                        ref={register({
                          required: true,
                          pattern: /^([а-яё]+|[a-z]+|[^\\s*]){3,16}$/i
                        })}
                      />
                      {errors.firstname && errors.firstname.message}
                    </Form.Field>

                    <Form.Field>
                      <label>Фамилия</label>
                      <input
                        type="text"
                        name="lastname"
                        label="Фамилия"
                        placeholder="Введите фамилию"
                        defaultValue={none.one_persons.lastname}
                        className={"" + (errors.lastname ? "active" : "")}
                        ref={register({
                          required: true,
                          pattern: /^([а-яё]+|[a-z]+|[^\\s*]){3,16}$/i
                        })}
                      />
                      {errors.lastname && errors.lastname.message}
                    </Form.Field>
                  </div>

                  <div className="grid_column">
                    <Form.Field>
                      <label>E-mail</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Введите email"
                        defaultValue={none.one_persons.email}
                        className={"" + (errors.email ? "active" : "")}
                        ref={register({
                          required: true,
                          pattern: /^\S+@\S+$/i
                        })}
                      />
                      {errors.email && errors.email.message}
                    </Form.Field>
                    <Form.Field>
                      <label>Телефон</label>
                      <NumberFormat
                        type="tel"
                        name="telephone"
                        format="+38 (###)-###-##-##"
                        mask="_"
                        defaultValue={none.one_persons.telephone}
                        className={"" + (errors.telephone ? "active" : "")}
                        placeholder="+38 (000)-000-00-00"
                        getInputRef={register({
                          required: true,
                          pattern: /\+[0-9]{2}[ .-](\([0-9]{3})\)([ .-]?)([0-9]{3})\2([0-9]{2})\2([0-9]{2})/g
                        })}
                        allowEmptyFormatting
                      />
                      {errors.telephone && errors.telephone.message}
                    </Form.Field>
                  </div>
                  <Button>Сохранить</Button>
                </div>
               
              </div>
              <div className="create_persons_right">
                <div className="block_image">
                  <div className="image_contaner_perons">
                    <img src="../../img/Photo 1.svg" alt=" " />
                  </div>
                  <div className="button_add">
                    <SvgLoader path="../../img/Photosm.svg">
                      <SvgProxy selector="#cst" />
                    </SvgLoader>{" "}
                    Добавить аватар
                  </div>
                  <input type="file" name="file" />
                </div>
              </div>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PersonsEdit;
