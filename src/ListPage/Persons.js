import React, { useContext, useEffect, useState } from "react";
import Search from "../addElement/search";
import { Button } from "semantic-ui-react";
import { NavLink, useRouteMatch, Switch, Route } from "react-router-dom";
import { SvgLoader, SvgProxy } from "react-svgmt";
import EditDrop from "../addElement/editDropDown";
import PersonsUnit from "../ListPage/PersonsUnit";
import PersonsAdd from "../ListPage/PersonsAdd";
import { ReduceContext } from "../context/reducerContext";
import PersonsEdit from "./PersonsEdit";
import PaginationExamplePagination from "../addElement/pagination";
import { ShowState } from "../context/show/showState";
import { ShowContext } from "../context/show/showContext";
import { PersonState } from "../context/personReducer/personState";
import { PersonsContext } from "../context/personReducer/personContext";
//Cтраница списка персон
function PersonsHome() {
  const { hide, display, show } = useContext(ShowContext);
  const { Add_favorite, number_all, none } = useContext(ReduceContext);
  const { state_persons, Fetch_data_persons, delete_persons } = useContext(
    PersonsContext
  );
  function newSubmite(events, id, value) {
    if (events.target.dataset.index === "2") {
      delete_persons(id);
    } else if (events.target.dataset.index === "0") {
      debugger;
      Add_favorite("person", id);
    }
  }
  function pagination(Value) {
    Fetch_data_persons(Value._targetInst.pendingProps.value);
  }
 
  useEffect(() => {
    Fetch_data_persons(1,true);
  }, []);

  let { url } = useRouteMatch();
  return (
    <div className="container_list">
      <div className="search_container">
        <Search />
      </div>
      <h2>Персоны</h2>
      <div className="container_persons">
        <div className="container_persons_head">
          <NavLink to={`${url}/add`}>
            <Button>Создать новую персону</Button>
          </NavLink>
          <div className="container_persons_head_right">
            <div className="filter_abc">
              <button className="text_head_persons abs_to_A_and_Y button_select active"  >
                По алфавиту А-Я
              </button>
              <button
                className="text_head_persons abs_to_Y_and_A button_select"
              
              >
                По алфавиту Я-А
              </button>
            </div>

            <NavLink
              className="text_head_persons favorites"
              to={`${url}/favorite`}
            >
              <SvgLoader path="../../img/favorites.svg">
                <SvgProxy selector="#co" />
              </SvgLoader>
              Избранные
            </NavLink>
            <div className="row_and_column">
              <SvgLoader
                path="../../img/Group3.svg"
                className={display.visible ? " " : "active"}
                onClick={display.visible ? show : show}
              >
                <SvgProxy selector="#co" />
              </SvgLoader>

              <SvgLoader
                path="../../img/Group4.svg"
                className={display.visible ? "active" : " "}
                onClick={display.visible ? hide : hide}
              >
                <SvgProxy selector="#co" />
              </SvgLoader>
            </div>
          </div>
        </div>

        {display.visible === false && (
          <div className="persons_list_grid">
            {state_persons.data_persons !== null &&
            none.data_value.isSearch === false
              ? state_persons.data_persons.persons.map(person => (
                  <div className="persons_items" key={person.id}>
                    <div className="persons_items_head d_flex_center">
                      <div className="container_info_persons d_flex_center">
                        <div className="icon_image">{person.firstname[0]}</div>
                        <div className="container_info_persons_name">
                          {person.firstname + " " + person.lastname}
                        </div>
                      </div>
                      <div className="persons_edit">
                        <EditDrop
                          key={person.id}
                          onClickDataNew={(events, data) =>
                            newSubmite(events, person.id, data)
                          }
                          onClickData={() => number_all(person.id)}
                        ></EditDrop>
                        <SvgLoader path="../../img/Group5.svg">
                          <SvgProxy selector="#co" />
                        </SvgLoader>
                      </div>
                    </div>
                    <div className="d_flex_center date_persons">
                      <div className="persons_text_left">День рождения:</div>
                      <div className="persons_text_right">
                        {person.birth_date}
                      </div>
                    </div>
                    <div className="d_flex_center adress_persons">
                      <div className="persons_text_left">Город:</div>
                      <div className="persons_text_right">{person.city}</div>
                    </div>
                    <div className="d_flex_center page_persons">
                      <NavLink
                        className="text_link d_flex_center"
                        to={`${url}/id/${person.id}`}
                      >
                        Перейти{" "}
                        <SvgLoader path="../../img/Arrow_21.svg">
                          <SvgProxy selector="#co" />
                        </SvgLoader>
                      </NavLink>
                    </div>
                  </div>
                ))
              : none.data_value.value.map(person => (
                  <div className="persons_items" key={person.id}>
                    <div className="persons_items_head d_flex_center">
                      <div className="container_info_persons d_flex_center">
                        <div className="icon_image">{person.firstname[0]}</div>
                        <div className="container_info_persons_name">
                          {person.firstname + " " + person.lastname}
                        </div>
                      </div>
                      <div className="persons_edit">
                        <EditDrop
                          key={person.id}
                          onClickDataNew={(events, data) =>
                            newSubmite(events, person.id, data)
                          }
                          onClickData={() => number_all(person.id)}
                        ></EditDrop>
                        <SvgLoader path="../../img/Group5.svg">
                          <SvgProxy selector="#co" />
                        </SvgLoader>
                      </div>
                    </div>
                    <div className="d_flex_center date_persons">
                      <div className="persons_text_left">День рождения:</div>
                      <div className="persons_text_right">
                        {person.birth_date}
                      </div>
                    </div>
                    <div className="d_flex_center adress_persons">
                      <div className="persons_text_left">Город:</div>
                      <div className="persons_text_right">{person.city}</div>
                    </div>
                    <div className="d_flex_center page_persons">
                      <NavLink
                        className="text_link d_flex_center"
                        to={`${url}/id/${person.id}`}
                      >
                        Перейти{" "}
                        <SvgLoader path="../../img/Arrow_21.svg">
                          <SvgProxy selector="#co" />
                        </SvgLoader>
                      </NavLink>
                    </div>
                  </div>
                ))}
            {none.data_value.isSearch === true &&
            none.data_value.value.length === 0 ? (
              <div className="center_none_grid">Результатов не найденно</div>
            ) : (
              <div></div>
            )}
          </div>
        )}
        {display.visible === true && (
          <div className="persons_list_grid persons_list_column">
            <div className="header_persons_list">
              <div className="header_persons_list_name">Имя</div>
              <div className="header_persons_list_date">Дата рождения</div>
              <div className="header_persons_list_city">Город</div>
            </div>
            <div className="persons_list_column">
              {state_persons.data_persons !== undefined &&
                state_persons.data_persons.persons.map((person, i) => (
                  <div className="persons_items" key={i}>
                    <div className="persons_items_head ">
                      <div className="container_info_persons d_flex_center">
                        <div className="icon_image active">
                          {person.firstname[0]}
                        </div>
                        <div className="container_info_persons_column">
                          <div className="container_info_persons_name">
                            {person.firstname + " " + person.lastname}
                          </div>
                          <NavLink
                            className="text_link d_flex_center"
                            to={`${url}/id/${person.id}`}
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
                        {person.birth_date}
                      </div>
                    </div>
                    <div className="d_flex_center adress_persons">
                      <div className="persons_text_right">{person.city}</div>
                    </div>
                    <div className="d_flex_center favorite_persons">
                      <SvgLoader path="../../img/favorites.svg">
                        <SvgProxy selector="#co" />
                      </SvgLoader>
                      <div className="persons_text_right">В избранные</div>
                    </div>
                    <NavLink
                      to={`/person/${person.id}/edit`}
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
                          delete_persons(person.id);
                        }}
                      >
                        Удалить
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      {none.data_value.isSearch === false ? (
        <div className="d_flex_center pagination">
          <PaginationExamplePagination
            listPageAll={
              state_persons.data_persons ? state_persons.data_persons.pages : 1
            }
            listpagedefault={1}
            SelectPagination={SelectPagination => pagination(SelectPagination)}
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
function Persons() {
  let { path } = useRouteMatch();
  return (
    <PersonState>
      <Switch>
        <Route exact path={path}>
          <ShowState>
            <PersonsHome />
          </ShowState>
        </Route>
        <Route path={`${path}/id/:id`}>
          <ShowState>
            <PersonsUnit />
          </ShowState>
        </Route>
        <Route path={`${path}/add`} component={PersonsAdd} />
        <Route path={`${path}/:id/edit`} component={PersonsEdit} />
      </Switch>
    </PersonState>
  );
}
export default Persons;
