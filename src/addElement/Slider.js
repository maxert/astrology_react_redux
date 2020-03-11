import React, { Component } from "react";
import Slider from "react-slick";
import { SvgLoader, SvgProxy } from "react-svgmt";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DropdownSlider from "./dropdownslider";
import { Modal, Form, Button } from "semantic-ui-react";
import Search from "../addElement/search";


//Блок с слайдером

class ModalExampleSize extends Component {
  render() {
    return (
      <Modal
        trigger={
          <div className="communication_slider_add" >
            <SvgLoader path="../img/Group 15.svg">
              <SvgProxy selector="#cst" />
            </SvgLoader>
          </div>
        }
        className="modal_slider"
        closeIcon
      >
        <Form className="modal_slider_form">
          <div className="text_all">Создать связь</div>
          <div className="search_container">
            <Search />
          </div>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Название связи не больше 26 символов"
              placeholder="Название связи"
            />
          </Form.Group>
          <Button>Создать связь</Button>
        </Form>
      </Modal>
    );
  }
}

function SimpleSlider() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1
  };
  return (
    <div className="slider_content">
      <Slider {...settings}>
        <div className="items_slider">
          <div className="icon_elipse">
            <img src="../img/Rectangle 89.png" alt="Картинка" />
          </div>
          <div className="icon_text">Название 1</div>
          <DropdownSlider></DropdownSlider>
        </div>
        <div className="items_slider">
          <div className="icon_elipse">
            <img src="../img/Rectangle 89.png" alt="Картинка" />
          </div>
          <div className="icon_text">Название 1</div>
          <DropdownSlider></DropdownSlider>
        </div>
        <div className="items_slider">
          <div className="icon_elipse">
            <img src="../img/Rectangle 89.png" alt="Картинка" />
          </div>
          <div className="icon_text">Название 1</div>
          <DropdownSlider></DropdownSlider>
        </div>
        <div className="items_slider">
          <div className="icon_elipse">
            <img src="../img/Rectangle 89.png" alt="Картинка" />
          </div>
          <div className="icon_text">Название 1</div>
          <DropdownSlider></DropdownSlider>
        </div>
        <div className="items_slider">
          <div className="icon_elipse">
            <img src="../img/Rectangle 89.png" alt="Картинка" />
          </div>
          <div className="icon_text">Название 1</div>
          <DropdownSlider></DropdownSlider>
        </div>
        <div className="items_slider">
          <div className="icon_elipse">
            <img src="../img/Rectangle 89.png" alt="Картинка" />
          </div>
          <div className="icon_text">Название 1</div>
          <DropdownSlider></DropdownSlider>
        </div>
        <div className="items_slider">
          <div className="icon_elipse">
            <img src="../img/Rectangle 89.png" alt="Картинка" />
          </div>
          <div className="icon_text">Название 1</div>
          <DropdownSlider></DropdownSlider>
        </div>
        <div className="items_slider">
          <div className="icon_elipse">
            <img src="../img/Rectangle 89.png" alt="Картинка" />
          </div>
          <div className="icon_text">Название 1</div>
        </div>
        <div className="items_slider">
          <div className="icon_elipse">
            <img src="../img/Rectangle 89.png" alt="Картинка" />
          </div>
          <div className="icon_text">Название 1</div>
          <DropdownSlider></DropdownSlider>
        </div>
      </Slider>
      <ModalExampleSize></ModalExampleSize>
    </div>
  );
}
export default SimpleSlider;
