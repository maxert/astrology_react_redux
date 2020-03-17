import React, { useContext, useEffect, useState } from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { Form, Button, Input, Icon, Checkbox } from "semantic-ui-react";
import SelectLocation from "../addElement/SelectLocation";
import { ReduceContext } from "../context/reducerContext";
import { useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
import { CompanyContext } from "../context/companyReducer/companyContext";
import { DatePicker } from "antd";

//Страница редактирования компаний

function CompanyEdit() {
  const { handleSubmit, register, errors } = useForm();
  const { none, Fetch_one_company } = useContext(ReduceContext);
  const { Update_company } = useContext(CompanyContext);
  const [count, setCount] = useState("");
  const { url } = useRouteMatch();

  useEffect(() => {
    Fetch_one_company(url.replace(/\D+/g, ""));
  }, [url]);

  const onSubmit = values => {
    values["timezone"] = none.option_value;
    Update_company(values, none.one_company.id);
  };
  return (
    <div className="container_add">
      <div className="button_header">
        <NavLink to={`/company/id/${none.one_company && none.one_company.id}`}>
          <div className="purple">
            <SvgLoader path="../../img/Arrow2.svg">
              <SvgProxy selector="#cst" />
            </SvgLoader>
            Назад
          </div>
        </NavLink>
      </div>
      {none.one_company && (
        <div className="container_list container_create">
          <h2>Редактирования компании</h2>
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
                      placeholder="Введите основателя"
                      defaultValue={none.one_company.osnovatel}
                      className={"" + (errors.osnovatel ? "active" : "")}
                      ref={register({
                        required: true,
                        pattern: /^([а-яё]+|[a-z]+|[^\\s*]){3,16}$/i
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
                        required: true,
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
                      format="+38 (###)-###-##-##"
                      mask="_"
                      defaultValue={none.one_company.telephone}
                      className={"" + (errors.telephone ? "active" : "")}
                      placeholder="+38 (000)-000-00-00"
                      getInputRef={register({
                        required: true,
                        pattern: /\+[0-9]{2}[ .-](\([0-9]{3})\)([ .-]?)([0-9]{3})\2([0-9]{2})\2([0-9]{2})/g
                      })}
                      allowEmptyFormatting
                    />
                    {errors.telephone && errors.telephone.message}
                  </Form.Field>
                </div>
                <div className="grid_column">
                  <Form.Field>
                    <label>Количество сотрудников</label>
                    <input
                      type="text"
                      name="cnt_workers"
                      placeholder="Введите кол-во сотрудников"
                      defaultValue={none.one_company.cnt_workers}
                      className={"" + (errors.cnt_workers ? "active" : "")}
                      ref={register({
                        required: true,
                        pattern: /^[0-9]{0,16}$/i
                      })}
                    />
                    {errors.cnt_workers && errors.cnt_workers.message}
                  </Form.Field>
                </div>
                <Button>Сохранить</Button>
              </div>
              <div className="personal_date all_box">
                  <div className="text_all">Место и время основания компании</div>
                  <div className="grid_column center_grid">
                    <div className="input_all">
                      <Form.Field>
                        <Input placeholder="дд . мм . гггг">
                          <label>Дата</label>
                          <Icon className="icon_date">
                            <DatePicker
                              format={"DD.MM.YYYY"}
                              onChange={(data, dataString) =>
                                setCount(dataString)
                              }
                            ></DatePicker>
                          </Icon>
                          <NumberFormat
                            type="text"
                            name="birth_date"
                            placeholder="дд . мм . гггг"
                            mask={"_"}
                            format="##.##.####"
                            value={
                              count === "" ? none.one_company.birth_date : count
                            }
                            defaultValue={none.one_company.birth_date}
                            className={
                              "" + (errors.birth_date ? "date active" : "")
                            }
                            getInputRef={register({
                              required: true,
                              pattern: /[0-9a-zA-Z!@#$%^&*]{0,}/i
                            })}
                          />
                          {errors.birth_date && errors.birth_date.message}
                        </Input>
                      </Form.Field>
                    </div>
                    <Form.Field>
                      <label>Время рождения</label>
                      <NumberFormat
                        type="text"
                        name="birth_time"
                        placeholder="пример: 21:34"
                        defaultValue={none.one_company.birth_time}
                        mask="_"
                        format="##:##"
                        className={"" + (errors.birth_time ? "active" : "")}
                        getInputRef={register({
                          required: true,
                          pattern: /[0-9a-zA-Z!@#$%^&*]{0,}/i
                        })}
                      />
                      {errors.birth_time && errors.birth_time.message}
                    </Form.Field>
                  </div>
                  <div className="grid_column center_grid location_input_top">
                    <Form.Field>
                      <label>Место рождения</label>
                      <input
                        type="text"
                        name="city"
                        placeholder="г. Киев"
                        defaultValue={none.one_company.city}
                        className={"" + (errors.city ? "active" : "")}
                        ref={register({
                          required: true,
                          pattern: /[0-9a-zA-Z!@#$%^&*]{0,}/i
                        })}
                      />
                      {errors.city && errors.city.message}
                    </Form.Field>
                    <div className="input_all location_input">
                      <div className="text_localisation">Часовой пояс:</div>
                      <SelectLocation></SelectLocation>
                    </div>
                  </div>
                  <Checkbox
                    label="Летнее время"
                    className="time_location"
                  ></Checkbox>
                  <div className="grid_column grid_small">
                    <Form.Field>
                      <label>Долгота:</label>
                      <input
                        type="text"
                        name="longtitude"
                        placeholder="36.6666"
                        defaultValue={none.one_company.longtitude}
                        className={"" + (errors.longtitude ? "active" : "")}
                        ref={register({
                          required: true,
                          pattern: /[0-9a-zA-Z!@#$%^&*]{0,}/i
                        })}
                      />
                      {errors.longtitude && errors.longtitude.message}
                    </Form.Field>
                    <Form.Field>
                      <label>Широта:</label>
                      <input
                        type="text"
                        name="latitude"
                        placeholder="49.6666"
                        defaultValue={none.one_company.latitude}
                        className={"" + (errors.latitude ? "active" : "")}
                        ref={register({
                          required: true,
                          pattern: /[0-9a-zA-Z!@#$%^&*]{0,}/i
                        })}
                      />
                      {errors.latitude && errors.latitude.message}
                    </Form.Field>
                  </div>
                  <Button>Сохранить</Button>
                </div>
            </div>
            <div className="create_persons_right">
              <div className="block_image">
                <div className="image_contaner_perons">
                  <img src="../../img/Photo 1.svg" alt=" " />
                </div>
                <div className="button_add">
                  <SvgLoader path="../../img/Photosm.svg">
                    <SvgProxy selector="#cst" />
                  </SvgLoader>{" "}
                  Добавить аватар
                </div>
                <input type="file" name="file" />
              </div>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
}

export default CompanyEdit;
