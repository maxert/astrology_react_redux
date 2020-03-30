import React, { useContext, useEffect } from "react";
import { useRouteMatch } from "react-router";
import { NavLink } from "react-router-dom";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { ShowContext } from "../context/show/showContext";
import { useState } from "react";
import { ReduceContext } from "../context/reducerContext";
import EditDrop from "../addElement/editDropSearch";
import { Button } from "semantic-ui-react";
function SearchAll({ NameButton, URL, NameCategory }) {
  const { Add_favorite, delete_favorite, none, delete_all } = useContext(
    ReduceContext
  );
  const [isFavorite, setFavorite] = useState(true);

  function FavoriteClick() {
    isFavorite ? setFavorite(false) : setFavorite(true);
    search_sort_favorite(isFavorite, display.data_value);
  }

  const [displaySet, setDisplay] = useState(false);

  const [isSort, setSort] = useState(true);
  const {
    display,
    search_sort,
    search_sort_favorite,
    search_sort_fav_data
  } = useContext(ShowContext);
  useEffect(() => {
    search_sort_favorite(true, display.data_value);
  }, [display.data_value]);
  return (
    <div className="container_persons">
      <div className="container_persons_head">
        <NavLink to={`${URL}/add`}>
          <Button>{NameButton}</Button>
        </NavLink>
        <div className="container_persons_head_right">
          {isFavorite === false ? (
            <div className="filter_abc">
              <div
                className={
                  "text_head_persons abs_to_A_and_Y button_select" +
                  (isSort === true ? " active" : "")
                }
                onClick={() => {
                  search_sort(true, display.data_value);
                  setSort(true);
                }}
              >
                По алфавиту А-Я
              </div>
              <div
                className={
                  "text_head_persons abs_to_A_and_Y button_select" +
                  (isSort !== true ? " active" : "")
                }
                onClick={() => {
                  search_sort(false, display.data_value);
                  setSort(false);
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
                  (isSort === true ? " active" : "")
                }
                onClick={() => {
                  search_sort_fav_data(true, display.data_value);
                  setSort(true);
                }}
              >
                По алфавиту А-Я
              </div>
              <div
                className={
                  "text_head_persons abs_to_A_and_Y button_select" +
                  (isSort !== true ? " active" : "")
                }
                onClick={() => {
                  search_sort_fav_data(false, display.data_value);
                  setSort(false);
                }}
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
            {isFavorite === true ? (
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
              className={displaySet ? " " : "active"}
              onClick={() =>
                displaySet ? setDisplay(false) : setDisplay(false)
              }
            >
              <SvgProxy selector="#co" />
            </SvgLoader>

            <SvgLoader
              path="../../img/Group4.svg"
              className={displaySet ? "active" : " "}
              onClick={() => (displaySet ? setDisplay(true) : setDisplay(true))}
            >
              <SvgProxy selector="#co" />
            </SvgLoader>
          </div>
        </div>
      </div>
      {displaySet === false &&
        (isFavorite === true ? (
          <div className="persons_list_grid">
            {display.data_value !== undefined &&
              display.data_value.map(person => (
                <div className="persons_items" key={person.id}>
                  <div className="persons_items_head d_flex_center">
                    <div className="container_info_persons d_flex_center">
                      <div
                        className={
                          person.isfav === true
                            ? "icon_image  active"
                            : "icon_image"
                        }
                      >
                        <div className="hidden_all">
                          {person.image !== null ? (
                            person.image === undefined ? (
                              <div className="text_persons">
                                {person.firstname !== undefined
                                  ? person.firstname[0]
                                  : person.name[0]}
                              </div>
                            ) : (
                              <img
                                src={
                                  "http://1690550.masgroup.web.hosting-test.net" +
                                  person.image
                                }
                                alt="Картинка"
                              />
                            )
                          ) : (
                            <div className="text_persons">
                              {person.firstname !== undefined
                                ? person.firstname[0]
                                : person.name[0]}
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
                        {person.firstname !== undefined
                          ? person.firstname +
                            " " +
                            (person.lastname !== null ? person.lastname : "")
                          : person.name}
                      </div>
                    </div>
                    <div className="persons_edit">
                      <EditDrop
                        key={person.id}
                        ID={person.id}
                        Type={
                          none.data_link_favorite
                            ? none.data_link_favorite.type_id
                            : "person"
                        }
                        Favorite={person.fav}
                        isFavortie={person.isfav}
                      ></EditDrop>
                      <SvgLoader path="../../img/Group5.svg">
                        <SvgProxy selector="#co" />
                      </SvgLoader>
                    </div>
                  </div>
                  <div className="d_flex_center date_persons">
                    <div className="persons_text_left">
                      {none.data_link_favorite.type_id === "company"
                        ? `Дата основания:`
                        : none.data_link_favorite.type_id === "event"
                        ? `Дата:`
                        : `День рождения:`}
                    </div>
                    <div className="persons_text_right">
                      {person.birth_date !== undefined
                        ? person.birth_date
                        : person.event_date}
                    </div>
                  </div>

                  {person.city !== null ? (
                    <div className="d_flex_center adress_persons">
                      <div className="persons_text_left">Город:</div>
                      <div className="persons_text_right">{person.city}</div>
                    </div>
                  ) : (
                    <div className="d_flex_center adress_persons"></div>
                  )}

                  <div className="d_flex_center page_persons">
                    <NavLink
                      className="text_link d_flex_center"
                      to={`${URL}/id/${person.id}`}
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
        ) : (
          <div className="persons_list_grid">
            {display.data_value_favorite !== null &&
              display.data_value_favorite.map(favorite => (
                <div className="persons_items" key={favorite.id}>
                  <div className="persons_items_head d_flex_center">
                    <div className="container_info_persons d_flex_center">
                      <div className={"icon_image  active"}>
                        <div className="hidden_all">
                          {favorite.image !== null ? (
                            favorite.image === undefined ? (
                              <div className="text_persons">
                                {favorite.firstname !== undefined
                                  ? favorite.firstname[0]
                                  : favorite.name[0]}
                              </div>
                            ) : (
                              <img
                                src={
                                  "http://1690550.masgroup.web.hosting-test.net" +
                                  favorite.image
                                }
                                alt="Картинка"
                              />
                            )
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
                        Type={
                          none.data_link_favorite
                            ? none.data_link_favorite.type_id
                            : "person"
                        }
                        Favorite={favorite.fav}
                        isFavortie={favorite.isfav}
                      ></EditDrop>
                      <SvgLoader path="../../img/Group5.svg">
                        <SvgProxy selector="#co" />
                      </SvgLoader>
                    </div>
                  </div>
                  <div className="d_flex_center date_persons">
                    <div className="persons_text_left">
                      {none.data_link_favorite.type_id === "company"
                        ? `Дата основания:`
                        : none.data_link_favorite.type_id === "event"
                        ? `Дата:`
                        : `День рождения:`}
                    </div>
                    <div className="persons_text_right">
                      {favorite.birth_date}
                    </div>
                  </div>

                  {favorite.city !== null ? (
                    <div className="d_flex_center adress_persons">
                      <div className="persons_text_left">Город:</div>
                      <div className="persons_text_right">{favorite.city}</div>
                    </div>
                  ) : (
                    <div className="d_flex_center adress_persons"></div>
                  )}

                  <div className="d_flex_center page_persons">
                    <NavLink
                      className="text_link d_flex_center"
                      to={`${URL}/id/${favorite.id}`}
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
        ))}
      {displaySet === true && (
        <div className="persons_list_grid persons_list_column">
          <div className="header_persons_list">
            <div className="header_persons_list_name">{NameCategory}</div>
            <div className="header_persons_list_date">
              {" "}
              {none.data_link_favorite.type_id === "company"
                ? `Дата основания`
                : none.data_link_favorite.type_id === "event"
                ? `Дата`
                : `День рождения`}
            </div>
            <div className="header_persons_list_city">Город</div>
          </div>

          {isFavorite ? (
            <div className="persons_list_column">
              {display.data_value !== undefined &&
                display.data_value.map((person, i) => (
                  <div className="persons_items" key={i}>
                    <div className="persons_items_head ">
                      <div className="container_info_persons d_flex_center">
                        <div
                          className={
                            person.isfav === true
                              ? "icon_image  active"
                              : "icon_image"
                          }
                        >
                          <div className="hidden_all">
                            {person.image !== null ? (
                              person.image === undefined ? (
                                <div className="text_persons">
                                  {person.firstname !== undefined
                                    ? person.firstname[0]
                                    : person.name[0]}
                                </div>
                              ) : (
                                <img
                                  src={
                                    "http://1690550.masgroup.web.hosting-test.net" +
                                    person.image
                                  }
                                  alt="Картинка"
                                />
                              )
                            ) : (
                              <div className="text_persons">
                                {person.firstname !== undefined
                                  ? person.firstname[0]
                                  : person.name[0]}
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
                            {person.firstname !== undefined
                              ? person.firstname +
                                " " +
                                (person.lastname !== null
                                  ? person.lastname
                                  : "")
                              : person.name}
                          </div>
                          <NavLink
                            className="text_link d_flex_center"
                            to={`${URL}/id/${person.id}`}
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
                        {person.birth_date !== undefined
                          ? person.birth_date
                          : person.event_date}
                      </div>
                    </div>
                    <div className="d_flex_center adress_persons">
                      {person.city !== null ? (
                        <div className="persons_text_right">{person.city}</div>
                      ) : (
                        <div className="persons_text_right"></div>
                      )}
                    </div>

                    {person.isfav === true ? (
                      <div
                        className="d_flex_center favorite_persons"
                        onClick={() =>
                          delete_favorite(
                            person.id,
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
                            none.sorted
                          )
                        }
                      >
                        <SvgLoader path="../../img/favorites.svg">
                          <SvgProxy selector="#co" />
                        </SvgLoader>
                        <div className="persons_text_right">В избранные</div>
                      </div>
                    )}

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
                        onClick={() =>
                          delete_all(
                            none.data_link_favorite.type_link,
                            person.id
                          )
                        }
                      >
                        Удалить
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="persons_list_column">
              {display.data_value_favorite !== null &&
                display.data_value_favorite.map((favorite, i) => (
                  <div className="persons_items" key={i}>
                    <div className="persons_items_head ">
                      <div className="container_info_persons d_flex_center">
                        <div className={"icon_image  active"}>
                          <div className="hidden_all">
                            {favorite.image !== null ? (
                              favorite.image === undefined ? (
                                <div className="text_persons">
                                  {favorite.firstname[0]}
                                </div>
                              ) : (
                                <img
                                  src={
                                    "http://1690550.masgroup.web.hosting-test.net" +
                                    favorite.image
                                  }
                                  alt="Картинка"
                                />
                              )
                            ) : (
                              <div className="text_persons">
                                {favorite.firstname[0]}
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
                            to={`${URL}/id/${favorite.id}`}
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
                        {favorite.birth_date !== undefined
                          ? favorite.birth_date
                          : favorite.event_date}
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
                      to={`/person/${favorite.id}/edit`}
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
    </div>
  );
}

export default SearchAll;
