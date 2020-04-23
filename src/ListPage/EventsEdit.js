import React, { useContext, useEffect } from "react";
import { Icon, Button, Form } from "semantic-ui-react";
import { DatePicker } from "antd";
import { SvgLoader, SvgProxy } from "react-svgmt";
import moment from "moment";
import { useForm } from "react-hook-form";
import { useAlert } from "react-alert";
import { ReduceContext } from "../context/reducerContext";
import SelectLocation from "../addElement/SelectLocation";
import { Controller } from "react-hook-form";
import Cleave from "cleave.js/react";
import SearchCity from "../addElement/searchCity";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Checkbox as AntCheckbox } from "antd";
import { EventContext } from "../context/eventReducer/eventContext";
import { GeoContext } from "../context/geolocation/GeoContext";

//Страница Добавления Событий
function EventsEdit() {
  const alert = useAlert();
  const { handleSubmit, register, errors, control, setValue } = useForm({
    reValidateMode: onSubmit,
  });
  const { geoGet } = useContext(GeoContext);
  const { url } = useRouteMatch();
  const { none, Fetch_one_events, update_notal_card } = useContext(
    ReduceContext,
  );
  const { Update_events } = useContext(EventContext);
  useEffect(() => {
    none.one_event = undefined;
    Fetch_one_events(url.replace(/\D+/g, ""));
  }, []);

  function onSubmit(values) {
    values["event_date"] = moment(values.event_date, "DD.MM.YYYY").format(
      "YYYY-MM-DD",
    );
    values["city"] = geoGet.geolocation
      ? geoGet.geolocation.city
      : none.one_event.city !== null
      ? none.one_event.city
      : "";
    values["timezone"] = none.option_value;
    values["letnee"] = values.checkbox === true ? 1 : 0;
    Update_events(values, none.one_event.id);
    update_notal_card(none.one_event.natal_id, true);
  }
  const history = useHistory();
  useEffect(() => {
    if (errors.event_date !== undefined) {
      alert.error("Введите корректно дату");
    }
    if (errors.event_time !== undefined) {
      alert.error("Введите корректно время");
    }

    if (errors.longitude !== undefined) {
      alert.error("Введите долготу");
    }
    if (errors.latitude !== undefined) {
      alert.error("Введите широту");
    }
    if (errors.name !== undefined) {
      alert.error("Введите название события");
    }
    if (errors.email !== undefined) {
      alert.error("Введите корректно email");
    }
  }, [errors]);
  
  useEffect(() => {
    if (geoGet.geolocation) {
      setValue("longtitude", geoGet.geolocation.location.lng);
      setValue("latitude", geoGet.geolocation.location.lat);
      setValue("checkbox", geoGet.geolocation.letnee === 0 ? true : false);
    }
  }, [geoGet.geolocation ? geoGet.geolocation.city : false]);
  return (
    <div className="container_add">
      <div className="button_header">
        <div onClick={() => history.goBack()}>
          <div className="purple">
            <SvgLoader path="../../img/Arrow2.svg">
              <SvgProxy selector="#cst" />
            </SvgLoader>
            Назад
          </div>
        </div>
      </div>
      {none.one_event && (
        <div className="container_list container_create">
          <h2>Редактирование события</h2>
          <Form
            className="create_persons create_events"
            onSubmit={handleSubmit(onSubmit)}>
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
                      defaultValue={none.one_event.name}
                      ref={register({
                        required: true,
                        pattern: /^([а-яё]+|[a-z]+|[^\\s*]){0,16}$/i,
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
                    defaultValue={none.one_event.description}
                    className={"" + (errors.description ? "active" : "")}
                    ref={register({
                      required: false,
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
                          disabledDate={(d) => !d || d.isBefore("1000-01-01")}
                          onChange={(data, dataString) =>
                            setValue("event_date", dataString)
                          }></DatePicker>
                      </Icon>

                      <Controller
                        as={
                          <Cleave
                            options={{
                              date: true,
                              dateMin: "1000-01-01",
                              dateMax: "3000-12-31",
                              delimiter: ".",
                              datePattern: ["d", "m", "Y"],
                            }}
                          />
                        }
                        type="text"
                        name="event_date"
                        placeholder="дд . мм . гггг"
                        rules={{
                          required: true,
                          pattern: /^([0-2][0-9]|(3)[0-1])(.)(((0)[0-9])|((1)[0-2]))(.)\d{4}$/i,
                        }}
                        className={
                          "" + (errors.event_date ? "date active" : "")
                        }
                        control={control}
                        defaultValue={none.one_event.event_date}
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
                              timePattern: ["h", "m"],
                            }}
                          />
                        }
                        control={control}
                        type="text"
                        name="event_time"
                        placeholder="21:34"
                        defaultValue={moment(
                          none.one_event.event_time,
                          "HH:mm:ss",
                        ).format("HH:mm")}
                        className={"" + (errors.event_time ? "active" : "")}
                        rules={{
                          required: true,
                          pattern: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/i,
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
                        ValueData={
                          none.one_event.city !== null
                            ? none.one_event.city
                            : ""
                        }
                        className={"" + (errors.city ? "active" : "")}
                      />
                    </div>
                    <div className="input_all location_input">
                      <div className="text_localisation">Часовой пояс:</div>
                      <SelectLocation
                        ValueOptions={
                          Number(none.option_value) !== 0
                            ? Number(none.option_value)
                            : none.one_event.timezone
                        }></SelectLocation>
                    </div>
                    <Controller
                      name="checkbox"
                      rules={{
                        required: false,
                      }}
                      defaultValue={none.one_event.letnee === 1 ? true : false}
                      as={
                        <AntCheckbox
                          label="Летнее время"
                          className="time_location">
                          Летнее время
                        </AntCheckbox>
                      }
                      control={control}></Controller>
                  </div>
                  <div className="grid_column grid_small">
                    <div className="input_all">
                      <label>Долгота:</label>
                      <input
                        type="text"
                        name="longtitude"
                        defaultValue={none.one_event.longtitude}
                        placeholder="36.6666"
                        className={"" + (errors.longtitude ? "active" : "")}
                        ref={register({
                          required: true,
                          pattern: /[0-9a-zA-Z!@#$%^&*]{0,}/i,
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
                        defaultValue={none.one_event.latitude}
                        ref={register({
                          required: true,
                          pattern: /[0-9a-zA-Z!@#$%^&*]{0,}/i,
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
      )}
    </div>
  );
}

export default EventsEdit;
