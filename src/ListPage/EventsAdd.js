import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { Form, Button, Icon } from "semantic-ui-react";
import SelectLocation from "../addElement/SelectLocation";
import { useForm, Controller } from "react-hook-form";
import { ReduceContext } from "../context/reducerContext";
import { EventContext } from "../context/eventReducer/eventContext";
import { DatePicker } from "antd";
import { usePosition } from "use-position";
import moment from "moment";
import { Checkbox as AntCheckbox } from "antd";
import Cleave from "cleave.js/react";
import SearchCity from "../addElement/searchCity";
import { useAlert } from "react-alert";
//Страница Добавления Событий

function EventsAdd() {
  const alert = useAlert();

  const { handleSubmit, register, errors, control, setValue } = useForm({
    defaultValues: {
      birth_date: moment(Date.now()).format("DD.MM.YYYY"),
      event_time: moment(Date.now()).format("HH:mm")
    },
    reValidateMode: onSubmit
  });
  const [ImageSrc, setImageSrc] = useState("../../img/Photo 1.svg");
  const { none } = useContext(ReduceContext);
  const { Add_events } = useContext(EventContext);
  const { latitude, longitude, error } = usePosition(false, {
    enableHighAccuracy: true
  });
  function onSubmit(values) {
    console.log(values);
    values["birth_date"] = moment(values.birth_date, "DD.MM.YYYY").format(
      "YYYY-MM-DD"
    );
    values["city"] =
    none.geolocation !== undefined ? none.geolocation.city : "";
    values["timezone"] = none.option_value;
    values["letnee"] = values.checkbox === true ? 1 : 0;
    Add_events(values);
  }

  useEffect(() => {
    if (none.geolocation !== undefined) {
      setValue("checkbox", none.geolocation.letnee === 0 ? true : false);
    }
  }, [localStorage.getItem("city").city]);

  useEffect(() => {
    if (errors.birth_date !== undefined) {
      alert.error("Введите корректно дату");
    }
    if (errors.event_time !== undefined) {
      alert.error("Введите корректно время");
    }

    if (errors.lng !== undefined) {
      alert.error("Введите долготу");
    }
    if (errors.lat !== undefined) {
      alert.error("Введите широту");
    }
    if (errors.name !== undefined) {
      alert.error("Введите название события");
    }
    if (errors.email !== undefined) {
      alert.error("Введите корректно email");
    }
  }, [errors]);

  return (
    <div className="container_add">
      <div className="button_header">
        <NavLink to="/event">
          <div className="purple">
            <SvgLoader path="../../img/Arrow2.svg">
              <SvgProxy selector="#cst" />
            </SvgLoader>
            Назад
          </div>
        </NavLink>
      </div>
      <div className="container_list container_create">
        <h2>Создание события</h2>
        <Form
          className="create_persons create_events"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="create_persons_left">
            <div className="personal_date all_box">
              <div className="text_all">Основные данные</div>
              <div className="grid_column">
                <Form.Field>
                  <label>Название события</label>
                  <input
                    type="text"
                    name="name"
                    className={"" + (errors.name ? "active" : "")}
                    ref={register({
                      required: true,
                      pattern: /^([а-яё]+|[a-z]+){3,16}$/i
                    })}
                  />
                  {errors.name && errors.name.message}
                </Form.Field>
              </div>
              <Form.Field>
                <label>Описания события</label>
                <textarea
                  rows="6"
                  type="text"
                  name="description"
                  className={"" + (errors.description ? "active" : "")}
                  ref={register({
                    required: false
                    // pattern: /^([а-яё]+|[a-z]+){1,16}$/i
                  })}
                />
                {errors.description && errors.description.message}
              </Form.Field>

              <Button>Сохранить</Button>
            </div>
            <div className="personal_date all_box">
              <div className="text_all">Место и время рождения</div>
              <div className="grid_forms">
                <div className="grid_column">
                  <div className="input_all">
                    <label>Дата</label>
                    <Icon className="icon_date">
                      <DatePicker
                        format={"DD.MM.YYYY"}
                        onChange={(data, dataString) =>
                          setValue("event_date", dataString)
                        }
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
                      name="event_date"
                      placeholder="дд . мм . гггг"
                      rules={{
                        required: true,
                        pattern: /^([0-2][0-9]|(3)[0-1])(.)(((0)[0-9])|((1)[0-2]))(.)\d{4}$/i
                      }}
                      className={"" + (errors.event_date ? "date active" : "")}
                      control={control}
                      defaultValue={moment(Date.now()).format("DD.MM.YYYY")}
                    />

                    {errors.event_date && errors.event_date.message}
                  </div>
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
                      name="event_time"
                      placeholder="21:34"
                      defaultValue={moment(Date.now()).format("HH:mm")}
                      className={"" + (errors.event_time ? "active" : "")}
                      rules={{
                        required: true,
                        pattern: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/i
                      }}
                    />

                    {errors.event_time && errors.event_time.message}
                  </div>
                </div>
                <div className="grid_column center_grid location_input_top">
                  <div className="input_all">
                    <label>Место рождения</label>
                    <SearchCity
                      type="text"
                      name="city"
                      className={"" + (errors.city ? "active" : "")}
                    />
                  </div>
                  <div className="input_all location_input">
                    <div className="text_localisation">Часовой пояс:</div>
                    <SelectLocation
                      ValueOptions={
                        none.option_value ? Number(none.option_value) : 0
                      }
                    ></SelectLocation>
                  </div>
                </div>
                <Controller
                  name="checkbox"
                  rules={{
                    required: false
                  }}
                  defaultValue={false}
                  as={
                    <AntCheckbox label="Летнее время" className="time_location">
                      Летнее время
                    </AntCheckbox>
                  }
                  control={control}
                ></Controller>

                <div className="grid_column grid_small">
                  <div className="input_all">
                    <label>Долгота:</label>
                    <input
                      type="text"
                      name="longtitude"
                      defaultValue={
                        none.geolocation
                          ? none.geolocation.location.lng
                          : longitude !== undefined
                          ? longitude.toFixed(4)
                          : ""
                      }
                      placeholder="36.6666"
                      className={"" + (errors.longtitude ? "active" : "")}
                      ref={register({
                        required: true,
                        pattern: /[0-9a-zA-Z!@#$%^&*]{0,}/i
                      })}
                    />
                    {errors.longtitude && errors.longtitude.message}
                  </div>
                  <div className="input_all">
                    <label>Широта:</label>
                    <input
                      type="text"
                      name="latitude"
                      placeholder="49.6666"
                      className={"" + (errors.latitude ? "active" : "")}
                      defaultValue={
                        none.geolocation
                          ? none.geolocation.location.lat
                          : latitude !== undefined
                          ? latitude.toFixed(4)
                          : ""
                      }
                      ref={register({
                        required: true,
                        pattern: /[0-9a-zA-Z!@#$%^&*]{0,}/i
                      })}
                    />
                    {errors.latitude && errors.latitude.message}
                  </div>
                </div>
              </div>
              <Button>Сохранить</Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default EventsAdd;
