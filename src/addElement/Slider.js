import React, { useContext, useState, useEffect } from "react";
import Slider from "react-slick";
import { SvgLoader, SvgProxy } from "react-svgmt";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DropdownSlider from "./dropdownslider";
import { Modal, Form, Button } from "semantic-ui-react";
import SearchLinks from "../addElement/searchLinks";
import { useForm } from "react-hook-form";
import { ReduceContext } from "../context/reducerContext";
import { useRouteMatch } from "react-router";
import { Link } from "react-router-dom";

//Блок с слайдером

function ModalExampleSize() {
  const { handleSubmit, register, errors } = useForm();
  const [result, setResult] = useState([]);
  const { url } = useRouteMatch();
  const { none, create_links, Fetch_links } = useContext(ReduceContext);

  useEffect(() => {
    Fetch_links(none.data_id.type_link, none.data_id.type_id);
  }, [url]);

  const newSubmite = (e, { result }) => {
    setResult(result);
  };

  const onSubmit = values => {
    values["obj_type"] = none.data_id.type_link;
    values["obj_id"] = none.data_id.type_id;
    values["link_obj_type"] = none.data_link.type_id;
    values["link_obj_id"] = result.id;
    console.log(values);

    create_links(values);
  };
  return (
    <Modal
      trigger={
        <div className="communication_slider_add">
          <SvgLoader path="../../img/Group 15.svg">
            <SvgProxy selector="#cst" />
          </SvgLoader>
        </div>
      }
      className="modal_slider"
      closeIcon
    >
      <Form className="modal_slider_form" onSubmit={handleSubmit(onSubmit)}>
        <div className="text_all">Создать связь</div>
        <div className="search_container">
          <SearchLinks
            handleResultSelect={(e, resulte) => newSubmite(e, resulte)}
          />
        </div>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Название связи не больше 26 символов</label>
            <input
              type="text"
              name="name"
              placeholder="Название связи"
              className={"" + (errors.name ? "active" : "")}
              ref={register({
                required: true,
                pattern: /^([а-яё]+|[a-z]+){3,16}$/i
              })}
            />
            {errors.name && errors.name.message}
          </Form.Field>
        </Form.Group>
        <Button>Создать связь</Button>
      </Form>
    </Modal>
  );
}

function SimpleSlider() {
  const { none, delete_link } = useContext(ReduceContext);
  console.log(none.data_fetch_links);
  const setting = {
    infinite: true,
    arrow: true,
    speed: 500,
    slidesToShow:
      none.data_fetch_links !== null &&
      (none.data_fetch_links.length >=1 && none.data_fetch_links.length <= 6
        ? none.data_fetch_links.length - 1
        : 7),
    slidesToScroll: 1
  };
  return (
    <div className="slider_content">
      {none.data_fetch_links !== null &&
        (none.data_fetch_links.length === 0 ? (
          <div className="error_none">У вас нет связей</div>
        ) : (
          <Slider {...setting}>
            {none.data_fetch_links.map((items, i) => (
              <div key={i}>
                <div className="items_slider">
                  <div className="icon_elipse">{items.name[0]}</div>
                  <div className="icon_text">{items.name}</div>
                  <DropdownSlider
                    Content={
                      <div className="dropdownslider">
                        <Link
                          to={`/${items.link_obj_type}/id/${items.link_obj_id}`}
                        >
                          Перейти на страницу
                        </Link>
                        <div
                          className="delete_comunity"
                          onClick={() =>
                            delete_link(
                              items.id,
                              none.data_id.type_link,
                              none.data_id.type_id
                            )
                          }
                        >
                          Удалить связь
                        </div>
                        <div className="add_notal">
                          {" "}
                          Добавить натальную карту
                        </div>
                      </div>
                    }
                  ></DropdownSlider>
                </div>
              </div>
            ))}
          </Slider>
        ))}

      <ModalExampleSize></ModalExampleSize>
    </div>
  );
}
export default SimpleSlider;
