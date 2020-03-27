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
import { useAlert } from "react-alert";

//Блок с слайдером

function ModalExampleSize() {
  const [dataSearch, setSearch] = useState({ isLoading: false });
  const { handleSubmit, register, errors } = useForm();
  const [result, setResult] = useState([]);
  const { url } = useRouteMatch();
  const alert = useAlert();
  const { none, create_links, Fetch_links, search_data_links } = useContext(
    ReduceContext
  );
  const [close, setCloseNew] = useState(false);
  useEffect(() => {
    Fetch_links(none.data_id.type_link, none.data_id.type_id);
  }, [url]);

  const newSubmite = (e, { result }) => {
    setResult(result);
  };
  function handleSearchChange(e, value) {
    setResult(value.result);
    setSearch({ isLoading: true });
    search_data_links(
      none.data_link.type_link,
      value.value,
      none.data_link.type_id
    );
    debugger;
    setTimeout(() => {
      setSearch({ isLoading: false });
    }, 300);
    console.log(value);
  }
  const onSubmit = values => {
    debugger;
    if (result !== undefined) {
      values["obj_type"] = none.data_id.type_link;
      values["obj_id"] = none.data_id.type_id;
      values["link_obj_type"] = none.data_link.type_id;
      values["link_obj_id"] = result.id;
      console.log(values);
      setCloseNew(false);
      create_links(values);
    } else {
      alert.error("Выбирете данные из поля");
    }
  };
  return (
    <Modal
      open={close}
      onClose={() => setCloseNew(false)}
      trigger={
        <div
          className="communication_slider_add"
          onClick={() => setCloseNew(true)}
        >
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
        <div className="search_container_home">
          <SearchLinks
            isLoading={dataSearch.isLoading}
            handleSearchChange={(e, data) => handleSearchChange(e, data)}
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
                pattern: /^([а-яё]+|[a-z]+|[^\\s*]){3,26}$/i
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
  const { none, delete_link, show_notal_card } = useContext(ReduceContext);
  const [isOpen, setOpen] = useState(false);
  const setting = {
    infinite: true,
    arrow: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1
  };
  return (
    <div className="slider_content">
      {none.data_fetch_links !== null &&
        (none.data_fetch_links.length === 0 ? (
          <div className="error_none">У вас нет связей</div>
        ) : none.data_fetch_links.length >= 7 ? (
          <Slider {...setting}>
            {none.data_fetch_links.map((items, i) => (
              <div key={i}>
                <div className="items_slider">
                  <div className="icon_elipse">
                    {items.obj.image !== null ? (
                      <img
                        src={
                          "http://1690550.masgroup.web.hosting-test.net" +
                          items.obj.image
                        }
                        alt="Картинка"
                      />
                    ) : (
                      <div className="text_all_image">{items.name[0]}</div>
                    )}
                  </div>
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
                        {items.isDisplay === null ? null : items.isDisplay ===
                          false ? (
                          <div
                            className="add_notal"
                            onClick={() =>
                              show_notal_card(items.id, none.data_fetch_links)
                            }
                          >
                            Показать натальную карту
                          </div>
                        ) : (
                          <div
                            className="add_notal"
                            onClick={() =>
                              show_notal_card(items.id, none.data_fetch_links)
                            }
                          >
                            Скрыть натальную карту
                          </div>
                        )}
                      </div>
                    }
                  ></DropdownSlider>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="slider_center">
            {none.data_fetch_links.map((items, i) => (
              <div key={i}>
                <div className="items_slider">
                  <div className="icon_elipse">
                    {items.obj.image !== null ? (
                      <img
                        src={
                          "http://1690550.masgroup.web.hosting-test.net" +
                          items.obj.image
                        }
                        alt="Картинка"
                      />
                    ) : (
                      <div className="text_all_image">{items.name[0]}</div>
                    )}
                  </div>
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
                          onClick={() => {
                            delete_link(
                              items.id,
                              none.data_id.type_link,
                              none.data_id.type_id
                            );
                          }}
                        >
                          Удалить связь
                        </div>
                        {items.isDisplay === null ? null : items.isDisplay ===
                          false ? (
                          <div
                            className="add_notal"
                            onClick={() =>
                              show_notal_card(items.id, none.data_fetch_links)
                            }
                          >
                            Показать натальную карту
                          </div>
                        ) : (
                          <div
                            className="add_notal"
                            onClick={() =>
                              show_notal_card(items.id, none.data_fetch_links)
                            }
                          >
                            Скрыть натальную карту
                          </div>
                        )}
                      </div>
                    }
                  ></DropdownSlider>
                </div>
              </div>
            ))}
          </div>
        ))}

      <ModalExampleSize></ModalExampleSize>
    </div>
  );
}
export default SimpleSlider;
