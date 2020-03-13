import React, { useEffect, useContext } from "react";
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
import { ReduceContext } from "../context/reducerContext";
import PaginationExamplePagination from "../addElement/pagination";

//Локализация календаря
moment.locale("ru");

//Страница списка Событий
function EventsHome() {
  let { url } = useRouteMatch();
  function onPanelChange(value, mode) {
    console.log(value, mode);
  }

  const { Fetch_data_events, delete_events, none ,Add_favorite} = useContext(
    ReduceContext
  );

  function pagination(Value) {
    Fetch_data_events(Value._targetInst.pendingProps.value);
  }


  useEffect(() => {
    Fetch_data_events();
  });

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
            {none.data_events !== null &&
              none.data_events.events.map((events, i) => (
                <div className="persons_items" key={i}>
                  <div className="persons_items_head ">
                    <div className="container_info_persons d_flex_center">
                      <div className="icon_image">
                        {events.name[0]}
                        <SvgLoader
                          className="favorite_svg"
                          path="../../img/favorites_21.svg"
                        >
                          <SvgProxy selector="#co" />
                        </SvgLoader>
                      </div>
                      <div className="container_info_persons_column">
                        <div className="container_info_persons_name">
                          {events.name}
                        </div>
                        <NavLink
                          className="text_link d_flex_center"
                          to={`${url}/id/${events.id}`}
                        >
                          Перейти{" "}
                          <SvgLoader path="../../img/Arrow_21.svg">
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                  <div className="d_flex_center date_persons">
                    <div className="persons_text_right">
                      {events.event_date}
                    </div>
                  </div>
                  <div className="d_flex_center adress_persons">
                    <div className="persons_text_right">{events.city}</div>
                  </div>
                  <div className="d_flex_center favorite_persons" onClick={()=>Add_favorite("event",events.id)}>
                    <SvgLoader path="../../img/favorites.svg">
                      <SvgProxy selector="#co" />
                    </SvgLoader>
                    <div className="persons_text_right">В избранные</div>
                  </div>
                  <NavLink
                    to={`${url}/${events.id}/edit`}
                    className="d_flex_center edit_persons"
                  >
                    <SvgLoader path="../../img/Edit1.svg">
                      <SvgProxy selector="#co" />
                    </SvgLoader>
                    <div className="persons_text_right">Редактировать</div>
                  </NavLink>
                  <div className="d_flex_center delete_persons">
                    <SvgLoader path="../../img/Delete1.svg">
                      <SvgProxy selector="#co" />
                    </SvgLoader>
                    <div
                      className="persons_text_right"
                      onClick={() => {
                        delete_events(events.id);
                      }}
                    >
                      Удалить
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="d_flex_center pagination">
            <PaginationExamplePagination
              listPageAll={none.data_events ? none.data_events.pages : 1}
              listpagedefault={1}
              SelectPagination={SelectPagination =>
                pagination(SelectPagination)
              }
            />
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
      <Route path={`${path}/id/:id`} component={EventsList} />
      <Route path={`${path}/add`} component={EventsAdd} />
      <Route path={`${path}/:id/edit`} component={EventsEdit} />
    </Switch>
  );
}
export default Events;
