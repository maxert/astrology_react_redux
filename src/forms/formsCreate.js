import React from "react";
import { Icon, Input, Checkbox, Button } from "semantic-ui-react";
import SelectLocation from "../addElement/SelectLocation";
const InputExampleIconChild = () => (
  <form className="forms_create">
    <div className="input_all">
      <Input icon placeholder="дд . мм . гггг">
        <label>Дата</label>
        <input className="data" />
        <Icon className="icon_date" />
      </Input>
    </div>
    <div className="grid_column time_location">
      <div className="input_all">
        <Input placeholder="22:43">
          <label>Время:</label>
          <input className="time" />
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

export default InputExampleIconChild;
