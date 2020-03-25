import React, { useState, useContext, useEffect } from "react";
import { Icon, Checkbox, Button, Form } from "semantic-ui-react";
import { DatePicker } from "antd";
import { SvgLoader, SvgProxy } from "react-svgmt";
import moment from "moment";
import { usePosition } from "use-position";
import { useForm } from "react-hook-form";
import { useAlert } from "react-alert";
import { ReduceContext } from "../context/reducerContext";
import SelectLocation from "../addElement/SelectLocation";
import { Controller } from "react-hook-form";
import Cleave from "cleave.js/react";
import SearchCity from "../addElement/searchCity";
import { PersonsContext } from "../context/personReducer/personContext";
import { NavLink } from "react-router-dom";
import NumberFormat from "react-number-format";

//Блок Добавление Персоны
function PersonsAdd() {
  const { none } = useContext(ReduceContext);
  const { Add_persons } = useContext(PersonsContext);
  const [isChekbox, setChecbox] = useState(0);
  const [ImageSrc, setImageSrc] = useState("../../img/Photo 1.svg");
  const { handleSubmit, register, errors, control, setValue } = useForm({
    defaultValues: {
      date: moment(Date.now()).format("DD.MM.YYYY"),
      time: moment(Date.now()).format("HH:mm")
    },
    reValidateMode: onSubmit
  });
  const { latitude, longitude, error } = usePosition(false, {
    enableHighAccuracy: true
  });
  const alert = useAlert();

  const d = new Date();

  function onSubmit(values) {
    values["birth_date"]=moment(values.birth_date,"DD.MM.YYYY").format("YYYY-MM-DD")
    values["city"]=none.geolocation.city!==null?none.geolocation.city:null;
    values["timezone"] = none.option_value;
    values["letnee"] = isChekbox;
    console.log(values);
    Add_persons(values)
    debugger;
  }

  useEffect(() => {
    if (errors.date !== undefined) {
      alert.error("Введите корректно дату");
    }
    if (errors.time !== undefined) {
      alert.error("Введите корректно время");
    }

    if (errors.lng !== undefined) {
      alert.error("Введите долготу");
    }
    if (errors.lat !== undefined) {
      alert.error("Введите широту");
    }
    if (errors.firstname !== undefined) {
      alert.error("Введите Имя");
    }
    if (errors.email !== undefined) {
      alert.error("Введите корректно email");
    }
  }, [errors]);

  // const onSubmit = values => {
  //   console.log(values);
  //   values["timezone"] = none.option_value;
  //   const birth_date = values.birth_date.split(".");
  //   let new_data= birth_date[2]+"-"+birth_date[1]+"-"+birth_date[0];
  //   values["birth_date"] = new_data;
  //   Add_persons(values);
  //   debugger;
  // };
  return (
    <div className="container_add">
      <div className="button_header">
        <NavLink to="/person">
          <div className="purple">
            <SvgLoader path="../../img/Arrow2.svg">
              <SvgProxy selector="#cst" />
            </SvgLoader>
            Назад
          </div>
        </NavLink>
      </div>
      <div className="container_list container_create">
        <h2>Создание персоны</h2>
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
                    className={"" + (errors.firstname ? "active" : "")}
                    ref={register({
                      required: true,
                      pattern: /^([а-яё]+|[a-z]+|[^\\s*]){3,16}$/i
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
                    placeholder="Введите фамилию"
                    className={"" + (errors.lastname ? "active" : "")}
                    ref={register({
                      required: false
                      // pattern: /^([а-яё]+|[a-z]+|[^\\s*]){3,16}$/i
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
                          setValue("date", dataString)
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
                      className={"" + (errors.birth_date ? "date active" : "")}
                      control={control}
                      defaultValue={moment(Date.now()).format("DD.MM.YYYY")}
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
                      defaultValue={moment(Date.now()).format("HH:mm")}
                      className={"" + (errors.birth_time ? "active" : "")}
                      rules={{
                        required: true,
                        pattern: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/i
                      }}
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
                <Checkbox
                  label="Летнее время"
                  className="time_location"
                  checked={isChekbox === 0 ? false : true}
                  value={1}
                  onClick={() => (isChekbox ? setChecbox(0) : setChecbox(1))}
                ></Checkbox>
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
          <div className="create_persons_right">
            <div className="block_image">
              <div className="image_contaner_perons">
                <img  class="default_image" src={ImageSrc} alt=" " />
              </div>
              <div className="button_add">
                <SvgLoader path="../../img/Photosm.svg">
                  <SvgProxy selector="#cst" />
                </SvgLoader>{" "}
                Добавить аватар
              </div>
              <input
                type="file"
                name="upload_image"
                onChange={(e)=>{setImageSrc(URL.createObjectURL(e.target.files[0]))}}
                ref={register({
                  required: false,
                })}
              />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default PersonsAdd;
