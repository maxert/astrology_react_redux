import React, { useState, useContext, useEffect } from "react";
import { Icon, Button, Form } from "semantic-ui-react";
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
import NumberFormat from "react-number-format";
import { Checkbox as AntCheckbox } from "antd";
import { CompanyContext } from "../context/companyReducer/companyContext";
import { NavLink, useHistory } from "react-router-dom";
import { GeoContext } from "../context/geolocation/GeoContext";


//Страница добавления компаний
function CompanyAdd() {
  const { none } = useContext(ReduceContext);
  const { Add_company } = useContext(CompanyContext);
  const {geoGet} = useContext(GeoContext)
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
  useEffect(() => {
    if (geoGet.geolocation) {
      setValue("checkbox", geoGet.geolocation.letnee === 0 ? true : false);
    }
  }, [localStorage.getItem("city")]);


  const alert = useAlert();

  const d = new Date();
  useEffect(() => {
    if (errors.birth_date !== undefined) {
      alert.error("Введите корректно дату");
    }
    if (errors.birth_time !== undefined) {
      alert.error("Введите корректно время");
    }

    if (errors.longitude !== undefined) {
      alert.error("Введите долготу");
    }
    if (errors.latitude !== undefined) {
      alert.error("Введите широту");
    }
    if (errors.name !== undefined) {
      alert.error("Введите Имя компании");
    }
    if (errors.email !== undefined) {
      alert.error("Введите корректно email");
    }
  }, [errors]);
  function onSubmit(values) {
    values["birth_date"] = moment(values.birth_date, "DD.MM.YYYY").format(
      "YYYY-MM-DD"
    );
    
    values["city"] = geoGet.geolocation !== undefined ? geoGet.geolocation.city : "";
    values["timezone"] = none.option_value;
    values["letnee"] = values.checkbox === true ? 1 : 0;
    Add_company(values);
   
  }
  const history = useHistory();
  return (
    <div className="container_add">
      <div className="button_header">
        <div onClick={()=>history.goBack()}>
          <div className="purple">
            <SvgLoader path="../../img/Arrow2.svg">
              <SvgProxy selector="#cst" />
            </SvgLoader>
            Назад
          </div>
        </div>
      </div>
      <div className="container_list container_create">
        <h2>Создание компании</h2>
        <Form className="create_persons" onSubmit={handleSubmit(onSubmit)}>
          <div className="create_persons_left">
            <div className="personal_date all_box">
              <div className="text_all">Основные данные</div>
              <div className="grid_column" widths="equal">
                <Form.Field>
                  <label>Название компании</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Введите название компании"
                    className={"" + (errors.name ? "active" : "")}
                    ref={register({
                      required: true,
                      pattern: /^([а-яё]+|[a-z]+|[^\\s*]){0,26}$/i
                    })}
                  />
                  {errors.name && errors.name.message}
                </Form.Field>
                <Form.Field>
                  <label>Основатель</label>
                  <input
                    type="text"
                    name="osnovatel"
                    placeholder="Введите основателя"
                    className={"" + (errors.osnovatel ? "active" : "")}
                    ref={register({
                      required: false
                      // pattern: /^([а-яё]+|[a-z]+|[^\\s*]){3,16}$/i
                    })}
                  />
                  {errors.osnovatel && errors.osnovatel.message}
                </Form.Field>
              </div>
              <div className="grid_column">
                <Form.Field>
                  <label>E-mail</label>
                  <input
                    type="email"
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
              <div className="grid_column">
                <Form.Field>
                  <label>Количество сотрудников</label>
                  <input
                    type="number"
                    name="cnt_workers"
                    placeholder="Введите кол-во сотрудников"
                    className={"" + (errors.cnt_workers ? "active" : "")}
                    ref={register({
                      required: false,
                      pattern: /^[0-9]{0,24}$/i
                    })}
                  />
                  {errors.cnt_workers && errors.cnt_workers.message}
                </Form.Field>
              </div>
              <Button>Сохранить</Button>
            </div>
            <div className="personal_date all_box">
              <div className="text_all">Место и время основания компании</div>
              <div className="grid_forms">
                <div className="grid_column">
                  <div className="input_all">
                    <label>Дата</label>
                    <Icon className="icon_date">
                      <DatePicker
                        format={"DD.MM.YYYY"}
                        disabledDate={d => !d || d.isBefore("1000-01-01")}
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
                            dateMin: '1000-01-01',
                            dateMax: '3000-12-31',
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
                </div>
               
             

                <div className="grid_column grid_small">
                  <div className="input_all">
                    <label>Долгота:</label>
                    <input
                      type="text"
                      name="longtitude"
                      defaultValue={
                        geoGet.geolocation
                          ? geoGet.geolocation.location.lng
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
                        geoGet.geolocation
                          ? geoGet.geolocation.location.lat
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
                <img class="default_image" src={ImageSrc} alt=" " />
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
                onChange={e => {
                  setImageSrc(URL.createObjectURL(e.target.files[0]));
                }}
                ref={register({
                  required: false
                })}
              />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default CompanyAdd;
