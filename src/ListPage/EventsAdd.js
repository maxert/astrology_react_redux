import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { Form, Button, Input, Icon, Checkbox } from "semantic-ui-react";
import SelectLocation from "../addElement/SelectLocation";
import { useForm } from "react-hook-form";
import { ReduceContext } from "../context/reducerContext";

//Страница Добавления Событий

function EventsAdd() {
  const { handleSubmit, register, errors } = useForm();
  const { none, Add_events } = useContext(ReduceContext);
  const onSubmit = values => {
    console.log(values);
    values["timezone"] = none.option_value;
    Add_events(values);
  };
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
                    required: true,
                    pattern: /^([а-яё]+|[a-z]+){1,16}$/i
                  })}
                />
                {errors.description && errors.description.message}
              </Form.Field>

              <Button>Сохранить</Button>
            </div>
            <div className="personal_date all_box">
              <div className="text_all">Место и время основания события</div>
              <div className="grid_column center_grid">
                <div className="input_all">
                  <Form.Field>
                    <Input placeholder="дд . мм . гггг">
                      <label>Дата</label>
                      <Icon className="icon_date" />
                      <input
                        type="text"
                        name="event_date"
                        placeholder="дд . мм . гггг"
                        className={
                          "" + (errors.event_date ? "date active" : "")
                        }
                        ref={register({
                          required: true,
                          pattern: /[0-9a-zA-Z!@#$%^&*]{0,}/i
                        })}
                      />
                      {errors.event_date && errors.event_date.message}
                    </Input>
                  </Form.Field>
                </div>
                <Form.Field>
                  <label>Время рождения</label>
                  <input
                    type="text"
                    name="event_time"
                    placeholder="пример: 21:34"
                    className={"" + (errors.event_time ? "active" : "")}
                    ref={register({
                      required: true,
                      pattern: /[0-9a-zA-Z!@#$%^&*]{0,}/i
                    })}
                  />
                  {errors.event_time && errors.event_time.message}
                </Form.Field>
              </div>
              <div className="grid_column center_grid location_input_top">
                <Form.Field>
                  <label>Место рождения</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="ул. Энергетическая 42, Харьков, Харьковская область"
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
                    name="longitude"
                    className={"" + (errors.longitude ? "active" : "")}
                    ref={register({
                      required: true,
                      pattern: /[0-9a-zA-Z!@#$%^&*]{0,}/i
                    })}
                  />
                  {errors.longitude && errors.longitude.message}
                </Form.Field>
                <Form.Field>
                  <label>Широта:</label>
                  <input
                    type="text"
                    name="latitude"
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
    </div>
  );
}

export default EventsAdd;
