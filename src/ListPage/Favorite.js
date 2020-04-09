import React, { useContext, useEffect, useState } from "react";

import { NavLink, useLocation, Link } from "react-router-dom";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { ReduceContext } from "../context/reducerContext";
import SelectExample from "../addElement/SelectFav";
import EditDrop from "../addElement/editDropDown";
import { ShowContext } from "../context/show/showContext";
import { Dimmer, Loader, Select } from "semantic-ui-react";
import SearchFav from "../addElement/SearchFav";
import manifest from ".././manifest";
//Страница Избранные
function Favorite() {
  const {
    hide,
    display,
    show,
    Fetch_favorite_list,
    Fetch_favorite_order,
    delete_favorite_list,
    select_favorite_list,
  } = useContext(ShowContext);

  const { none, favorite_select } = useContext(ReduceContext);
  const location = useLocation();

  function onChangeElement(event, data) {
    const key = data.options.filter((x) => x.value === data.value);
    favorite_select(data.value, key[0].key);
    select_favorite_list(data.value, key[0].key);
    Fetch_favorite_list(key[0].key);
  }

  const [isOrder, setOrder] = useState(true);
  useEffect(() => {
    Fetch_favorite_list("");
  }, []);

  return (
    <div className="container_list">
      <div className="search_container_home">
        <SearchFav />
      </div>
      <h2>Избранное</h2>
      <div className="container_persons container_favorites">
        <div className="container_persons_head">
          <SelectExample
            onChangeElement={(event, data) =>
              onChangeElement(event, data)
            }></SelectExample>
          <div className="container_persons_head_right">
            {none.width_mob <= 767 ? (
              <Select
                className="sort_all_mob"
                onChange={(e, data) =>
                  data.value !== 0
                    ? (Fetch_favorite_order(
                        false,
                        display.data_favorite && display.data_favorite,
                      ),
                      setOrder(false))
                    : (Fetch_favorite_order(
                        true,
                        display.data_favorite && display.data_favorite,
                      ),
                      setOrder(true))
                }
                defaultValue={0}
                options={[
                  { key: 0, value: 0, text: "От А до Я" },
                  { key: 1, value: 1, text: "От Я до А" },
                ]}
              />
            ) : (
              <div className="filter_abc">
                <button
                  className={
                    "text_head_persons abs_to_A_and_Y button_select" +
                    (isOrder === true ? " active" : "")
                  }
                  onClick={() => {
                    Fetch_favorite_order(
                      true,
                      display.data_favorite && display.data_favorite,
                    );
                    setOrder(true);
                  }}>
                  По алфавиту А-Я
                </button>
                <button
                  className={
                    "text_head_persons abs_to_A_and_Y button_select" +
                    (isOrder === false ? " active" : "")
                  }
                  onClick={() => {
                    Fetch_favorite_order(
                      false,
                      display.data_favorite && display.data_favorite,
                    );
                    setOrder(false);
                  }}>
                  По алфавиту Я-А
                </button>
              </div>
            )}

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

        {display.visible === false &&
          (none.isLoading === false ? (
            <Dimmer className="invert_none" active inverted>
              <Loader size="massive">Загрузка</Loader>
            </Dimmer>
          ) : (
            <div className="persons_list_grid">
              {display.data_favorite !== undefined &&
                display.data_favorite.map((items, i) => (
                  <div
                    className="persons_items"
                    key={items.id_title.toString()}>
                    <div className="persons_items_head d_flex_center">
                      <div className="container_info_persons d_flex_center">
                        <div className={"icon_image  active"}>
                          <div className="hidden_all">
                            {items.image !== null ? (
                              items.image === undefined ? (
                                <div className="text_persons">
                                  {items.firstname !== undefined
                                    ? items.firstname[0]
                                    : items.name[0]}
                                </div>
                              ) : (
                                <img
                                  src={manifest.URL + items.image}
                                  alt="Картинка"
                                />
                              )
                            ) : (
                              <div className="text_persons">
                                {items.firstname !== undefined
                                  ? items.firstname[0]
                                  : items.name[0]}
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
                          {items.firstname
                            ? items.firstname +
                              " " +
                              (items.lastname !== null ? items.lastname : "")
                            : items.name}
                        </div>
                      </div>
                      <div className="persons_edit">
                        <EditDrop
                          key={items.id_title}
                          ID={items.id}
                          Type={items.obj_type}
                          Data={display.data_favorite}
                          Favorite={1}></EditDrop>
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
                        {items.birth_date !== undefined
                          ? items.birth_date
                          : items.event_date}
                      </div>
                    </div>
                    {items.city && (
                      <div className="d_flex_center adress_persons">
                        <div className="persons_text_left">Город:</div>
                        <div className="persons_text_right">{items.city}</div>
                      </div>
                    )}

                    <div className="d_flex_center page_persons">
                      <Link
                        className="text_link d_flex_center"
                        to={{
                          pathname: `/${items.obj_type}/id/${items.id}`,
                          state: location.pathname,
                        }}>
                        Перейти{" "}
                        <SvgLoader path="../../img/Arrow_21.svg">
                          <SvgProxy selector="#co" />
                        </SvgLoader>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        {display.visible === true && (
          <div className="persons_list_grid persons_list_column">
            <div className="header_persons_list">
              <div className="header_persons_list_name">Имя</div>
              {none.data_link_favorite.type_id === "company"
                ? `Дата основания`
                : none.data_link_favorite.type_id === "event"
                ? `Дата`
                : `День рождения`}
              <div className="header_persons_list_city">Город</div>
            </div>
            {none.isLoading === false ? (
              <Dimmer className="invert_none" active inverted>
                <Loader size="massive">Загрузка</Loader>
              </Dimmer>
            ) : (
              <div className="persons_list_column">
                {display.data_favorite !== undefined &&
                  display.data_favorite.map((items, i) =>
                    none.width_mob <= 1280 ? (
                      <div className="persons_items" key={items.id_title}>
                        <div className="persons_items_head ">
                          <div className="container_info_persons d_flex_center">
                            <div className={"icon_image  active"}>
                              <div className="hidden_all">
                                {items.image !== null ? (
                                  items.image === undefined ? (
                                    <div className="text_persons">
                                      {items.firstname !== undefined
                                        ? items.firstname[0]
                                        : items.name[0]}
                                    </div>
                                  ) : (
                                    <img
                                      src={manifest.URL + items.image}
                                      alt="Картинка"
                                    />
                                  )
                                ) : (
                                  <div className="text_persons">
                                    {items.firstname !== undefined
                                      ? items.firstname[0]
                                      : items.name[0]}
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
                                {items.firstname
                                  ? items.firstname +
                                    " " +
                                    (items.lastname !== null
                                      ? items.lastname
                                      : "")
                                  : items.name}
                              </div>
                              <NavLink
                                className="text_link d_flex_center"
                                to={`/${items.obj_type}/id/${items.id}`}>
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
                            {items.birth_date !== undefined
                              ? items.birth_date
                              : items.event_date}
                          </div>
                        </div>
                        <div className="d_flex_center adress_persons">
                          <div className="persons_text_right">{items.city}</div>
                        </div>
                        <div className="persons_edit">
                          <EditDrop
                            key={items.id_title}
                            ID={items.id}
                            Type={items.obj_type}
                            Data={display.data_favorite}
                            Favorite={1}></EditDrop>
                          <SvgLoader path="../../img/Group5.svg">
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                        </div>
                      </div>
                    ) : (
                      <div className="persons_items" key={items.id_title}>
                        <div className="persons_items_head ">
                          <div className="container_info_persons d_flex_center">
                            <div className={"icon_image  active"}>
                              <div className="hidden_all">
                                {items.image !== null ? (
                                  items.image === undefined ? (
                                    <div className="text_persons">
                                      {items.firstname !== undefined
                                        ? items.firstname[0]
                                        : items.name[0]}
                                    </div>
                                  ) : (
                                    <img
                                      src={manifest.URL + items.image}
                                      alt="Картинка"
                                    />
                                  )
                                ) : (
                                  <div className="text_persons">
                                    {items.firstname !== undefined
                                      ? items.firstname[0]
                                      : items.name[0]}
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
                                {items.firstname
                                  ? items.firstname +
                                    " " +
                                    (items.lastname !== null
                                      ? items.lastname
                                      : "")
                                  : items.name}
                              </div>
                              <NavLink
                                className="text_link d_flex_center"
                                to={`/${items.obj_type}/id/${items.id}`}>
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
                            {items.birth_date !== undefined
                              ? items.birth_date
                              : items.event_date}
                          </div>
                        </div>
                        <div className="d_flex_center adress_persons">
                          <div className="persons_text_right">{items.city}</div>
                        </div>
                        <div className="d_flex_center favorite_persons">
                          <SvgLoader path="../../img/favorites.svg">
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                          <div className="persons_text_right">В избранные</div>
                        </div>
                        <NavLink
                          to={`/${items.obj_type}/${items.id}/edit`}
                          className="d_flex_center edit_persons">
                          <SvgLoader path="../../img/Edit1.svg">
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                          <div className="persons_text_right">
                            Редактировать
                          </div>
                        </NavLink>
                        <div
                          className="d_flex_center delete_persons"
                          onClick={() =>
                            delete_favorite_list(
                              items.id,
                              items.obj_type,
                              display.data_favorite,
                            )
                          }>
                          <SvgLoader path="../../img/Delete1.svg">
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                          <div className="persons_text_right">
                            Удалить из избранного
                          </div>
                        </div>
                      </div>
                    ),
                  )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default Favorite;
