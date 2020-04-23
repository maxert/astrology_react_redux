import React, { useContext, useEffect, useState } from "react";
import Search from "../addElement/search";
import { Button, Dimmer, Loader, Select } from "semantic-ui-react";
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
import { PersonsContext } from "../context/personReducer/personContext";
import SearchAll from "./SearchAll";
import { GeoState } from "../context/geolocation/GeoState";
import manifest from ".././manifest";
import NoErorrs from "./404";
//Cтраница списка персон
function PersonsHome() {
  const { hide, display, show, Order_by,setFavorite,setClickFav } = useContext(ShowContext);
  const {
    Add_favorite,
    delete_favorite,
    none,
    pagination_number,
    Fetch_data_favorite_order,
    Fetch_data_favorite,
    isLoading,
  } = useContext(ReduceContext);


  const { state_persons, Fetch_data_persons, delete_persons } = useContext(
    PersonsContext,
  );
  function pagination(Value) {
    pagination_number(Value._targetInst.pendingProps.value);
    Fetch_data_persons(Value._targetInst.pendingProps.value, display.sorted);
    isLoading(false);
  }
  function FavoriteClick() {
    display.isFavorite ? setFavorite(false) : setFavorite(true);
    Fetch_data_favorite(none.data_link_favorite.type_id);
  }

  
  useEffect(() => {
    if (none.data_number !== undefined&&display.sorted !== undefined) {
      none.pagination = 1;
      Fetch_data_persons(
        none.pagination !== 1 ? none.pagination : 1,
        display.sorted,
      );
    }
  }, [none.data_number, display.sorted]);

  let { url } = useRouteMatch();
  return (
    <div className="container_list">
      <div className="search_container">
        <Search />
      </div>

      <div className="header_name">
        <h2>Персоны</h2>
        <NavLink to={`${url}/add`}>
          <Button>Создать новую персону</Button>
        </NavLink>
      </div>

      {display.isSearch === true ? (
        <SearchAll
          NameButton={"Создать новую персону"}
          URL={url}
          NameCategory={"Имя"}
          isAll={false}></SearchAll>
      ) : (
        <div className="container_persons">
          <div className="container_persons_head">
            <div className="container_persons_head_right">
              {display.isFavorite === true ? (
                none.width_mob <= 767 ? (
                  <Select
                    className="sort_all_mob"
                    onChange={(e, data) =>
                      data.value !== 0
                        ? (Fetch_data_favorite_order(false, none.data_favorite_all),
                          setClickFav(false))
                        : (Fetch_data_favorite_order(true, none.data_favorite_all),
                          setClickFav(true))
                    }
                    defaultValue={0}
                    options={[
                      { key: 0, value: 0, text: "От А до Я" },
                      { key: 1, value: 1, text: "От Я до А" },
                    ]}
                  />
                ) : (
                  <div className="filter_abc">
                    <div
                      className={
                        "text_head_persons abs_to_A_and_Y button_select" +
                        (display.clickFavorite === true ? " active" : "")
                      }
                      onClick={() => {
                        Fetch_data_favorite_order(true, none.data_favorite_all);
                        setClickFav(true);
                      }}>
                      По алфавиту А-Я
                    </div>
                    <div
                      className={
                        "text_head_persons abs_to_A_and_Y button_select" +
                        (display.clickFavorite === false ? " active" : "")
                      }
                      onClick={() => {
                        Fetch_data_favorite_order(false, none.data_favorite_all);
                        setClickFav(false);
                      }}>
                      По алфавиту Я-А
                    </div>
                  </div>
                )
              ) : none.width_mob <= 767 ? (
                <Select
                  className="sort_all_mob"
                  onChange={(e, data) =>
                    data.value !== 0 ? Order_by("desc") : Order_by("asc")
                  }
                  defaultValue={0}
                  options={[
                    { key: 0, value: 0, text: "От А до Я" },
                    { key: 1, value: 1, text: "От Я до А" },
                  ]}
                />
              ) : (
                <div className="filter_abc">
                  <div
                    className={
                      "text_head_persons abs_to_A_and_Y button_select" +
                      (display.sorted === "asc" ? " active" : "")
                    }
                    onClick={() => Order_by("asc")}>
                    По алфавиту А-Я
                  </div>
                  <div
                    className={
                      "text_head_persons abs_to_A_and_Y button_select" +
                      (display.sorted !== "asc" ? " active" : "")
                    }
                    onClick={() => Order_by("desc")}>
                    По алфавиту Я-А
                  </div>
                </div>
              )}

              <div
                className="text_head_persons favorites"
                onClick={() => {
                  FavoriteClick();
                }}>
                {display.isFavorite === false ? (
                  <SvgLoader path="../../img/favorites.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                ) : (
                  <SvgLoader path="../../img/favorites_21.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                )}
                Избранные
              </div>

              <div className="row_and_column">
                <SvgLoader
                  path="../../img/Group3.svg"
                  className={display.visible ? " " : "active"}
                  onClick={display.visible ? show : show}>
                  <SvgProxy selector="#co" />
                </SvgLoader>

                <SvgLoader
                  path="../../img/Group4.svg"
                  className={display.visible ? "active" : " "}
                  onClick={display.visible ? hide : hide}>
                  <SvgProxy selector="#co" />
                </SvgLoader>
              </div>
            </div>
          </div>
          {display.visible === false ? (
            display.isFavorite === false ? (
              none.isLoading === false ? (
                <Dimmer className="invert_none" active inverted>
                  <Loader size="massive">Загрузка</Loader>
                </Dimmer>
              ) : (
                <div className="persons_list_grid">
                  {state_persons.data_persons.persons !== undefined &&
                    state_persons.data_persons.persons.map((person) => (
                      <div className="persons_items" key={person.id}>
                        <div className="persons_items_head d_flex_center">
                          <div className="container_info_persons d_flex_center">
                            <div
                              className={
                                person.fav > 0
                                  ? "icon_image  active"
                                  : "icon_image"
                              }>
                              <div className="hidden_all">
                                {person.image !== null ? (
                                  <img
                                    src={manifest.URL + person.image}
                                    alt="Картинка"
                                  />
                                ) : (
                                  <div className="text_persons">
                                    {person.firstname[0]}
                                  </div>
                                )}
                              </div>
                              <SvgLoader
                                className="favorite_svg"
                                path="../../img/favorites_21.svg">
                                <SvgProxy selector="#co" />
                              </SvgLoader>
                            </div>
                            <div className="container_info_persons_name">
                              {person.firstname +
                                " " +
                                (person.lastname !== null
                                  ? person.lastname
                                  : "")}
                            </div>
                          </div>
                          <div className="persons_edit">
                            <EditDrop
                              key={person.id}
                              ID={person.id}
                              Type={none.data_link_favorite.type_id}
                              Favorite={person.fav}
                              ClickDelete={(e, data) =>
                                delete_persons(
                                  person.id,
                                  none.pagination !== 1 ? none.pagination : 1,
                                  display.sorted,
                                )
                              }></EditDrop>
                            <SvgLoader path="../../img/Group5.svg">
                              <SvgProxy selector="#co" />
                            </SvgLoader>
                          </div>
                        </div>
                        <div className="d_flex_center date_persons">
                          <div className="persons_text_left">
                            День рождения:
                          </div>
                          <div className="persons_text_right">
                            {person.birth_date}
                          </div>
                        </div>

                        {person.city !== null ? (
                          <div className="d_flex_center adress_persons">
                            <div className="persons_text_left">Город:</div>
                            <div className="persons_text_right">
                              {person.city}
                            </div>
                          </div>
                        ) : (
                          <div className="d_flex_center adress_persons"></div>
                        )}

                        <div className="d_flex_center page_persons">
                          <NavLink
                            className="text_link d_flex_center"
                            to={`${url}/id/${person.id}`}>
                            Перейти{" "}
                            <SvgLoader path="../../img/Arrow_21.svg">
                              <SvgProxy selector="#co" />
                            </SvgLoader>
                          </NavLink>
                        </div>
                      </div>
                    ))}
                </div>
              )
            ) : none.isLoading === false ? (
              <Dimmer className="invert_none" active inverted>
                <Loader active size="massive">
                  Загрузка
                </Loader>
              </Dimmer>
            ) : (
              <div className="persons_list_grid">
                {none.data_favorite_all &&
                  none.data_favorite_all.map((favorite) => (
                    <div className="persons_items" key={favorite.id}>
                      <div className="persons_items_head d_flex_center">
                        <div className="container_info_persons d_flex_center">
                          <div className={"icon_image  active"}>
                            <div className="hidden_all">
                              {favorite.image !== null ? (
                                <img
                                  src={manifest.URL + favorite.image}
                                  alt="Картинка"
                                />
                              ) : (
                                <div className="text_persons">
                                  {favorite.firstname !== undefined
                                    ? favorite.firstname[0]
                                    : favorite.name[0]}
                                </div>
                              )}
                            </div>
                            <SvgLoader
                              className="favorite_svg"
                              path="../../img/favorites_21.svg">
                              <SvgProxy selector="#co" />
                            </SvgLoader>
                          </div>
                          <div className="container_info_persons_name">
                            {favorite.firstname +
                              " " +
                              (favorite.lastname !== null
                                ? favorite.lastname
                                : "")}
                          </div>
                        </div>
                        <div className="persons_edit">
                          <EditDrop
                            key={favorite.id}
                            ID={favorite.id}
                            Type={none.data_link_favorite.type_id}
                            Favorite={1}></EditDrop>
                          <SvgLoader path="../../img/Group5.svg">
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                        </div>
                      </div>
                      <div className="d_flex_center date_persons">
                        <div className="persons_text_left">День рождения:</div>
                        <div className="persons_text_right">
                          {favorite.birth_date}
                        </div>
                      </div>

                      {favorite.city !== null ? (
                        <div className="d_flex_center adress_persons">
                          <div className="persons_text_left">Город:</div>
                          <div className="persons_text_right">
                            {favorite.city}
                          </div>
                        </div>
                      ) : (
                        <div className="d_flex_center adress_persons"></div>
                      )}

                      <div className="d_flex_center page_persons">
                        <NavLink
                          className="text_link d_flex_center"
                          to={`${url}/id/${favorite.id}`}>
                          Перейти{" "}
                          <SvgLoader path="../../img/Arrow_21.svg">
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                        </NavLink>
                      </div>
                    </div>
                  ))}
              </div>
            )
          ) : (
            <div></div>
          )}
          {display.visible === true && (
            <div className="persons_list_grid persons_list_column">
              <div className="header_persons_list">
                <div className="header_persons_list_name">Имя</div>
                <div className="header_persons_list_date">Дата рождения</div>
                <div className="header_persons_list_city">Город</div>
              </div>

              {!display.isFavorite ? (
                none.isLoading === false ? (
                  <Dimmer className="invert_none" active inverted>
                    <Loader size="massive">Загрузка</Loader>
                  </Dimmer>
                ) : (
                  <div className="persons_list_column">
                    {state_persons.data_persons !== undefined &&
                      state_persons.data_persons.persons.map((person, i) =>
                        none.width_mob <= 1280 ? (
                          <div className="persons_items" key={i}>
                            <div className="persons_items_head ">
                              <div className="container_info_persons d_flex_center">
                                <div
                                  className={
                                    person.fav > 0
                                      ? "icon_image  active"
                                      : "icon_image"
                                  }>
                                  <div className="hidden_all">
                                    {person.image !== null ? (
                                      <img
                                        src={manifest.URL + person.image}
                                        alt="Картинка"
                                      />
                                    ) : (
                                      <div className="text_persons">
                                        {person.firstname[0]}
                                      </div>
                                    )}
                                  </div>
                                  <SvgLoader
                                    className="favorite_svg"
                                    path="../../img/favorites_21.svg">
                                    <SvgProxy selector="#co" />
                                  </SvgLoader>
                                </div>
                                <div className="container_info_persons_column">
                                  <div className="container_info_persons_name">
                                    {person.firstname +
                                      " " +
                                      (person.lastname !== null
                                        ? person.lastname
                                        : "")}
                                  </div>
                                  <NavLink
                                    className="text_link d_flex_center"
                                    to={`${url}/id/${person.id}`}>
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
                              {person.city !== null ? (
                                <div className="persons_text_right">
                                  {person.city}
                                </div>
                              ) : (
                                <div className="persons_text_right"></div>
                              )}
                            </div>
                            <div className="persons_edit">
                              <EditDrop
                                key={person.id}
                                ID={person.id}
                                Type={none.data_link_favorite.type_id}
                                Favorite={person.fav}
                                ClickDelete={(e, data) =>
                                  delete_persons(
                                    person.id,
                                    none.pagination !== 1 ? none.pagination : 1,
                                    display.sorted,
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
                                    person.fav > 0
                                      ? "icon_image  active"
                                      : "icon_image"
                                  }>
                                  <div className="hidden_all">
                                    {person.image !== null ? (
                                      <img
                                        src={manifest.URL + person.image}
                                        alt="Картинка"
                                      />
                                    ) : (
                                      <div className="text_persons">
                                        {person.firstname[0]}
                                      </div>
                                    )}
                                  </div>
                                  <SvgLoader
                                    className="favorite_svg"
                                    path="../../img/favorites_21.svg">
                                    <SvgProxy selector="#co" />
                                  </SvgLoader>
                                </div>
                                <div className="container_info_persons_column">
                                  <div className="container_info_persons_name">
                                    {person.firstname +
                                      " " +
                                      (person.lastname !== null
                                        ? person.lastname
                                        : "")}
                                  </div>
                                  <NavLink
                                    className="text_link d_flex_center"
                                    to={`${url}/id/${person.id}`}>
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
                              {person.city !== null ? (
                                <div className="persons_text_right">
                                  {person.city}
                                </div>
                              ) : (
                                <div className="persons_text_right"></div>
                              )}
                            </div>

                            {person.fav > 0 ? (
                              <div
                                className="d_flex_center favorite_persons"
                                onClick={() =>
                                  delete_favorite(
                                    person.id,
                                    none.data_link_favorite
                                      ? none.data_link_favorite.type_id
                                      : "person",
                                    none.pagination !== 1 ? none.pagination : 1,
                                    display.sorted,
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
                                    person.id,
                                    none.pagination !== 1 ? none.pagination : 1,
                                    display.sorted,
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
                              to={`/person/${person.id}/edit`}
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
                                  delete_persons(
                                    person.id,
                                    none.pagination !== 1 ? none.pagination : 1,
                                    display.sorted,
                                  )
                                }>
                                Удалить
                              </div>
                            </div>
                          </div>
                        ),
                      )}
                  </div>
                )
              ) : (
                <div className="persons_list_column">
                  {none.data_favorite_all !== null &&
                    none.data_favorite_all.map((favorite, i) =>
                      none.width_mob <= 1280 ? (
                        <div className="persons_items" key={i}>
                          <div className="persons_items_head ">
                            <div className="container_info_persons d_flex_center">
                              <div className={"icon_image  active"}>
                                <div className="hidden_all">
                                  {favorite.image !== null ? (
                                    <img
                                      src={manifest.URL + favorite.image}
                                      alt="Картинка"
                                    />
                                  ) : (
                                    <div className="text_persons">
                                      {favorite.firstname[0]}
                                    </div>
                                  )}
                                </div>
                                <SvgLoader
                                  className="favorite_svg"
                                  path="../../img/favorites_21.svg">
                                  <SvgProxy selector="#co" />
                                </SvgLoader>
                              </div>
                              <div className="container_info_persons_column">
                                <div className="container_info_persons_name">
                                  {favorite.firstname +
                                    " " +
                                    (favorite.lastname !== null
                                      ? favorite.lastname
                                      : "")}
                                </div>
                                <NavLink
                                  className="text_link d_flex_center"
                                  to={`${url}/id/${favorite.id}`}>
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
                              {favorite.birth_date}
                            </div>
                          </div>
                          <div className="d_flex_center adress_persons">
                            {favorite.city !== null ? (
                              <div className="persons_text_right">
                                {favorite.city}
                              </div>
                            ) : (
                              <div className="persons_text_right"></div>
                            )}
                          </div>
                          <div className="persons_edit">
                            <EditDrop
                              key={favorite.id}
                              ID={favorite.id}
                              Type={none.data_link_favorite.type_id}
                              Favorite={1}></EditDrop>
                            <SvgLoader path="../../img/Group5.svg">
                              <SvgProxy selector="#co" />
                            </SvgLoader>
                          </div>
                        </div>
                      ) : (
                        <div className="persons_items" key={i}>
                          <div className="persons_items_head ">
                            <div className="container_info_persons d_flex_center">
                              <div className={"icon_image  active"}>
                                <div className="hidden_all">
                                  {favorite.image !== null ? (
                                    <img
                                      src={manifest.URL + favorite.image}
                                      alt="Картинка"
                                    />
                                  ) : (
                                    <div className="text_persons">
                                      {favorite.firstname[0]}
                                    </div>
                                  )}
                                </div>
                                <SvgLoader
                                  className="favorite_svg"
                                  path="../../img/favorites_21.svg">
                                  <SvgProxy selector="#co" />
                                </SvgLoader>
                              </div>
                              <div className="container_info_persons_column">
                                <div className="container_info_persons_name">
                                  {favorite.firstname +
                                    " " +
                                    (favorite.lastname !== null
                                      ? favorite.lastname
                                      : "")}
                                </div>
                                <NavLink
                                  className="text_link d_flex_center"
                                  to={`${url}/id/${favorite.id}`}>
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
                              {favorite.birth_date}
                            </div>
                          </div>
                          <div className="d_flex_center adress_persons">
                            {favorite.city !== null ? (
                              <div className="persons_text_right">
                                {favorite.city}
                              </div>
                            ) : (
                              <div className="persons_text_right"></div>
                            )}
                          </div>

                          <div
                            className="d_flex_center favorite_persons"
                            onClick={() =>
                              delete_favorite(
                                favorite.id,
                                none.data_link_favorite
                                  ? none.data_link_favorite.type_id
                                  : "person",
                                none.pagination !== 1 ? none.pagination : 1,
                                display.sorted,
                              )
                            }>
                            <SvgLoader path="../../img/favorites_21.svg">
                              <SvgProxy selector="#co" />
                            </SvgLoader>
                            <div className="persons_text_right">
                              Удалить из избранных
                            </div>
                          </div>

                          <NavLink
                            to={`/person/${favorite.id}/edit`}
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
                                delete_persons(
                                  favorite.id,
                                  none.pagination !== 1 ? none.pagination : 1,
                                  display.sorted,
                                )
                              }>
                              Удалить
                            </div>
                          </div>
                        </div>
                      ),
                    )}
                </div>
              )}
            </div>
          )}
          {display.isFavorite === false && state_persons.data_persons.count !== 0 ? (
            <div className="d_flex_center pagination">
              <PaginationExamplePagination
                listPageAll={
                  state_persons.data_persons
                    ? state_persons.data_persons.pages
                    : 1
                }
                listpagedefault={
                  none.pagination !== undefined ? none.pagination : 1
                }
                SelectPagination={(SelectPagination) =>
                  pagination(SelectPagination)
                }
              />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
}
function Persons() {
  let { path } = useRouteMatch();
  return (
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
      <Route path={`${path}/add`}>
        <GeoState>
          <PersonsAdd></PersonsAdd>
        </GeoState>
      </Route>
      <Route path={`${path}/:id/edit`}>
        <ShowState>
          <GeoState>
            <PersonsEdit></PersonsEdit>
          </GeoState>
        </ShowState>
      </Route>
      <Route path="*">
        <NoErorrs />
      </Route>
    </Switch>
  );
}
export default Persons;
