import React from "react";
import Search from "../addElement/search";
import { NavLink, useRouteMatch, Switch, Route } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { Calendar } from "antd";
import moment from "moment";
import "moment/locale/ru";
import { SvgLoader, SvgProxy } from "react-svgmt";
import EventsAdd from "./EventsAdd";
import EventsList from "./EventsList";
import EventsEdit from "./EventsEdit";

//Локализация календаря
moment.locale("ru");



//Страница списка Событий 
function EventsHome() {

  let { url } = useRouteMatch();
  function onPanelChange(value, mode) {
    console.log(value, mode);
  }

  return (
    <div className="container_list">
      <div className="search_container">
        <Search />
      </div>
      <h2>События</h2>
      <div className="container_events">
        <NavLink to={`${url}/add`}>
          <Button>Создать новое событие</Button>
        </NavLink>
        <div className="calendar_container">
          <div className="calendar_container_left">
            <Calendar fullscreen={false} onPanelChange={onPanelChange} />
          </div>
          <div className="calendar_container_right">
            <div className="date_items">
              <div className="data_items_text">Январь</div>
            </div>
            <div className="date_items">
              <div className="data_items_text">Февраль</div>
            </div>
            <div className="date_items">
              <div className="data_items_text">Март</div>
            </div>
            <div className="date_items">
              <div className="data_items_text">Апрель</div>
            </div>
            <div className="date_items">
              <div className="data_items_text">Май</div>
            </div>
            <div className="date_items">
              <div className="data_items_text">Июнь</div>
            </div>
            <div className="date_items">
              <div className="data_items_text">Июль</div>
            </div>
            <div className="date_items">
              <div className="data_items_text">Август</div>
            </div>
            <div className="date_items">
              <div className="data_items_text">Сентябрь</div>
            </div>
            <div className="date_items">
              <div className="data_items_text">Октябрь</div>
            </div>
            <div className="date_items">
              <div className="data_items_text">Ноябрь</div>
            </div>
            <div className="date_items">
              <div className="data_items_text">Декабрь</div>
            </div>
          </div>
        </div>
        <div className="persons_list_grid persons_list_column">
          <div className="header_persons_list">
            <div className="header_persons_list_name">Название события</div>
            <div className="header_persons_list_date">Дата</div>
            <div className="header_persons_list_city">Город</div>
          </div>
          <div className="persons_list_column">
            <div className="persons_items">
              <div className="persons_items_head ">
                <div className="container_info_persons d_flex_center">
                  <div className="icon_image">
                    E
                    <SvgLoader
                      className="favorite_svg"
                      path="../img/favorites_21.svg"
                    >
                      <SvgProxy selector="#co" />
                    </SvgLoader>
                  </div>
                  <div className="container_info_persons_column">
                    <div className="container_info_persons_name">
                      Ещё одно название события
                    </div>
                    <NavLink
                      className="text_link d_flex_center"
                      to={`${url}/all`}
                    >
                      Перейти{" "}
                      <SvgLoader path="../img/Arrow_21.svg">
                        <SvgProxy selector="#co" />
                      </SvgLoader>
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="d_flex_center date_persons">
                <div className="persons_text_right">21.09.2019</div>
              </div>
              <div className="d_flex_center adress_persons">
                <div className="persons_text_right">Кострома</div>
              </div>
              <div className="d_flex_center favorite_persons">
                <SvgLoader path="../img/favorites.svg">
                  <SvgProxy selector="#co" />
                </SvgLoader>
                <div className="persons_text_right">В избранные</div>
              </div>
              <div className="d_flex_center edit_persons">
                <SvgLoader path="../img/Edit1.svg">
                  <SvgProxy selector="#co" />
                </SvgLoader>
                <div className="persons_text_right">Редактировать</div>
              </div>
              <div className="d_flex_center delete_persons">
                <SvgLoader path="../img/Delete1.svg">
                  <SvgProxy selector="#co" />
                </SvgLoader>
                <div className="persons_text_right">Удалить</div>
              </div>
            </div>
            <div className="persons_items">
              <div className="persons_items_head ">
                <div className="container_info_persons d_flex_center">
                  <div className="icon_image active">
                    E
                    <SvgLoader
                      className="favorite_svg"
                      path="../img/favorites_21.svg"
                    >
                      <SvgProxy selector="#co" />
                    </SvgLoader>
                  </div>
                  <div className="container_info_persons_column">
                    <div className="container_info_persons_name">
                      Ещё одно название события
                    </div>
                    <NavLink
                      className="text_link d_flex_center"
                      to={`${url}/all`}
                    >
                      Перейти{" "}
                      <SvgLoader path="../img/Arrow_21.svg">
                        <SvgProxy selector="#co" />
                      </SvgLoader>
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="d_flex_center date_persons">
                <div className="persons_text_right">20.06.2006</div>
              </div>
              <div className="d_flex_center adress_persons">
                <div className="persons_text_right">Зеленодольск</div>
              </div>
              <div className="d_flex_center favorite_persons">
                <SvgLoader path="../img/favorites.svg">
                  <SvgProxy selector="#co" />
                </SvgLoader>
                <div className="persons_text_right">В избранные</div>
              </div>
              <div className="d_flex_center edit_persons">
                <SvgLoader path="../img/Edit1.svg">
                  <SvgProxy selector="#co" />
                </SvgLoader>
                <div className="persons_text_right">Редактировать</div>
              </div>
              <div className="d_flex_center delete_persons">
                <SvgLoader path="../img/Delete1.svg">
                  <SvgProxy selector="#co" />
                </SvgLoader>
                <div className="persons_text_right">Удалить</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Events() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={EventsHome} />
      <Route path={`${path}/all`} component={EventsList} />
      <Route path={`${path}/add`} component={EventsAdd} />
      <Route path={`${path}/edit`} component={EventsEdit} />
    </Switch>
  );
}
export default Events;
