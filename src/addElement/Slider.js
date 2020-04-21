import React, { useContext, useState, useEffect } from "react";
import Slider from "infinite-react-carousel";
import { SvgLoader, SvgProxy } from "react-svgmt";
import DropdownSlider from "./dropdownslider";
import { Modal, Form, Button } from "semantic-ui-react";
import SearchLinks from "../addElement/searchLinks";
import { useForm } from "react-hook-form";
import { ReduceContext } from "../context/reducerContext";
import { useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import manifest from ".././manifest";

//Блок с слайдером
function ModalExampleSize() {
  const [dataSearch, setSearch] = useState({ isLoading: false });
  const { handleSubmit, register, errors } = useForm();
  const [result, setResult] = useState([]);
  const alert = useAlert();
  const { none, create_links, search_data_links, search_select } = useContext(
    ReduceContext,
  );
  const [close, setCloseNew] = useState(false);
  const { url } = useRouteMatch();
  const newSubmite = (e, { result }) => {
    setResult(result);
  };
  function handleSearchChange(e, value) {
    setResult(value.result);
    setSearch({ isLoading: true });
    search_data_links(
      none.data_link.type_link,
      value.value,
      none.data_link.type_id,
    );
    setTimeout(() => {
      setSearch({ isLoading: false });
    }, 300);
  }
  const onSubmit = (values) => {
    if (result !== undefined) {
  
      if( result.id!==Number(url.replace(/\D+/g, ""))){
    
        values["obj_type"] = none.data_id.type_link;
        values["obj_id"] = none.data_id.type_id;
        values["link_obj_type"] = none.data_link.type_id;
        values["link_obj_id"] = result.id;
        setCloseNew(false);
        create_links(values);
      }else{
        alert.error(
          "Нельзя создать для текущей страницы",
        );
      }
      
    } else {
      alert.error(
        "Такой карточки нет в базе программы, создайте ее и вернитесь к созданию связи",
      );
    }
  };
  return (
    <Modal
      open={close}
      onClose={() => setCloseNew(false)}
      trigger={
        <div
          className="communication_slider_add"
          onClick={() => {
            setCloseNew(true);
            search_select(
              none.data_link_favorite.type_link,
              none.data_link_favorite.type_id,
            );
          }}>
          <SvgLoader path="../../img/Group 15.svg">
            <SvgProxy selector="#cst" />
          </SvgLoader>
        </div>
      }
      className="modal_slider"
      closeIcon>
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
                pattern: /^([а-яё]+|[a-z]+|[^\\s*]){3,26}$/i,
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
  const [Close, setClosePop] = useState(false);
  const [Select, setSelect] = useState();
  function handleClose(i) {
    setClosePop(true);
    setSelect(i);
  }
  function handleCloseOpen(e, date, i) {
    setClosePop(false);
    setSelect(i);
  }

  const setting = {
    rows: none.width_mob <= 767 ? 2 : 1,
    dots: none.width_mob <= 767 ? true : false,
    arrow: none.width_mob <= 767 ? false : true,
    speed: 500,
    slidesToShow: none.width_mob <= 1280 ? (none.width_mob <= 767 ? 2 : 4) : 7,
    slidesToScroll: none.width_mob <= 767 ? 1 : 1,
  };
  return (
    <div className="slider_content">
      {none.data_fetch_links !== null &&
        (none.data_fetch_links.length === 0 ? (
          <div className="error_none">У вас нет связей</div>
        ) : none.data_fetch_links.length >= 7 ||
          (none.width_mob <= 1280 && none.data_fetch_links.length >= 4) ||
          (none.width_mob <= 767 && none.data_fetch_links.length >= 2) ? (
          <Slider {...setting} >
            {none.data_fetch_links.map((items, i) => (
              <div key={items.id}>
                <div className="items_slider">
                  <div className="icon_elipse">
                    {items.obj.image !== null ? (
                      items.obj.image !== undefined ? (
                        <img
                          src={manifest.URL + items.obj.image}
                          alt="Картинка"
                        />
                      ) : (
                        <div className="text_all_image">{items.name[0]}</div>
                      )
                    ) : (
                      <div className="text_all_image">{items.name[0]}</div>
                    )}
                  </div>
                  <div className="icon_text">{items.name}</div>
                  <DropdownSlider
                    Close={i === Select && Close === true ? true : false}
                    handleClose={() => handleClose(i)}
                    handleCloseOpen={(e, date) => handleCloseOpen(e, date, i)}
                    Content={
                      <div className="dropdownslider" data-index={Select}>
                        <Link
                          to={{
                            pathname: `/${items.link_obj_type}/id/${items.link_obj_id}`,
                            state: null,
                          }}>
                          Перейти на страницу
                        </Link>
                        <div
                          className="delete_comunity"
                          onClick={() => {
                            delete_link(
                              items.id,
                              none.data_id.type_link,
                              none.data_id.type_id,
                            );
                            setClosePop(false);
                            setSelect(i);
                          }}>
                          Удалить связь
                        </div>
                        {items.isDisplay === null ? null : items.isDisplay ===
                          false ? (
                          <div
                            className="add_notal"
                            onClick={() =>
                              show_notal_card(items.id, none.data_fetch_links)
                            }>
                            Показать натальную карту
                          </div>
                        ) : (
                          <div
                            className="add_notal"
                            onClick={() =>
                              show_notal_card(items.id, none.data_fetch_links)
                            }>
                            Скрыть натальную карту
                          </div>
                        )}
                      </div>
                    }
                    Disabled={true}></DropdownSlider>
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
                      items.obj.image !== undefined ? (
                        <img
                          src={manifest.URL + items.obj.image}
                          alt="Картинка"
                        />
                      ) : (
                        <div className="text_all_image">{items.name[0]}</div>
                      )
                    ) : (
                      <div className="text_all_image">{items.name[0]}</div>
                    )}
                  </div>
                  <div className="icon_text">{items.name}</div>

                  <DropdownSlider
                    Close={i === Select && Close === true ? true : false}
                    handleClose={() => handleClose(i)}
                    handleCloseOpen={(e, date) => handleCloseOpen(e, date, i)}
                    Content={
                      <div className="dropdownslider">
                        <Link
                          to={{
                            pathname: `/${items.link_obj_type}/id/${items.link_obj_id}`,
                            state: null,
                          }}>
                          Перейти на страницу
                        </Link>
                        <div
                          className="delete_comunity"
                          onClick={() => {
                            delete_link(
                              items.id,
                              none.data_id.type_link,
                              none.data_id.type_id,
                            );
                            setClosePop(false);
                            setSelect(i);
                          }}>
                          Удалить связь
                        </div>
                        {items.isDisplay === null ? null : items.isDisplay ===
                          false ? (
                          <div
                            className="add_notal"
                            onClick={() =>
                              show_notal_card(items.id, none.data_fetch_links)
                            }>
                            Показать натальную карту
                          </div>
                        ) : (
                          <div
                            className="add_notal"
                            onClick={() =>
                              show_notal_card(items.id, none.data_fetch_links)
                            }>
                            Скрыть натальную карту
                          </div>
                        )}
                      </div>
                    }
                    Disabled={true}></DropdownSlider>
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
