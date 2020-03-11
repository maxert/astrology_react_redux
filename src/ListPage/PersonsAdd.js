import React from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { Form, Button, Input, Icon, Checkbox } from "semantic-ui-react";
import { SelectLocation } from "../addElement/SelectLocation";
import NumberFormat from "react-number-format";
//Блок Добавление Персоны
function PersonsAdd() {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = values => {
    console.log(values);
  };
  return (
    <div className="container_add">
      <div className="button_header">
        <NavLink to="/persons">
          <div className="purple">
            <SvgLoader path="../img/Arrow2.svg">
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
                    name="text"
                    placeholder="Введите имя"
                    className={"" + (errors.text ? "active" : "")}
                    ref={register({
                      required: true,
                      pattern:/^([а-яё]+|[a-z]+){3,16}$/i
                    })}
                  />
                  {errors.text && errors.text.message}
                </Form.Field>

                <Form.Field>
                  <label>Фамилия</label>
                  <input
                    type="text"
                    name="textTwo"
                    label="Фамилия"
                    placeholder="Введите фамилию"
                    className={"" + (errors.textTwo ? "active" : "")}
                    ref={register({
                      required: true,
                      pattern:/^([а-яё]+|[a-z]+){3,24}$/i
                    })}
                  />
                  {errors.textTwo && errors.textTwo.message}
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
                    name="tel"
                    format="+38 (###)-###-##-##"
                    mask="_"
                    className={"" + (errors.email ? "active" : "")}
                    placeholder="+38 (000)-000-00-00"
                    getInputRef={register({
                      required: true,
                     pattern:/\+[0-9]{2}[ .-](\([0-9]{3})\)([ .-]?)([0-9]{3})\2([0-9]{2})\2([0-9]{2})/g
                    })}
                    allowEmptyFormatting
                  />
                  {errors.tel && errors.tel.message}
                </Form.Field>
              </div>
              <Button>Сохранить</Button>
            </div>
            <div className="personal_date all_box">
              <div className="text_all">Место и время рождения</div>
              <Form.Group widths="equal" className="grid_column center_grid">
                <div className="input_all">
                  <Input placeholder="дд . мм . гггг">
                    <label>Дата</label>
                    <Icon className="icon_date" />
                    <input className="date" />
                  </Input>
                </div>
                <Form.Input
                  fluid
                  label="Время рождения"
                  placeholder="пример: 21:34"
                />
              </Form.Group>
              <Form.Group
                widths="equal"
                className="grid_column center_grid location_input_top"
              >
                <Form.Input
                  fluid
                  label="Место рождения"
                  placeholder="ул. Энергетическая 42, Харьков, Харьковская область"
                />
                <div className="input_all location_input">
                  <div className="text_localisation">Часовой пояс:</div>
                  <SelectLocation></SelectLocation>
                </div>
              </Form.Group>
              <Checkbox
                label="Летнее время"
                className="time_location"
              ></Checkbox>
              <div className="grid_column">
                <div className="input_all">
                  <Input>
                    <label>Долгота:</label>
                    <input className="longitude" />
                  </Input>
                </div>
                <div className="input_all">
                  <Input>
                    <label>Широта:</label>
                    <input className="latitude" />
                  </Input>
                </div>
              </div>
              <Button>Сохранить</Button>
            </div>
          </div>
          <div className="create_persons_right">
            <div className="block_image">
              <div className="image_contaner_perons">
                <img src="../img/Photo 1.svg" alt=" " />
              </div>
              <div className="button_add">
                <SvgLoader path="../img/Photosm.svg">
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
