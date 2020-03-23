import React, { useState, useContext, useEffect } from "react";
import { Icon, Checkbox, Button, Form } from "semantic-ui-react";
import SelectLocation from "../addElement/SelectLocation";
import { DatePicker } from "antd";
import { useForm, Controller } from "react-hook-form";
import { ReduceContext } from "../context/reducerContext";
import { useHistory } from "react-router";
import Cleave from "cleave.js/react";
import SearchCity from "../addElement/searchCity";
import { usePosition } from "use-position";
import moment from "moment";
import { useAlert } from "react-alert";
//Форма создания натальной карты пользователя на главной странице

function InputExampleIconChild() {

  const [data_notal, setData] = useState([]);
  const history = useHistory();
  const [isChekbox, setChecbox] = useState(0);
  const SaveData = JSON.parse(localStorage.getItem("save_natal"));
  const { none, SelectLocationNew } = useContext(ReduceContext);
  const { handleSubmit, register, errors, control, setValue } = useForm({
    defaultValues: {
      date: moment(Date.now()).format("DD.MM.YYYY"),
      time:moment(Date.now()).format("HH:mm")
    },
    reValidateMode:onSubmit
  });
  const { latitude, longitude, error } = usePosition(false, {
    enableHighAccuracy: true
  });
  const alert = useAlert();

  const d = new Date();

  useEffect(() => {
    setData(SaveData);
    setChecbox(SaveData !== null ? SaveData.letnee : 0);
    SelectLocationNew(SaveData !== null ? SaveData.timezone : 0);
  }, []);

  function onSubmit(values) {
    debugger;
    values["date"] = values.date;
    values["timezone"] = none.option_value;
    values["letnee"] = isChekbox;
    console.log(values);
    localStorage.setItem("save_natal", JSON.stringify(values));
    history.push(`/home_card`);
    alert.success("Натальная карта созданна");
  }
useEffect(()=>{

 if (errors.date!==undefined) {
    alert.error("Введите корректно дату");
  }
  if(errors.time!==undefined){
    alert.error("Введите корректно время");
  }

  if (errors.lng!==undefined) {
    alert.error("Введите долготу");
  }
  if(errors.lat!==undefined){
    alert.error("Введите широту");
  }

},[errors])
 

  return (
    <Form className="forms_create" onSubmit={handleSubmit(onSubmit)}>
      <div className="input_all">
        <label>Дата</label>
        <Icon className="icon_date">
          <DatePicker
            format={"DD.MM.YYYY"}
            onChange={(data, dataString) => setValue("date", dataString)}
          ></DatePicker>
        </Icon>

        <Controller
          as={
            <Cleave
              options={{
                date: true,
                delimiter: ".",
                datePattern: ["d", "m", "Y"]
              }}
            />
          }
          type="text"
          name="date"
          placeholder="дд . мм . гггг"
          rules={{
            required: true,
            pattern: /^([0-2][0-9]|(3)[0-1])(.)(((0)[0-9])|((1)[0-2]))(.)\d{4}$/i
          }}
          className={"" + (errors.date ? "date active" : "")}
          control={control}
          defaultValue={SaveData!==null?SaveData.date:moment(Date.now()).format("DD:MM:YYYY")}
        />

        {errors.date && errors.date.message}
      </div>

      <div className="grid_column time_location">
        <div className="input_all">
          <label>Время</label>
          <Controller
            as={
              <Cleave
                options={{
                  time: true,
                  timePattern: ["h", "m"]
                }}
              />
            }
            control={control}
            type="text"
            name="time"
            placeholder="21:34"
            defaultValue={SaveData!==null?SaveData.time:moment(Date.now()).format("HH:mm")}
            className={"" + (errors.time ? "active" : "")}
            rules={{
              required: true,
              pattern: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/i
            }}
          />

          {errors.time && errors.time.message}
        </div>

        <div className="input_all">
          <label>Место рождения</label>
          <SearchCity
            type="text"
            name="city"
            ValueData={
              localStorage.getItem("city") ? localStorage.getItem("city") : ""
            }
            className={"" + (errors.city ? "active" : "")}
          />
        </div>
      </div>
      <div className="grid_column">
        <div className="input_all">
          <SelectLocation
            ValueOptions={none.option_value ? none.option_value : 0}
          ></SelectLocation>
        </div>

        <Checkbox
          label="Летнее время"
          className="time_location"
          checked={isChekbox === 0 ? false : true}
          value={1}
          onClick={() => (isChekbox ? setChecbox(0) : setChecbox(1))}
        ></Checkbox>
      </div>
      <div className="grid_column grid_small">
        <div className="input_all">
          <label>Долгота:</label>
          <input
            type="text"
            name="lng"
            defaultValue={
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
        </div>

        <div className="input_all">
          <label>Широта:</label>
          <input
            type="text"
            name="lat"
            placeholder="49.6666"
            className={"" + (errors.lat ? "active" : "")}
            defaultValue={
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
        </div>
      </div>
      <Button type="submit">Рассчитать</Button>
    </Form>
  );
}

export default InputExampleIconChild;
