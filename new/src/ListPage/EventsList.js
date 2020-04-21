import React, { useContext, useEffect } from "react";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { NavLink, useRouteMatch, useHistory } from "react-router-dom";
import { Button, Dimmer, Loader } from "semantic-ui-react";
import Community from "../addElement/community";
import NotalCommunity from "../addElement/notal_community";
import { ReduceContext } from "../context/reducerContext";
import ResultCardAll from "../addElement/resultcardall";
import NoteList from "../addElement/NoteList";
import { NoteState } from "../context/noteReducer/noteState";
import CreateNote from "../addElement/createNote";

//Страница Событий
function EventsList() {
  const {
    number_all,
    Fetch_one_events,
    none,
    add_notal_card,
    update_notal_card,
    add_type_links,
    Fetch_notal_card,
    Fetch_links,
  } = useContext(ReduceContext);

  const { url, path } = useRouteMatch();
  function handleClick() {
    let numbers = url.replace(/\D+/g, "");
    number_all(numbers, url);
  }

  useEffect(() => {
    Fetch_one_events(url.replace(/\D+/g, ""));
    add_type_links(path.split("/")[1], url.replace(/\D+/g, ""));
    Fetch_notal_card(path.split("/")[1], url.replace(/\D+/g, ""));
    Fetch_links(path.split("/")[1], url.replace(/\D+/g, ""));
  }, [url]);

  const history = useHistory();

  return none.isLoading === false ? (
    <Dimmer className="invert_none" active inverted>
      <Loader size="massive">Загрузка</Loader>
    </Dimmer>
  ) : (
    none.one_event !== undefined && (
      <div className="container_list">
        <div className="button_header">
          <div onClick={() => history.goBack()}>
            <div className="purple">
              <SvgLoader path="../../img/Arrow2.svg">
                <SvgProxy selector="#cst" />
              </SvgLoader>
              Назад
            </div>
          </div>
        </div>
        {none.one_event && (
          <div>
            <div className="header_unite">
              <div className="unit_left">
                <div className="elipse_profiler">
                  <div className="text_all_image">{none.one_event.name[0]}</div>
                </div>
                <div className="text_big_all name_profile">
                  {none.one_event.name}
                </div>
                <NavLink
                  to={`/event/${none.one_event.id}/edit`}
                  onClick={handleClick}>
                  <div className="edit_profile">Изменить</div>
                </NavLink>
              </div>
              <div className="unit_button_right">
                {none.data_notal === undefined ? (
                  <Button
                    onClick={() => {
                      add_notal_card(none.one_event.type, none.one_event.id);
                    }}>
                    Расчитать натальную карту
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      update_notal_card(none.data_notal.id,false);
                    }}>
                    Перерасчитать натальную карту
                  </Button>
                )}
              </div>
            </div>
            <div className="unit_grid">
              {none.one_event.description && (
                <div className="unit_info_adress">
                  <div className="unit_info_right">Краткое описание:</div>
                  <div className="text_events">
                    {none.one_event.description}
                  </div>
                </div>
              )}

              <div className="unit_info_contact">
                <div className="d_flex_center">
                  <div className="unit_info_left">День рождения:</div>
                  <div className="unit_info_right">
                    {none.one_event.event_date}
                  </div>
                </div>
                {none.one_event.city !== null ? (
                  <div className="d_flex_center">
                    <div className="unit_info_left">Город:</div>
                    <div className="unit_info_right">{none.one_event.city}</div>
                  </div>
                ) : null}

                <div className="d_flex_center">
                  <div className="unit_info_left">Часовой пояс:</div>
                  <div className="unit_info_right">
                    GMT
                    {none.one_event.timezone > 0
                      ? "+" + none.one_event.timezone
                      : none.one_event.timezone}
                  </div>
                </div>
              </div>
            </div>
            <ResultCardAll
              Birthday={none.one_event.event_date}
              Time={none.one_event.event_time}
              NameNotal={"НАТАЛЬНАЯ КАРТА CОБЫТИЯ"}></ResultCardAll>
            <Community></Community>
            <NotalCommunity></NotalCommunity>
            <NoteState>
              <CreateNote
                ID={none.one_event.id}
                Type={
                  none.data_id !== undefined ? none.data_id.type_link : false
                }></CreateNote>
              <NoteList
                ID={none.one_event.id}
                Type={
                  none.data_id !== undefined ? none.data_id.type_link : false
                }></NoteList>
            </NoteState>
          </div>
        )}
      </div>
    )
  );
}
export default EventsList;
