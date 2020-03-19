import React, { useState, useContext, useEffect } from "react";
import { Icon, Input, Checkbox, Button, Form } from "semantic-ui-react";
import SelectLocation from "../addElement/SelectLocation";
import { DatePicker } from "antd";
import { useForm } from "react-hook-form";
import { ReduceContext } from "../context/reducerContext";
import { useHistory } from "react-router";
import Cleave from "cleave.js/react";
import SearchCity from "../addElement/searchCity";
import { usePosition } from "use-position";
import moment from "moment";
//Форма создания натальной карты пользователя на главной странице

function InputExampleIconChild() {
  const [date_value, setDate_value] = useState("");
  const [data_notal, setData] = useState([]);
  const history = useHistory();
  const [isChekbox, setChecbox] = useState(0);
  const { none, createNotals, geolocation } = useContext(ReduceContext);
  const { handleSubmit, register, errors } = useForm();
  const { latitude, longitude, error } = usePosition(false, {
    enableHighAccuracy: true
  });
  const d = new Date();

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("save_natal"));
    setData(data);
    setChecbox(data !== null && data.letnee);
  }, []);

  function onSubmit(values) {
    debugger;
    const date = values.date.split(".");
    let new_date = date[2] + "-" + date[1] + "-" + date[0];
    values["date"] = new_date;
    values["timezone"] = none.option_value;
    values["letnee"] = isChekbox;
    console.log(values);
    createNotals(values);
    history.push(`/home_card`);
  }
  return (
    <Form className="forms_create" onSubmit={handleSubmit(onSubmit)}>
      <div className="input_all">
        <Form.Field>
          <label>Дата</label>
          <Icon className="icon_date">
            <DatePicker
              format={"DD.MM.YYYY"}
              onChange={(data, dataString) => setDate_value(dataString)}
            ></DatePicker>
          </Icon>

          <Cleave
            type="text"
            name="date"
            placeholder="дд . мм . гггг"
            htmlRef={register({
              required: true,
              pattern: /[0-9a-zA-Z!@#$%^&*]{0,}/i
            })}
            options={{
              date: true,
              delimiter: ".",
              datePattern: ["d", "m", "Y"]
            }}
            value={
              date_value
                ? date_value
                : data_notal !== null
                ? data_notal.date
                : moment(Date.now()).format("DD:MM:YYYY")
            }
            className={"" + (errors.date ? "date active" : "")}
          />
          {errors.date && errors.date.message}
        </Form.Field>
      </div>

      <div className="grid_column time_location">
        <Form.Field>
          <label>Время</label>
          <Cleave
            type="text"
            name="time"
            placeholder="21:34"
            options={{
              time: true,
              timePattern: ["h", "m"]
            }}
            value={
              data_notal !== null
                ? data_notal.time
                : moment(Date.now()).format("HH:mm")
            }
            className={"" + (errors.time ? "active" : "")}
            htmlRef={register({
              required: true,
              pattern: /[0-9a-zA-Z!@#$%^&*]{0,}/i
            })}
          />
          {errors.time && errors.time.message}
        </Form.Field>

        <Form.Field>
          <label>Место рождения</label>
          <SearchCity
            type="text"
            name="city"
            ValueData={
              localStorage.getItem("city") ? localStorage.getItem("city") : ""
            }
            className={"" + (errors.city ? "active" : "")}
          />
        </Form.Field>
      </div>
      <div className="grid_column">
        <div className="input_all">
          <SelectLocation
            ValueOptions={"" + none.option_value}
          ></SelectLocation>
        </div>
        <Checkbox
          label="Летнее время"
          className="time_location"
          checked={
            none.geolocation
              ? none.geolocation.letnee
                ? true
                : false
              : isChekbox
              ? true
              : false
          }
          value={1}
          onClick={() => (isChekbox ? setChecbox(0) : setChecbox(1))}
        ></Checkbox>
      </div>
      <div className="grid_column grid_small">
        <Form.Field>
          <label>Долгота:</label>
          <input
            type="text"
            name="lng"
            value={
              none.geolocation
                ? none.geolocation.location.lng
                : data_notal === null
                ? longitude !== undefined
                  ? longitude.toFixed(4)
                  : ""
                : data_notal.lng
            }
          
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
            value={
              none.geolocation
                ? none.geolocation.location.lat
                : data_notal === null
                ? latitude !== undefined
                  ? latitude.toFixed(4)
                  : ""
                : data_notal.lat
            }
           
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
