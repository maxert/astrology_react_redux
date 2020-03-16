import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { Form, Button, Input, Icon, Checkbox } from "semantic-ui-react";
import SelectLocation from "../addElement/SelectLocation";
import { DatePicker } from "antd";

//Страница Редактирования валют
function CurrenciesEdit() {
  const [count, setCount] = useState("");
  return (
    <div className="container_add">
      <div className="button_header">
        <NavLink to="/сurrencies">
          <div className="purple">
            <SvgLoader path="../../img/Arrow2.svg">
              <SvgProxy selector="#cst" />
            </SvgLoader>
            Назад
          </div>
        </NavLink>
      </div>
      <div className="container_list container_create">
        <h2>Редактирование валюты</h2>
        <Form className="create_persons">
          <div className="create_persons_left">
            <div className="personal_date all_box">
              <div className="text_all">Личные данные</div>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Название Валюты"
                  placeholder="Введите Валюту"
                />
                <Form.Input fluid label="Страна" placeholder="Введите страну" />
              </Form.Group>
              <Button>Сохранить</Button>
            </div>
            <div className="personal_date all_box">
              <div className="text_all">Место и время основания валюты</div>
              <Form.Group widths="equal" className="grid_column center_grid">
                <div className="input_all">
                  <Input placeholder="дд . мм . гггг">
                    <label>Дата</label>
                    <Icon className="icon_date">
                      <DatePicker
                        onChange={(data, dataString) => setCount(dataString)}
                      ></DatePicker>
                    </Icon>
                    <input className="date" value={count}/>
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
          <div className="create_persons_left">
            <div className="block_image">
              <div className="image_contaner_perons">У</div>
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

export default CurrenciesEdit;
