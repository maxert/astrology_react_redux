import React, { useContext, useEffect } from "react";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { NavLink, useRouteMatch, useHistory } from "react-router-dom";
import { Button } from "semantic-ui-react";
import Community from "../addElement/community";
import NotalCommunity from "../addElement/notal_community";
import ResultCardAll from "../addElement/resultcardall";
import { ReduceContext } from "../context/reducerContext";
import CreateNote from "../addElement/createNote";
import NoteList from "../addElement/NoteList";
import { NoteState } from "../context/noteReducer/noteState";
import { ShowContext } from "../context/show/showContext";
//Страница Персоны
function PersonsUnit() {

 

  const { url } = useRouteMatch();
  const {
    number_all,
    Fetch_one_persons,
    none,
    add_notal_card,
    update_notal_card
  } = useContext(ReduceContext);
  const history = useHistory();
  useEffect(() => {
    Fetch_one_persons(url.replace(/\D+/g, ""));
  }, [url]);

  function handleClick() {
    let numbers = url.replace(/\D+/g, "");
    number_all(numbers, url);
  }

  return (
    <div className="container_list">
      <div className="button_header">
        <div className="purple" onClick={() => history.goBack()}>
          <SvgLoader path="../../img/Arrow2.svg">
            <SvgProxy selector="#cst" />
          </SvgLoader>
          Назад
        </div>
      </div>

      {none.one_persons && (
        <div>
          <div className="header_unite">
            <div className="unit_left">
              <div className="elipse_profiler">
                {none.one_persons.image!==null? <img src={"http://1690550.masgroup.web.hosting-test.net"+none.one_persons.image} alt="Картинка"/>:<div className="text_all_image">{none.one_persons.firstname[0]}</div>}
              </div>
              <div className="text_big_all name_profile">
                {none.one_persons.firstname +
                  " " +
                  (none.one_persons.lastname !== null
                    ? none.one_persons.lastname
                    : "")}
              </div>
              <NavLink
                to={`/person/${none.one_persons.id}/edit`}
                onClick={handleClick}
              >
                <div className="edit_profile">Изменить</div>
              </NavLink>
            </div>
            <div className="unit_button_right">
              {none.data_notal === undefined ? (
                <Button
                  onClick={() => {
                    add_notal_card(none.one_persons.type, none.one_persons.id);
                  }}
                >
                  Расчитать натальную карту
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    update_notal_card(none.data_notal.id);
                  }}
                >
                  Перерасчитать натальную карту
                </Button>
              )}
            </div>
          </div>
          <div className="unit_grid">
            {none.one_persons.email !== null &&
            none.one_persons.telephone !== null ? (
              <div className="unit_info_contact">
                {none.one_persons.telephone !== null ? (
                  <div className="d_flex_center">
                    <div className="unit_info_left">Телефон:</div>
                    <div className="unit_info_right">
                      {none.one_persons.telephone}
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}

                {none.one_persons.email !== null ? (
                  <div className="d_flex_center">
                    <div className="unit_info_left">Email:</div>
                    <div className="unit_info_right">
                      {none.one_persons.email}
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            ) : null}

            <div className="unit_info_adress">
              <div className="d_flex_center">
                <div className="unit_info_left">День рождения:</div>
                <div className="unit_info_right">
                  {none.one_persons.birth_date}
                </div>
              </div>
              {none.one_persons.city !== null ? (
                <div className="d_flex_center">
                  <div className="unit_info_left">Город:</div>
                  <div className="unit_info_right">{none.one_persons.city}</div>
                </div>
              ) : null}

              <div className="d_flex_center">
                <div className="unit_info_left">Часовой пояс:</div>
                <div className="unit_info_right">
                  GMT{none.one_persons.timezone>0?"+"+none.one_persons.timezone:none.one_persons.timezone}
                </div>
              </div>
            </div>
          </div>
    
          <ResultCardAll
            Birthday={none.one_persons.birth_date}
            Time={none.one_persons.birth_time}
            NameNotal={"НАТАЛЬНАЯ КАРТА ПЕРСОНЫ"}
          ></ResultCardAll>
          <Community></Community>
          <NotalCommunity></NotalCommunity>
          <NoteState>
            <CreateNote
              ID={none.one_persons.id}
              Type={none.data_id !== undefined ? none.data_id.type_link : false}
            ></CreateNote>
            <NoteList
              ID={none.one_persons.id}
              Type={none.data_id !== undefined ? none.data_id.type_link : false}
            ></NoteList>
          </NoteState>
        </div>
      )}
    </div>
  );
}
export default PersonsUnit;
