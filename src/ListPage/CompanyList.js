import React, { useContext, useEffect } from "react";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { NavLink, useRouteMatch, useHistory } from "react-router-dom";
import { Button, Dimmer, Loader } from "semantic-ui-react";
import Community from "../addElement/community";
import NotalCommunity from "../addElement/notal_community";
import ResultCardAll from "../addElement/resultcardall";
import NoteList from "../addElement/NoteList";
import { NoteState } from "../context/noteReducer/noteState";
import { ReduceContext } from "../context/reducerContext";
import CreateNote from "../addElement/createNote";
import manifest from ".././manifest";
//Страница компании
function CompanyList() {
  const { url, path } = useRouteMatch();

  const {
    number_all,
    Fetch_one_company,
    none,
    add_type_links,
    add_notal_card,
    Fetch_notal_card,
    update_notal_card,
    Fetch_links,
  } = useContext(ReduceContext);
  const history = useHistory();

  useEffect(() => {
    Fetch_one_company(url.replace(/\D+/g, ""));
    add_type_links(path.split("/")[1], url.replace(/\D+/g, ""));
    Fetch_notal_card(path.split("/")[1], url.replace(/\D+/g, ""));
    Fetch_links(path.split("/")[1], url.replace(/\D+/g, ""));
  }, [url]);

  return none.isLoading === false ? (
    <Dimmer className="invert_none" active inverted>
      <Loader size="massive">Загрузка</Loader>
    </Dimmer>
  ) : (
    none.one_company !== undefined && (
      <div className="container_list">
        <div className="button_header">
          <div className="purple" onClick={() => history.goBack()}>
            <SvgLoader path="../../img/Arrow2.svg">
              <SvgProxy selector="#cst" />
            </SvgLoader>
            Назад
          </div>
        </div>

        <div>
          <div className="header_unite">
            <div className="unit_left">
              <div className="elipse_profiler">
                {none.one_company.image !== null ? (
                  <img
                    src={manifest.URL + none.one_company.image}
                    alt="Картинка"
                  />
                ) : (
                  <div className="text_all_image">
                    {none.one_company.name[0]}
                  </div>
                )}
              </div>
              <div className="text_big_all name_profile">
                {none.one_company.name}
              </div>
              <NavLink to={`/company/${none.one_company.id}/edit`}>
                <div className="edit_profile">Изменить</div>
              </NavLink>
            </div>
            <div className="unit_button_right">
              {none.data_notal === undefined ? (
                <Button
                  onClick={() => {
                    add_notal_card(none.one_company.type, none.one_company.id);
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
            {none.one_company.email !== null &&
            none.one_company.telephone !== null ? (
              <div className="unit_info_contact">
                {none.one_company.telephone !== null ? (
                  <div className="d_flex_center">
                    <div className="unit_info_left">Телефон:</div>
                    <div className="unit_info_right">
                      {none.one_company.telephone}
                    </div>
                  </div>
                ) : null}

                {none.one_company.email !== null ? (
                  <div className="d_flex_center">
                    <div className="unit_info_left">Email:</div>
                    <div className="unit_info_right">
                      {none.one_company.email}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="unit_info_adress">
              <div className="d_flex_center">
                <div className="unit_info_left">Дата основания:</div>
                <div className="unit_info_right">
                  {none.one_company.birth_date}
                </div>
              </div>
              {none.one_company.city && (
                <div className="d_flex_center">
                  <div className="unit_info_left">Город:</div>
                  <div className="unit_info_right">{none.one_company.city}</div>
                </div>
              )}
            </div>
            {none.one_company.osnovatel !== null &&
            none.one_company.cnt_workers !== null ? (
              <div className="unit_info_company">
                {none.one_company.osnovatel && (
                  <div className="d_flex_center">
                    <div className="unit_info_left">Основатель:</div>
                    <div className="unit_info_right">
                      {none.one_company.osnovatel}
                    </div>
                  </div>
                )}

                {none.one_company.cnt_workers && (
                  <div className="d_flex_center">
                    <div className="unit_info_left">
                      Количестов сотрудников:
                    </div>
                    <div className="unit_info_right">
                      {none.one_company.cnt_workers} чел.
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>

          <ResultCardAll
            Birthday={none.one_company.birth_date}
            Time={none.one_company.birth_time}
            NameNotal={"НАТАЛЬНАЯ КАРТА КОМПАНИИ"}></ResultCardAll>
          <Community></Community>
          <NotalCommunity></NotalCommunity>
          <NoteState>
            <CreateNote
              ID={none.one_company.id}
              Type={
                none.data_id !== undefined ? none.data_id.type_link : false
              }></CreateNote>
            <NoteList
              ID={none.one_company.id}
              Type={
                none.data_id !== undefined ? none.data_id.type_link : false
              }></NoteList>
          </NoteState>
        </div>
      </div>
    )
  );
}
export default CompanyList;
