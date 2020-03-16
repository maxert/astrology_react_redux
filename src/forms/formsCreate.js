import React, { useState } from "react";
import { Icon, Input, Checkbox, Button } from "semantic-ui-react";
import SelectLocation from "../addElement/SelectLocation";
import { DatePicker } from "antd";
import NumberFormat from "react-number-format";

//Форма создания натальной карты пользователя на главной странице

function InputExampleIconChild() {
  const [count, setCount] = useState("");
  return (
    <form className="forms_create">
      <div className="input_all">
        {/* <DateTimeForm></DateTimeForm> */}
        <Input placeholder="дд . мм . гггг">
          <label>Дата</label>
          <Icon className="icon_date">
            <DatePicker
              onChange={(data, dataString) => setCount(dataString)}
            ></DatePicker>
          </Icon>
          <NumberFormat
            className="date"
            value={count}
            placeholder="дд . мм . гггг"
            mask="_"
            format="####-##-##"
          />
        </Input>
      </div>

      <div className="grid_column time_location">
        <div className="input_all">
          <Input>
            <label>Время:</label>
            <NumberFormat
              className="time"
              placeholder="22:43"
              mask="_"
              format="##:##"
            />
          </Input>
        </div>
        <div className="input_all">
          <Input placeholder="ул. Энергетическая 42, ...">
            <label>Местоположение:</label>
            <input className="addres" />
          </Input>
        </div>
      </div>
      <div className="grid_column">
        <div className="input_all">
          <SelectLocation></SelectLocation>
        </div>
        <Checkbox label="Летнее время" className="time_location"></Checkbox>
      </div>
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
      <Button type="submit">Рассчитать</Button>
    </form>
  );
}

export default InputExampleIconChild;
