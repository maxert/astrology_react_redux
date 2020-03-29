import React, { useEffect, useContext, useState } from "react";
import Search from "../addElement/search";
import { NavLink, useRouteMatch, Switch, Route } from "react-router-dom";
import { Button, Dimmer, Loader } from "semantic-ui-react";
import { Calendar, Empty } from "antd";
import moment from "moment";
import "moment/locale/ru";
import { SvgLoader, SvgProxy } from "react-svgmt";
import EventsAdd from "./EventsAdd";
import EventsList from "./EventsList";
import EventsEdit from "./EventsEdit";
import { ReduceContext } from "../context/reducerContext";
import PaginationExamplePagination from "../addElement/pagination";
import { EventContext } from "../context/eventReducer/eventContext";
import { EventState } from "../context/eventReducer/eventState";
import { ShowState } from "../context/show/showState";
import SearchAll from "./SearchAll";
import { ShowContext } from "../context/show/showContext";
import { GeoState } from "../context/geolocation/GeoState";
import CalendarNew from "../addElement/Calendar";
import CalendarSmall from "../addElement/CalendarSmall";
//Локализация календаря
moment.locale("ru");

//Страница списка Событий
function EventsHome() {
  let { url } = useRouteMatch();
  const d = new Date();
  const dateFormat = "YYYY-MM-DD";
  const [dateNow, setDateNow] = useState(moment(d).format("YYYY"));
  const { display } = useContext(ShowContext);

  const {
    Add_favorite,
    delete_favorite,
    none,
    pagination_number,
    isLoading
  } = useContext(ReduceContext);

  const { Fetch_data_events, delete_events, state_event } = useContext(
    EventContext
  );

  function pagination(Value) {
    pagination_number(Value._targetInst.pendingProps.value);
    Fetch_data_events(Value._targetInst.pendingProps.value, none.sorted);
    isLoading(false);
  }

  useEffect(() => {
    Fetch_data_events(none.pagination !== 1 ? none.pagination : 1, none.sorted);
  }, [none.data_number && none.data_number.fav]);

  useEffect(() => {
    Fetch_data_events(none.pagination !== 1 ? none.pagination : 1, none.sorted);
    isLoading(false);
  }, [none.sorted]);

  function onAllChange(date) {
    setDateNow(moment(date).format("YYYY"));
  }
  return (
    <div className="container_list">
      <div className="search_container">
        <Search />
      </div>
      <h2>События</h2>
      {display.isSearch === true ? (
        <SearchAll NameButton={"Создать новое событие"}></SearchAll>
      ) : (
        <div className="container_events">
          <NavLink to={`${url}/add`}>
            <Button>Создать новое событие</Button>
          </NavLink>
          <div className="calendar_container">
            <div className="calendar_container_left">
              <CalendarNew
                onAllChange={date => onAllChange(date)}
              ></CalendarNew>
            </div>
            <div className="calendar_container_right">
              {moment(d, dateFormat)._locale._months.standalone.map(
                (item, id) => (
                  <div className="date_items" key={id}>
                    <div className="data_items_text">{item}</div>
                    <CalendarSmall
                      NewDefault={moment(d, dateFormat).month(id)}
                      ValueSet={moment(d, dateFormat)
                        .month(id)
                        .year(dateNow)}
                    ></CalendarSmall>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="persons_list_grid persons_list_column">
            <div className="header_persons_list">
              <div className="header_persons_list_name">Название события</div>
              <div className="header_persons_list_date">Дата</div>
              <div className="header_persons_list_city">Город</div>
            </div>
            <div className="persons_list_column">
              {none.isLoading === false ? (
                <Dimmer className="invert_none" active inverted>
                  <Loader size="massive">Loading</Loader>
                </Dimmer>
              ) : (
                <div className="persons_list_column">
                  {state_event.data_events.events !== undefined &&
                    state_event.data_events.events.map((event, i) => (
                      <div className="persons_items" key={i}>
                        <div className="persons_items_head ">
                          <div className="container_info_persons d_flex_center">
                            <div
                              className={
                                event.fav > 0
                                  ? "icon_image  active"
                                  : "icon_image"
                              }
                            >
                              <div className="hidden_all">
                                <div className="text_persons">
                                  {event.name[0]}
                                </div>
                              </div>
                              <SvgLoader
                                className="favorite_svg"
                                path="../../img/favorites_21.svg"
                              >
                                <SvgProxy selector="#co" />
                              </SvgLoader>
                            </div>
                            <div className="container_info_persons_column">
                              <div className="container_info_persons_name">
                                {event.name}
                              </div>
                              <NavLink
                                className="text_link d_flex_center"
                                to={`${url}/id/${event.id}`}
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
                            {event.event_date}
                          </div>
                        </div>
                        <div className="d_flex_center adress_persons">
                          {event.city !== null ? (
                            <div className="persons_text_right">
                              {event.city}
                            </div>
                          ) : (
                            <div className="persons_text_right"></div>
                          )}
                        </div>

                        {event.fav > 0 ? (
                          <div
                            className="d_flex_center favorite_persons"
                            onClick={() =>
                              delete_favorite(
                                event.id,
                                none.data_link_favorite
                                  ? none.data_link_favorite.type_id
                                  : "person",
                                none.pagination !== 1 ? none.pagination : 1,
                                none.sorted
                              )
                            }
                          >
                            <SvgLoader path="../../img/favorites_21.svg">
                              <SvgProxy selector="#co" />
                            </SvgLoader>
                            <div className="persons_text_right">
                              В избранных
                            </div>
                          </div>
                        ) : (
                          <div
                            className="d_flex_center favorite_persons"
                            onClick={() =>
                              Add_favorite(
                                none.data_link_favorite
                                  ? none.data_link_favorite.type_id
                                  : "person",
                                event.id,
                                none.pagination !== 1 ? none.pagination : 1,
                                none.sorted
                              )
                            }
                          >
                            <SvgLoader path="../../img/favorites.svg">
                              <SvgProxy selector="#co" />
                            </SvgLoader>
                            <div className="persons_text_right">
                              В избранные
                            </div>
                          </div>
                        )}

                        <NavLink
                          to={`/event/${event.id}/edit`}
                          className="d_flex_center edit_persons"
                        >
                          <SvgLoader path="../../img/Edit1.svg">
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                          <div className="persons_text_right">
                            Редактировать
                          </div>
                        </NavLink>
                        <div className="d_flex_center delete_persons">
                          <SvgLoader path="../../img/Delete1.svg">
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                          <div
                            className="persons_text_right"
                            onClick={() =>
                              delete_events(
                                event.id,
                                none.pagination !== 1 ? none.pagination : 1,
                                none.sorted
                              )
                            }
                          >
                            Удалить
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {state_event.data_events.length !== 0
              ? state_event.data_events.events.length && (
                  <div className="d_flex_center pagination">
                    <PaginationExamplePagination
                      listPageAll={
                        state_event.data_events
                          ? state_event.data_events.pages
                          : 1
                      }
                      listpagedefault={
                        none.pagination !== undefined ? none.pagination : 1
                      }
                      SelectPagination={SelectPagination =>
                        pagination(SelectPagination)
                      }
                    />
                  </div>
                )
              : null}
          </div>
        </div>
      )}
    </div>
  );
}

function Events() {
  let { path } = useRouteMatch();
  return (
    <EventState>
      <Switch>
        <Route exact path={path}>
          <ShowState>
            <EventsHome></EventsHome>
          </ShowState>
        </Route>
        <Route path={`${path}/id/:id`}>
          <ShowState>
            <EventsList></EventsList>
          </ShowState>
        </Route>
        <Route path={`${path}/add`}>
          <GeoState>
            <EventsAdd></EventsAdd>
          </GeoState>
        </Route>
        <Route path={`${path}/:id/edit`}>
          <GeoState>
            <EventsEdit></EventsEdit>
          </GeoState>
        </Route>
      </Switch>
    </EventState>
  );
}
export default Events;
