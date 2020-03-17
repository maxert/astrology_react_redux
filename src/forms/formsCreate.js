import React, { useState, useContext } from "react";
import { Icon, Input, Checkbox, Button, Form } from "semantic-ui-react";
import SelectLocation from "../addElement/SelectLocation";
import { DatePicker } from "antd";
import NumberFormat from "react-number-format";
import { useForm } from "react-hook-form";
import { ReduceContext } from "../context/reducerContext";
import { useHistory } from "react-router";
//Форма создания натальной карты пользователя на главной странице

function InputExampleIconChild() {
  const [count, setCount] = useState("");
  const history = useHistory();
  const [isChekbox, setChecbox] = useState(0);
  const { none,createNotals } = useContext(ReduceContext);
  const { handleSubmit, register, errors } = useForm();
  function CheckboxElement(event, data) {
    data.checked === true ? setChecbox(1) : setChecbox(0);
  }
 
  function onSubmit(values) {
    const date = values.date.split(".");
    debugger
    let new_date= date[2]+"-"+date[1]+"-"+date[0];
    values["date"] = new_date;
    values["timezone"] = none.option_value;
    values["letnee"] = isChekbox;
    console.log(values);
    createNotals(values);

    history.push(`/home_card`);

  };
  return (
    <Form className="forms_create" onSubmit={handleSubmit(onSubmit)}>
      <div className="input_all">
        {/* <DateTimeForm></DateTimeForm> */}
        <Form.Field>
          <Input placeholder="дд . мм . гггг">
            <label>Дата</label>
            <Icon className="icon_date">
              <DatePicker
                format={"DD.MM.YYYY"}
                onChange={(data, dataString) => setCount(dataString)}
              ></DatePicker>
            </Icon>
            <NumberFormat
              type="text"
              name="date"
              placeholder="дд . мм . гггг"
              mask="_"
              format="##.##.####"
              value={count}
              className={"" + (errors.date ? "date active" : "")}
              getInputRef={register({
                required: true,
                pattern: /[0-9a-zA-Z!@#$%^&*]{0,}/i
              })}
            />
            {errors.date && errors.date.message}
          </Input>
        </Form.Field>
      </div>

      <div className="grid_column time_location">
        <Form.Field>
          <label>Время</label>
          <NumberFormat
            type="text"
            name="time"
            placeholder="21:34"
            mask="_"
            format="##:##"
            className={"" + (errors.time ? "active" : "")}
            getInputRef={register({
              required: true,
              pattern: /[0-9a-zA-Z!@#$%^&*]{0,}/i
            })}
          />
          {errors.time && errors.time.message}
        </Form.Field>

        <Form.Field>
          <label>Место рождения</label>
          <input
            type="text"
            name="city"
            placeholder="г. Киев"
            className={"" + (errors.city ? "active" : "")}
            ref={register({
              required: true,
              pattern: /[0-9a-zA-Z!@#$%^&*]{0,}/i
            })}
          />
          {errors.city && errors.city.message}
        </Form.Field>
      </div>
      <div className="grid_column">
        <div className="input_all">
          <SelectLocation></SelectLocation>
        </div>
        <Checkbox
          label="Летнее время"
          className="time_location"
          onChange={(event, data) => CheckboxElement(event, data)}
        ></Checkbox>
      </div>
      <div className="grid_column grid_small">
        <Form.Field>
          <label>Долгота:</label>
          <input
            type="text"
            name="lng"
            placeholder="36.6666"
            className={"" + (errors.lng ? "active" : "")}
            ref={register({
              required: true,
              pattern: /[0-9a-zA-Z!@#$%^&*]{0,}/i
            })}
          />
          {errors.lng && errors.lng.message}
        </Form.Field>

        <Form.Field>
          <label>Широта:</label>
          <input
            type="text"
            name="lat"
            placeholder="49.6666"
            className={"" + (errors.lat ? "active" : "")}
            ref={register({
              required: true,
              pattern: /[0-9a-zA-Z!@#$%^&*]{0,}/i
            })}
          />
          {errors.lat && errors.lat.message}
        </Form.Field>
      </div>
      <Button type="submit">Рассчитать</Button>
    </Form>
  );
}

export default InputExampleIconChild;
