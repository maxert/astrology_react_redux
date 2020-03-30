import React, { useContext, useEffect, useRef, useState } from "react";
import Search from "../addElement/search";
import { Button, Loader, Dimmer } from "semantic-ui-react";
import { NavLink, useRouteMatch, Switch, Route } from "react-router-dom";
import { SvgLoader, SvgProxy } from "react-svgmt";
import EditDrop from "../addElement/editDropDown";
import CompanyList from "../ListPage/CompanyList";
import CompanyAdd from "../ListPage/CompanyAdd";
import { ReduceContext } from "../context/reducerContext";
import CompanyEdit from "./CompanyEdit";
import PaginationExamplePagination from "../addElement/pagination";
import { ShowState } from "../context/show/showState";
import { ShowContext } from "../context/show/showContext";
import { CompanyContext } from "../context/companyReducer/companyContext";
import SearchAll from "./SearchAll";
import { GeoState } from "../context/geolocation/GeoState";

//Страница списка компаний
function CompanyHome() {
  const { hide, display, show } = useContext(ShowContext);
  const {
    Add_favorite,
    delete_favorite,
    none,
    pagination_number,
    Order_by,
    delete_all,
    Fetch_data_favorite,
    Fetch_data_favorite_order,
    isLoading
  } = useContext(ReduceContext);
  const [isFavorite, setFavorite] = useState(false);
  const [clickFavorite, setClickFav] = useState(true);
  const { state_company, Fetch_data_сompany, delete_company } = useContext(
    CompanyContext
  );
  function pagination(Value) {
    pagination_number(Value._targetInst.pendingProps.value);
    Fetch_data_сompany(Value._targetInst.pendingProps.value, none.sorted);
    isLoading(false);
  }
  function FavoriteClick() {
    isFavorite ? setFavorite(false) : setFavorite(true);
    Fetch_data_favorite(none.data_link_favorite.type_id);
  }

  useEffect(() => {
    Fetch_data_сompany(
      none.pagination !== 1 ? none.pagination : 1,
      none.sorted
    );
    isLoading(false);
  }, [none.sorted]);

  useEffect(() => {
    Fetch_data_сompany(
      none.pagination !== 1 ? none.pagination : 1,
      none.sorted
    );
  }, [none.data_number]);

  let { url } = useRouteMatch();
  return (
    <div className="container_list">
      <div className="search_container">
        <Search />
      </div>
      <h2>Копании</h2>
      {display.isSearch === true ? (
        <SearchAll
          NameButton={"Создать новую компанию"}
          URL={url}
          NameCategory={"Название"}
        ></SearchAll>
      ) : (
        <div className="container_persons">
          <div className="container_persons_head">
            <NavLink to={`${url}/add`}>
              <Button>Создать новую компанию</Button>
            </NavLink>
            <div className="container_persons_head_right">
              {isFavorite === true ? (
                <div className="filter_abc">
                  <div
                    className={
                      "text_head_persons abs_to_A_and_Y button_select" +
                      (clickFavorite === true ? " active" : "")
                    }
                    onClick={() => {
                      Fetch_data_favorite_order(true, none.data_favorite);
                      setClickFav(true);
                    }}
                  >
                    По алфавиту А-Я
                  </div>
                  <div
                    className={
                      "text_head_persons abs_to_A_and_Y button_select" +
                      (clickFavorite === false ? " active" : "")
                    }
                    onClick={() => {
                      Fetch_data_favorite_order(false, none.data_favorite);
                      setClickFav(false);
                    }}
                  >
                    По алфавиту Я-А
                  </div>
                </div>
              ) : (
                <div className="filter_abc">
                  <div
                    className={
                      "text_head_persons abs_to_A_and_Y button_select" +
                      (none.sorted === "asc" ? " active" : "")
                    }
                    onClick={() => Order_by("asc")}
                  >
                    По алфавиту А-Я
                  </div>
                  <div
                    className={
                      "text_head_persons abs_to_A_and_Y button_select" +
                      (none.sorted !== "asc" ? " active" : "")
                    }
                    onClick={() => Order_by("desc")}
                  >
                    По алфавиту Я-А
                  </div>
                </div>
              )}

              <div
                className="text_head_persons favorites"
                onClick={() => {
                  FavoriteClick();
                }}
              >
                {isFavorite === false ? (
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
          {display.visible === false ? (
            isFavorite === false ? (
              none.isLoading === false ? (
                <Dimmer className="invert_none" active inverted>
                  <Loader size="massive">Загрузка</Loader>
                </Dimmer>
              ) : (
                <div className="persons_list_grid">
                  {state_company.data_company.companies !== undefined &&
                    state_company.data_company.companies.map(company => (
                      <div className="persons_items" key={company.id}>
                        <div className="persons_items_head d_flex_center">
                          <div className="container_info_persons d_flex_center">
                            <div
                              className={
                                company.fav > 0
                                  ? "icon_image  active"
                                  : "icon_image"
                              }
                            >
                              <div className="hidden_all">
                                {company.image !== null ? (
                                  <img
                                    src={
                                      "http://1690550.masgroup.web.hosting-test.net" +
                                      company.image
                                    }
                                    alt="Картинка"
                                  />
                                ) : (
                                  <div className="text_persons">
                                    {company.name[0]}
                                  </div>
                                )}
                              </div>
                              <SvgLoader
                                className="favorite_svg"
                                path="../../img/favorites_21.svg"
                              >
                                <SvgProxy selector="#co" />
                              </SvgLoader>
                            </div>
                            <div className="container_info_persons_name">
                              {company.name}
                            </div>
                          </div>
                          <div className="persons_edit">
                            <EditDrop
                              key={company.id}
                              ID={company.id}
                              Type={company.obj_type}
                              Favorite={company.fav}
                              ClickDelete={(e, data) =>
                                delete_company(
                                  company.id,
                                  none.pagination !== 1 ? none.pagination : 1,
                                  none.sorted
                                )
                              }
                            ></EditDrop>
                            <SvgLoader path="../../img/Group5.svg">
                              <SvgProxy selector="#co" />
                            </SvgLoader>
                          </div>
                        </div>
                        <div className="d_flex_center date_persons">
                          <div className="persons_text_left">
                            День основания:
                          </div>
                          <div className="persons_text_right">
                            {company.birth_date}
                          </div>
                        </div>

                        {company.city !== null ? (
                          <div className="d_flex_center adress_persons">
                            <div className="persons_text_left">Город:</div>
                            <div className="persons_text_right">
                              {company.city}
                            </div>
                          </div>
                        ) : (
                          <div className="d_flex_center adress_persons"></div>
                        )}

                        <div className="d_flex_center page_persons">
                          <NavLink
                            className="text_link d_flex_center"
                            to={`${url}/id/${company.id}`}
                          >
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
                {none.data_favorite &&
                  none.data_favorite.map(favorite => (
                    <div className="persons_items" key={favorite.id}>
                      <div className="persons_items_head d_flex_center">
                        <div className="container_info_persons d_flex_center">
                          <div className={"icon_image  active"}>
                            <div className="hidden_all">
                              {favorite.image !== null ? (
                                <img
                                  src={
                                    "http://1690550.masgroup.web.hosting-test.net" +
                                    favorite.image
                                  }
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
                              path="../../img/favorites_21.svg"
                            >
                              <SvgProxy selector="#co" />
                            </SvgLoader>
                          </div>
                          <div className="container_info_persons_name">
                            {favorite.firstname !== undefined
                              ? favorite.firstname +
                                " " +
                                (favorite.lastname !== null
                                  ? favorite.lastname
                                  : "")
                              : favorite.name}
                          </div>
                        </div>
                        <div className="persons_edit">
                          <EditDrop
                            key={favorite.id}
                            ID={favorite.id}
                            Type={favorite.obj_type}
                            Favorite={1}
                            ClickDelete={(e, data) =>
                              delete_company(
                                favorite.id,
                                none.pagination !== 1 ? none.pagination : 1,
                                none.sorted
                              )
                            }
                          ></EditDrop>
                          <SvgLoader path="../../img/Group5.svg">
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                        </div>
                      </div>
                      <div className="d_flex_center date_persons">
                        <div className="persons_text_left">Дата основания:</div>
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
                          to={`${url}/id/${favorite.id}`}
                        >
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
                <div className="header_persons_list_name">Название</div>
                <div className="header_persons_list_date">Дата основания</div>
                <div className="header_persons_list_city">Город</div>
              </div>

              {!isFavorite ? (
                none.isLoading === false ? (
                  <Dimmer className="invert_none" active inverted>
                    <Loader size="massive">Загрузка</Loader>
                  </Dimmer>
                ) : (
                  <div className="persons_list_column">
                    {state_company.data_company &&
                      state_company.data_company.companies.map((company, i) => (
                        <div className="persons_items" key={i}>
                          <div className="persons_items_head ">
                            <div className="container_info_persons d_flex_center">
                              <div
                                className={
                                  company.fav > 0
                                    ? "icon_image  active"
                                    : "icon_image"
                                }
                              >
                                <div className="hidden_all">
                                  {company.image !== null ? (
                                    <img
                                      src={
                                        "http://1690550.masgroup.web.hosting-test.net" +
                                        company.image
                                      }
                                      alt="Картинка"
                                    />
                                  ) : (
                                    <div className="text_persons">
                                      {company.name[0]}
                                    </div>
                                  )}
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
                                  {company.name}
                                </div>
                                <NavLink
                                  className="text_link d_flex_center"
                                  to={`${url}/id/${company.id}`}
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
                              {company.birth_date}
                            </div>
                          </div>
                          <div className="d_flex_center adress_persons">
                            {company.city !== null ? (
                              <div className="persons_text_right">
                                {company.city}
                              </div>
                            ) : (
                              <div className="persons_text_right"></div>
                            )}
                          </div>

                          {company.fav > 0 ? (
                            <div
                              className="d_flex_center favorite_persons"
                              onClick={() =>
                                delete_favorite(
                                  company.id,
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
                                  company.id,
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
                            to={`/company/${company.id}/edit`}
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
                                delete_company(
                                  company.id,
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
                )
              ) : (
                <div className="persons_list_column">
                  {none.data_favorite !== null &&
                    none.data_favorite.map((favorite, i) => (
                      <div className="persons_items" key={i}>
                        <div className="persons_items_head ">
                          <div className="container_info_persons d_flex_center">
                            <div className={"icon_image  active"}>
                              <div className="hidden_all">
                                {favorite.image !== null ? (
                                  <img
                                    src={
                                      "http://1690550.masgroup.web.hosting-test.net" +
                                      favorite.image
                                    }
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
                                path="../../img/favorites_21.svg"
                              >
                                <SvgProxy selector="#co" />
                              </SvgLoader>
                            </div>
                            <div className="container_info_persons_column">
                              <div className="container_info_persons_name">
                                {favorite.firstname !== undefined
                                  ? favorite.firstname +
                                    " " +
                                    (favorite.lastname !== null
                                      ? favorite.lastname
                                      : "")
                                  : favorite.name}
                              </div>
                              <NavLink
                                className="text_link d_flex_center"
                                to={`${url}/id/${favorite.id}`}
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
                              none.sorted
                            )
                          }
                        >
                          <SvgLoader path="../../img/favorites_21.svg">
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                          <div className="persons_text_right">В избранных</div>
                        </div>

                        <NavLink
                          to={`/company/${favorite.id}/edit`}
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
                              delete_all(
                                none.data_link_favorite.type_link,
                                favorite.id
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
          )}
          {isFavorite === false && state_company.data_company.count !== 0 ? (
            <div className="d_flex_center pagination">
              <PaginationExamplePagination
                listPageAll={
                  state_company.data_company
                    ? state_company.data_company.pages
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
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
}
function Company() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <ShowState>
          <CompanyHome></CompanyHome>
        </ShowState>
      </Route>
      <Route exact path={`${path}/id/:id?`}>
        <ShowState>
          <CompanyList></CompanyList>
        </ShowState>
      </Route>
      <Route path={`${path}/add`}>
        <GeoState>
          <CompanyAdd></CompanyAdd>
        </GeoState>
      </Route>
      <Route path={`${path}/:id/edit`}>
        <ShowState>
          <GeoState>
            <CompanyEdit></CompanyEdit>
          </GeoState>
        </ShowState>
      </Route>
    </Switch>
  );
}
export default Company;
