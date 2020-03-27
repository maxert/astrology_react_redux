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
import { NavLink, useRouteMatch } from "react-router-dom";

//Страница редактирования компаний

function CompanyEdit() {
  const { none, Fetch_one_company } = useContext(ReduceContext);
  const { url } = useRouteMatch();
  const { Update_company } = useContext(CompanyContext);
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

  useEffect(() => {
    if (none.geolocation) {
      setValue("longtitude", none.geolocation.location.lng);
      setValue("latitude", none.geolocation.location.lat);
      setValue("checkbox", none.geolocation.letnee === 0 ? true : false);
    }
  }, [none.geolocation ? none.geolocation.city : false]);

 
  const d = new Date();
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
    if (errors.name !== undefined) {
      alert.error("Введите Имя компании");
    }
    if (errors.email !== undefined) {
      alert.error("Введите корректно email");
    }
  }, [errors]);
  
  useEffect(() => {
    Fetch_one_company(url.replace(/\D+/g, ""));
  }, []);


  function onSubmit(values) {
    values["birth_date"] = moment(values.birth_date, "DD.MM.YYYY").format(
      "YYYY-MM-DD"
    );
    debugger;
    values["city"] =
      none.geolocation !== undefined ? none.geolocation.city : "";
    values["timezone"] = none.option_value;
    values["letnee"] = values.checkbox === true ? 1 : 0;
    console.log(values);
    Update_company(values, none.data_id.type_id);
  }
  return (
    <div className="container_add">
      <div className="button_header">
        <NavLink to="/company">
          <div className="purple">
            <SvgLoader path="../../img/Arrow2.svg">
              <SvgProxy selector="#cst" />
            </SvgLoader>
            Назад
          </div>
        </NavLink>
      </div>
      <div className="container_list container_create">
        <h2>Создание компании</h2>
        {none.one_company && (
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
                      defaultValue={none.one_company.name}
                      placeholder="Введите название компании"
                      className={"" + (errors.name ? "active" : "")}
                      ref={register({
                        required: true,
                        pattern: /^([а-яё]+|[a-z]+|[^\\s*]){3,16}$/i
                      })}
                    />
                    {errors.name && errors.name.message}
                  </Form.Field>
                  <Form.Field>
                    <label>Основатель</label>
                    <input
                      type="text"
                      name="osnovatel"
                      defaultValue={none.one_company.osnovatel}
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
                      defaultValue={none.one_company.email}
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
                      defaultValue={none.one_company.telephone}
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
                      defaultValue={none.one_company.cnt_workers}
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
                        defaultValue={none.one_company.birth_date}
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
                        defaultValue={moment(
                          none.one_company.birth_time,
                          "HH:mm:ss"
                        ).format("HH:mm")}
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
                        ValueData={
                          none.one_company.city !== null
                            ? none.one_company.city
                            : ""
                        }
                        name="city"
                        className={"" + (errors.city ? "active" : "")}
                      />
                    </div>
                    <div className="input_all location_input">
                      <div className="text_localisation">Часовой пояс:</div>
                      <SelectLocation
                        ValueOptions={
                          Number(none.option_value) !== 0 ? Number(none.option_value) : none.one_company.timezone
                        }
                      ></SelectLocation>
                    </div>
                  </div>
                 
                  <Controller
                    name="checkbox"
                    rules={{
                      required: false
                    }}
                    defaultValue={none.one_company.letnee === 0 ? true : false}
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
                        defaultValue={none.one_company.longtitude}
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
                        defaultValue={none.one_company.latitude}
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
                  {ImageSrc !== undefined || none.one_company.image !== null ? (
                    <img
                      src={
                        ImageSrc !== undefined
                          ? ImageSrc
                          : none.one_company.image !== null
                          ? "http://1690550.masgroup.web.hosting-test.net" +
                            none.one_company.image
                          : "../../img/Photo 1.svg"
                      }
                      alt=" "
                    />
                  ) : (
                    <div className="text_edit_image">
                      {none.one_company.name[0]}
                    </div>
                  )}
                </div>
                {none.one_company.image === null ? (
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

export default CompanyEdit;
