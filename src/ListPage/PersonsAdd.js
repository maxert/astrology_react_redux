import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { Form, Button, Input, Icon, Checkbox } from "semantic-ui-react";
import SelectLocation from "../addElement/SelectLocation";
import NumberFormat from "react-number-format";

import { PersonsContext } from "../context/personReducer/personContext";
import { ReduceContext } from "../context/reducerContext";
import { DatePicker } from "antd";

//Блок Добавление Персоны
function PersonsAdd() {
  const { handleSubmit, register, errors } = useForm();
  const [count, setCount] = useState("");
  const { none } = useContext(ReduceContext);
  const { Add_persons } = useContext(PersonsContext);
  const onSubmit = values => {
    values["timezone"] = none.option_value;
    Add_persons(values);
  };
  return (
    <div className="container_add">
      <div className="button_header">
        <NavLink to="/person">
          <div className="purple">
            <SvgLoader path="../../img/Arrow2.svg">
              <SvgProxy selector="#cst" />
            </SvgLoader>
            Назад
          </div>
        </NavLink>
      </div>
      <div className="container_list container_create">
        <h2>Создание персоны</h2>
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
            <div className="personal_date all_box">
              <div className="text_all">Место и время рождения</div>
              <div className="grid_column center_grid">
                <div className="input_all">
                  <Form.Field>
                    <Input placeholder="дд . мм . гггг">
                      <label>Дата</label>
                      <Icon className="icon_date">
                        <DatePicker
                          onChange={(data, dataString) => setCount(dataString)}
                        ></DatePicker>
                      </Icon>
                      <NumberFormat
                        type="text"
                        name="birth_date"
                        placeholder="дд . мм . гггг"
                        mask="_"
                        format="####-##-##"
                        value={count}
                        className={
                          "" + (errors.birth_date ? "date active" : "")
                        }
                        getInputRef={register({
                          required: true,
                          pattern: /[0-9a-zA-Z!@#$%^&*]{0,}/i
                        })}
                      />
                      {errors.birth_date && errors.birth_date.message}
                    </Input>
                  </Form.Field>
                </div>
                <Form.Field>
                  <label>Время рождения</label>
                  <NumberFormat
                    type="text"
                    name="birth_time"
                    placeholder="пример: 21:34"
                    mask="_"
                    format="##:##"
                    className={"" + (errors.birth_time ? "active" : "")}
                    getInputRef={register({
                      required: true,
                      pattern: /[0-9a-zA-Z!@#$%^&*]{0,}/i
                    })}
                  />
                  {errors.birth_time && errors.birth_time.message}
                </Form.Field>
              </div>
              <div className="grid_column center_grid location_input_top">
                <Form.Field>
                  <label>Место рождения</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="ул. Энергетическая 42, Харьков, Харьковская область"
                    className={"" + (errors.city ? "active" : "")}
                    ref={register({
                      required: true,
                      pattern: /[0-9a-zA-Z!@#$%^&*]{0,}/i
                    })}
                  />
                  {errors.city && errors.city.message}
                </Form.Field>
                <div className="input_all location_input">
                  <div className="text_localisation">Часовой пояс:</div>
                  <SelectLocation></SelectLocation>
                </div>
              </div>
              <Checkbox
                label="Летнее время"
                className="time_location"
              ></Checkbox>
              <div className="grid_column grid_small">
                <Form.Field>
                  <label>Долгота:</label>
                  <input
                    type="text"
                    name="longitude"
                    className={"" + (errors.longitude ? "active" : "")}
                    ref={register({
                      required: true,
                      pattern: /[0-9a-zA-Z!@#$%^&*]{0,}/i
                    })}
                  />
                  {errors.longitude && errors.longitude.message}
                </Form.Field>
                <Form.Field>
                  <label>Широта:</label>
                  <input
                    type="text"
                    name="latitude"
                    className={"" + (errors.latitude ? "active" : "")}
                    ref={register({
                      required: true,
                      pattern: /[0-9a-zA-Z!@#$%^&*]{0,}/i
                    })}
                  />
                  {errors.latitude && errors.latitude.message}
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
  );
}

export default PersonsAdd;
