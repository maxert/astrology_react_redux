import React from "react";
import { NavLink } from "react-router-dom";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { Form, Button, Input, Icon, Checkbox } from "semantic-ui-react";
import { SelectLocation } from "../addElement/SelectLocation";

//Страница добавления компаний 

function CompanyAdd() {
  return (
    <div className="container_add">
      <div className="button_header">
        <NavLink to="/company">
          <div className="purple">
            <SvgLoader path="../img/Arrow2.svg">
              <SvgProxy selector="#cst" />
            </SvgLoader>
            Назад
          </div>
        </NavLink>
      </div>
      <div className="container_list container_create">
        <h2>Создание компании</h2>
        <Form className="create_persons">
          <div className="create_persons_left">
            <div className="personal_date all_box">
              <div className="text_all">Основные данные</div>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Название компании"
                  placeholder="Введите название компании"
                />
                <Form.Input
                  fluid
                  label="Основатель"
                  placeholder="Введите основателя"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input fluid type="email" label="E-mail" placeholder="Введите E-mail" />
                <Form.Input
                  fluid
                  label="Телефон"
                  placeholder="+38 (000)-000-00-00"
                />
              </Form.Group>
              <div className="grid_column">
                <Form.Input fluid label="Количество сотрудников" placeholder="Введите кол-во сотрудников" />
              </div>
              <Button>Сохранить</Button>
            </div>
            <div className="personal_date all_box">
              <div className="text_all">Место и время основания компании</div>
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

export default CompanyAdd;
