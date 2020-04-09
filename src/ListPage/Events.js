import React, { useEffect, useContext, useState } from "react";
import Search from "../addElement/search";
import { NavLink, useRouteMatch, Switch, Route } from "react-router-dom";
import { Button, Dimmer, Loader } from "semantic-ui-react";
import moment from "moment";
import "moment/locale/ru";
import { SvgLoader, SvgProxy } from "react-svgmt";
import EventsAdd from "./EventsAdd";
import EventsList from "./EventsList";
import EventsEdit from "./EventsEdit";
import { ReduceContext } from "../context/reducerContext";
import { EventContext } from "../context/eventReducer/eventContext";
import { ShowState } from "../context/show/showState";
import SearchAll from "./SearchAll";
import { ShowContext } from "../context/show/showContext";
import { GeoState } from "../context/geolocation/GeoState";
import CalendarNew from "../addElement/Calendar";
import CalendarSmall from "../addElement/CalendarSmall";
import Axios from "axios";
import manifest from ".././manifest";
import EditDrop from "../addElement/editDropDown";
//Локализация календаря
moment.locale("ru");

//Страница списка Событий
function EventsHome() {
  let { url } = useRouteMatch();
  const d = new Date();
  const [selected, setSelected] = useState();
  const dateFormat = "YYYY-MM-DD";
  const [dateSmall, setDateSmall] = useState(moment(d, dateFormat));
  const [dateNow, setDateNow] = useState(moment(d).format("YYYY"));
  const { display, search_sort_fav_data } = useContext(ShowContext);
  const { sort_data_events } = useContext(EventContext);
  const { Add_favorite, delete_favorite, none } = useContext(ReduceContext);

  const { Fetch_data_events, delete_events, state_event } = useContext(
    EventContext,
  );
  const [date, setDate] = useState(0);
  useEffect(() => {
    Axios.get(manifest.URL + "/api/eventdates", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("users")}`,
      },
    }).then((res) => {
      setDate(res.data);
    });
    search_sort_fav_data(true, display.data_value, true);
  }, []);
  useEffect(() => {
    if (none.data_number !== undefined) {
      Fetch_data_events(
        none.pagination !== 1 ? none.pagination : 1,
        none.sorted,
        localStorage.getItem("date_event") !== null
          ? localStorage.getItem("date_event")
          : moment(dateSmall).format("YYYY-MM-DD"),
      );
    }
  }, [none.data_number && none.data_number.fav]);
  function onAllChange(date) {
    setDateNow(moment(date).format("YYYY"));
    setDateSmall(date);

    localStorage.setItem("date_event", moment(date).format("YYYY-MM-DD"));
  }
  function onChangeSmall(date, id) {
    sort_data_events(
      none.pagination !== 1 ? none.pagination : 1,
      none.sorted,
      moment(date._d).format("YYYY-MM-DD"),
    );

    localStorage.setItem("date_event", moment(date).format("YYYY-MM-DD"));
  }
  return (
    <div className="container_list">
      <div className="search_container">
        <Search />
      </div>
      <div className="header_name">
        <h2>События</h2>
        <NavLink to={`${url}/add`}>
          <Button>Создать новое событие</Button>
        </NavLink>
      </div>
      {display.isSearch === true ? (
        <SearchAll
          NameButton={"Создать новое событие"}
          URL={url}
          NameCategory={"Название события"}
          isAll={true}></SearchAll>
      ) : (
        <div className="container_events">
          <div className="calendar_container">
            <div className="calendar_container_left">
              <CalendarNew
                NewDefault={moment(d, dateFormat)}
                ValueSmall={dateSmall}
                DateSet={date}
                onAllChange={(date) => onAllChange(date)}></CalendarNew>
            </div>
            <div className="calendar_container_right">
              {moment(d, dateFormat)._locale._months.standalone.map(
                (item, id) => (
                  <div
                    className={
                      "date_items" +
                      (id === selected ||
                      id === moment(dateSmall).format("M") - 1
                        ? " active"
                        : "")
                    }
                    key={id}
                    onClick={() => {
                      setDateSmall(moment(dateSmall, dateFormat).month(id));
                      setSelected(id);
                    }}>
                    <div className="data_items_text">{item}</div>
                    <CalendarSmall
                      onPanelChangeSmall={(date) => onChangeSmall(date, id)}
                      DateSet={date}
                      NewDefault={moment(d, dateFormat).month(id)}
                      ValueSet={moment(d, dateFormat)
                        .month(id)
                        .year(dateNow)}></CalendarSmall>
                  </div>
                ),
              )}
            </div>
          </div>
          {none.width_mob <= 767 ? (
            <div className="persons_list_grid">
              {state_event.data_events.events !== undefined &&
                state_event.data_events.events.map((events) => (
                  <div className="persons_items" key={events.id}>
                    <div className="persons_items_head d_flex_center">
                      <div className="container_info_persons d_flex_center">
                        <div
                          className={
                            events.fav > 0 ? "icon_image  active" : "icon_image"
                          }>
                          <div className="hidden_all">
                            <div className="text_persons">{events.name[0]}</div>
                          </div>
                          <SvgLoader
                            className="favorite_svg"
                            path="../../img/favorites_21.svg">
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                        </div>
                        <div className="container_info_persons_name">
                          {events.name}
                        </div>
                      </div>
                      <div className="persons_edit">
                        <EditDrop
                          key={events.id}
                          ID={events.id}
                          Type={none.data_link_favorite.type_id}
                          Favorite={events.fav}
                          ClickDelete={(e, data) =>
                            delete_events(
                              events.id,
                              none.pagination !== 1 ? none.pagination : 1,
                              none.sorted,
                            )
                          }></EditDrop>
                        <SvgLoader path="../../img/Group5.svg">
                          <SvgProxy selector="#co" />
                        </SvgLoader>
                      </div>
                    </div>
                    <div className="d_flex_center date_persons">
                      <div className="persons_text_left">Дата/Время:</div>

                      <div className="persons_text_right">
                        {events.event_date + " " + events.event_time}
                      </div>
                    </div>

                    {events.city !== null ? (
                      <div className="d_flex_center adress_persons">
                        <div className="persons_text_left">Место события:</div>
                        <div className="persons_text_right">{events.city}</div>
                      </div>
                    ) : (
                      <div className="d_flex_center adress_persons"></div>
                    )}

                    <div className="d_flex_center page_persons">
                      <NavLink
                        className="text_link d_flex_center"
                        to={`${url}/id/${events.id}`}>
                        Перейти{" "}
                        <SvgLoader path="../../img/Arrow_21.svg">
                          <SvgProxy selector="#co" />
                        </SvgLoader>
                      </NavLink>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="persons_list_grid persons_list_column">
              <div className="header_persons_list">
                <div className="header_persons_list_name">Название события</div>
                <div className="header_persons_list_date">Дата/Время</div>
                <div className="header_persons_list_city">Место события</div>
              </div>
              {none.isLoading === false ? (
                <Dimmer className="invert_none" active inverted>
                  <Loader size="massive">Загрузка</Loader>
                </Dimmer>
              ) : (
                <div className="persons_list_column">
                  <div className="persons_list_column">
                    {state_event.data_events.events !== undefined &&
                      state_event.data_events.events.map((event, i) =>
                        none.width_mob <= 1280 ? (
                          <div className="persons_items" key={i}>
                            <div className="persons_items_head ">
                              <div className="container_info_persons d_flex_center">
                                <div
                                  className={
                                    event.fav > 0
                                      ? "icon_image  active"
                                      : "icon_image"
                                  }>
                                  <div className="hidden_all">
                                    <div className="text_persons">
                                      {event.name[0]}
                                    </div>
                                  </div>
                                  <SvgLoader
                                    className="favorite_svg"
                                    path="../../img/favorites_21.svg">
                                    <SvgProxy selector="#co" />
                                  </SvgLoader>
                                </div>
                                <div className="container_info_persons_column">
                                  <div className="container_info_persons_name">
                                    {event.name}
                                  </div>
                                  <NavLink
                                    className="text_link d_flex_center"
                                    to={`${url}/id/${event.id}`}>
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
                              <div className="persons_text_right">
                                {event.event_time}
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

                            <div className="persons_edit">
                              <EditDrop
                                key={event.id}
                                ID={event.id}
                                Type={none.data_link_favorite.type_id}
                                Favorite={event.fav}
                                ClickDelete={(e, data) =>
                                  delete_events(
                                    event.id,
                                    none.pagination !== 1 ? none.pagination : 1,
                                    none.sorted,
                                  )
                                }></EditDrop>
                              <SvgLoader path="../../img/Group5.svg">
                                <SvgProxy selector="#co" />
                              </SvgLoader>
                            </div>
                          </div>
                        ) : (
                          <div className="persons_items" key={i}>
                            <div className="persons_items_head ">
                              <div className="container_info_persons d_flex_center">
                                <div
                                  className={
                                    event.fav > 0
                                      ? "icon_image  active"
                                      : "icon_image"
                                  }>
                                  <div className="hidden_all">
                                    <div className="text_persons">
                                      {event.name[0]}
                                    </div>
                                  </div>
                                  <SvgLoader
                                    className="favorite_svg"
                                    path="../../img/favorites_21.svg">
                                    <SvgProxy selector="#co" />
                                  </SvgLoader>
                                </div>
                                <div className="container_info_persons_column">
                                  <div className="container_info_persons_name">
                                    {event.name}
                                  </div>
                                  <NavLink
                                    className="text_link d_flex_center"
                                    to={`${url}/id/${event.id}`}>
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
                              <div className="persons_text_right">
                                {event.event_time}
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
                                    none.sorted,
                                  )
                                }>
                                <SvgLoader path="../../img/favorites_21.svg">
                                  <SvgProxy selector="#co" />
                                </SvgLoader>
                                <div className="persons_text_right">
                                  Удалить из избранных
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
                                  )
                                }>
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
                              className="d_flex_center edit_persons">
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
                                    none.sorted,
                                  )
                                }>
                                Удалить
                              </div>
                            </div>
                          </div>
                        ),
                      )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Events() {
  let { path } = useRouteMatch();
  return (
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
  );
}
export default Events;
