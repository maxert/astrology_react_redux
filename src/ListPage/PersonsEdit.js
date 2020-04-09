import React, { useState, useContext, useEffect } from "react";
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
import { PersonsContext } from "../context/personReducer/personContext";
import { useHistory, useRouteMatch } from "react-router-dom";
import NumberFormat from "react-number-format";
import { Checkbox as AntCheckbox } from "antd";
import { GeoContext } from "../context/geolocation/GeoContext";
import manifest from ".././manifest";

//Блок Добавление Персоны
function PersonsEdit() {
  const history = useHistory();
  const { geoGet } = useContext(GeoContext);
  const { none, Fetch_one_persons,update_notal_card } = useContext(ReduceContext);
  const { Update_persons } = useContext(PersonsContext);
  const { url } = useRouteMatch();
  const [ImageSrc, setImageSrc] = useState();
  const { handleSubmit, register, errors, control, setValue } = useForm({
    reValidateMode: onSubmit
  });

  const alert = useAlert();

  function onSubmit(values) {
    values["birth_date"] = moment(values.birth_date, "DD.MM.YYYY").format(
      "YYYY-MM-DD"
    );
    values["city"] = geoGet.geolocation
      ? geoGet.geolocation.city
      : none.one_persons.city !== null
      ? none.one_persons.city
      : "";
    values["timezone"] = none.option_value;
    values["letnee"] = values.checkbox === true ? 1 : 0;
    Update_persons(values, none.one_persons.id);
    update_notal_card(none.one_persons.natal_id); 
  }
  useEffect(() => {
    if (geoGet.geolocation !== undefined) {
      setValue("longtitude", geoGet.geolocation.location.lng);
      setValue("latitude", geoGet.geolocation.location.lat);
      setValue("checkbox", geoGet.geolocation.letnee === 0 ? true : false);
    }
  }, [geoGet.geolocation ? geoGet.geolocation.city : false]);

  useEffect(() => {
    none.one_persons = undefined;
    Fetch_one_persons(url.replace(/\D+/g, ""));
  }, []);


  useEffect(() => {
    if (errors.birth_date !== undefined) {
      alert.error("Введите корректно дату");
    }
    if (errors.birth_time !== undefined) {
      alert.error("Введите корректно время");
    }

    if (errors.longtitude !== undefined) {
      alert.error("Введите долготу");
    }
    if (errors.latitude !== undefined) {
      alert.error("Введите широту");
    }
    if (errors.firstname !== undefined) {
      alert.error("Введите Имя");
    }
    if (errors.email !== undefined) {
      alert.error("Введите корректно email");
    }
  }, [errors]);

  return (
    <div className="container_add">
      <div className="button_header">
        <div className="purple" onClick={() => history.goBack()}>
          <SvgLoader path="../../img/Arrow2.svg">
            <SvgProxy selector="#cst" />
          </SvgLoader>
          Назад
        </div>
      </div>
      <div className="container_list container_create">
        <h2>Редактирование персоны</h2>
        {none.one_persons && (
          <Form
            className="ui form create_persons"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="create_persons_left">
              <div className="personal_date all_box">
                <div className="text_all">Личные данные</div>
                <div className="grid_column">
                  <Form.Field>
                    <label>Имя</label>
                    <input
                      type="text"
                      name="firstname"
                      placeholder="Введите имя"
                      defaultValue={none.one_persons.firstname}
                      className={"" + (errors.firstname ? "active" : "")}
                      ref={register({
                        required: true,
                        pattern: /^([а-яё]+|[a-z]+|[^\\s*]){0,26}$/i
                      })}
                    />
                    {errors.firstname && errors.firstname.message}
                  </Form.Field>

                  <Form.Field>
                    <label>Фамилия</label>
                    <input
                      type="text"
                      name="lastname"
                      label="Фамилия"
                      defaultValue={
                        none.one_persons.lastname !== null
                          ? none.one_persons.lastname
                          : ""
                      }
                      placeholder="Введите фамилию"
                      className={"" + (errors.lastname ? "active" : "")}
                      ref={register({
                        required: false
                      })}
                    />
                    {errors.lastname && errors.lastname.message}
                  </Form.Field>
                </div>

                <div className="grid_column">
                  <Form.Field>
                    <label>E-mail</label>
                    <input
                      type="text"
                      name="email"
                      defaultValue={
                        none.one_persons.email !== null
                          ? none.one_persons.email
                          : ""
                      }
                      placeholder="Введите email"
                      className={"" + (errors.email ? "active" : "")}
                      ref={register({
                        required: false,
                        pattern: /^\S+@\S+$/i
                      })}
                    />
                    {errors.email && errors.email.message}
                  </Form.Field>
                  <Form.Field>
                    <label>Телефон</label>
                    <NumberFormat
                      type="tel"
                      name="telephone"
                      prefix={"+"}
                      defaultValue={
                        none.one_persons.telephone !== null
                          ? none.one_persons.telephone
                          : ""
                      }
                      className={"" + (errors.telephone ? "active" : "")}
                      placeholder="Пример: +38 (000)-000-00-00"
                      getInputRef={register({
                        required: false
                      })}
                    />
                    {errors.telephone && errors.telephone.message}
                  </Form.Field>
                </div>
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
                            setValue("birth_date", dataString)
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
                        name="birth_date"
                        placeholder="дд . мм . гггг"
                        rules={{
                          required: true,
                          pattern: /^([0-2][0-9]|(3)[0-1])(.)(((0)[0-9])|((1)[0-2]))(.)\d{4}$/i
                        }}
                        className={
                          "" + (errors.birth_date ? "date active" : "")
                        }
                        control={control}
                        defaultValue={none.one_persons.birth_date}
                      />

                      {errors.birth_date && errors.birth_date.message}
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
                        name="birth_time"
                        placeholder="21:34"
                        className={"" + (errors.birth_time ? "active" : "")}
                        rules={{
                          required: true,
                          pattern: /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/i
                        }}
                        defaultValue={moment(
                          none.one_persons.birth_time,
                          "HH:mm:ss"
                        ).format("HH:mm")}
                      />

                      {errors.birth_time && errors.birth_time.message}
                    </div>
                  </div>
                  <div className="grid_column center_grid location_input_top">
                    <div className="input_all">
                      <label>Место рождения</label>

                      <SearchCity
                        type="text"
                        name="city"
                        ValueData={
                          none.one_persons.city !== null
                            ? none.one_persons.city
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
                            : none.one_persons.timezone
                        }
                      ></SelectLocation>
                    </div>
                  </div>

                  <Controller
                    name="checkbox"
                    rules={{
                      required: false
                    }}
                    defaultValue={none.one_persons.letnee === 1 ? true : false}
                    as={
                      <AntCheckbox
                        label="Летнее время"
                        className="time_location"
                      >
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
                        defaultValue={none.one_persons.longtitude}
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
                        defaultValue={none.one_persons.latitude}
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
            <div className="create_persons_right">
              <div className="block_image">
                <div className="image_contaner_perons">
                  {ImageSrc !== undefined || none.one_persons.image !== null ? (
                    <img
                      src={
                        ImageSrc !== undefined
                          ? ImageSrc
                          : none.one_persons.image !== null
                          ? manifest.URL + none.one_persons.image
                          : "../../img/Photo 1.svg"
                      }
                      alt=" "
                    />
                  ) : (
                    <div className="text_edit_image">
                      {none.one_persons.firstname[0]}
                    </div>
                  )}
                </div>
                {none.one_persons.image === null ? (
                  <div className="button_add">
                    <SvgLoader path="../../img/Photosm.svg">
                      <SvgProxy selector="#cst" />
                    </SvgLoader>{" "}
                    Добавить аватар
                  </div>
                ) : (
                  <div className="button_add">
                    <SvgLoader path="../../img/Photosm.svg">
                      <SvgProxy selector="#cst" />
                    </SvgLoader>{" "}
                    Обновить аватар
                  </div>
                )}

                <input
                  type="file"
                  name="upload_image"
                  onChange={e => {
                    e.target.files.length !== 0
                      ? setImageSrc(URL.createObjectURL(e.target.files[0]))
                      : setImageSrc("../../img/Photo 1.svg");
                  }}
                  ref={register({
                    required: false
                  })}
                />
              </div>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
}

export default PersonsEdit;
