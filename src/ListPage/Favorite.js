import React, { useContext, useEffect } from "react";
import Search from "../addElement/search";
import { NavLink } from "react-router-dom";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { ReduceContext } from "../context/reducerContext";
import SelectExample from "../addElement/Select";
import EditDrop from "../addElement/editDropDown";
import { ShowContext } from "../context/show/showContext";

//Страница Избранные
function Favorite() {
  const { hide, display, show } = useContext(ShowContext);

  const {
    none,
    Fetch_data_favorite,
    number_all,
    delete_favorite,
    favorite_select
  } = useContext(ReduceContext);

  function onChangeElement(event, data) {
    const key = data.options.filter(x => x.value === data.value);
    favorite_select(data.value, key[0].key);
    Fetch_data_favorite(key[0].key);
    debugger;
  }
  function newSubmite(events, id, type, value) {
    if (events.target.dataset.index === "3") {
      delete_favorite(id, type);
    }
  }
  useEffect(() => {
    Fetch_data_favorite("persons");
  }, []);

  return (
    <div className="container_list">
      <div className="search_container">
        <Search />
      </div>
      <h2>Избранное</h2>
      <div className="container_persons container_favorites">
        <div className="container_persons_head">
          <SelectExample
            onChangeElement={(event, data) => onChangeElement(event, data)}
          ></SelectExample>
          <div className="container_persons_head_right">
            <div className="filter_abc">
              <button className="text_head_persons abs_to_A_and_Y button_select active">
                По алфавиту А-Я
              </button>
              <button className="text_head_persons abs_to_Y_and_A button_select">
                По алфавиту Я-А
              </button>
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
        
        {display.visible === false && (
          <div className="persons_list_grid">
            {none.data_favorite !== null &&
              none.data_favorite
                .filter(x => x.obj_type === none.data_link_favorite.type_id)
                .map((items, i) => (
                  <div className="persons_items" key={i}>
                    <div className="persons_items_head d_flex_center">
                      <div className="container_info_persons d_flex_center">
                        <div className="icon_image active">
                          {items.firstname ? items.firstname[0] : items.name[0]}
                          <SvgLoader
                            className="favorite_svg"
                            path="../../img/favorites_21.svg"
                          >
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                        </div>
                        <div className="container_info_persons_name">
                          {items.firstname
                            ? items.firstname + " " + items.lastname
                            : items.name}
                        </div>
                      </div>
                      <div className="persons_edit">
                        <EditDrop
                          key={items.id}
                          onClickDataNew={(events, data) =>
                            newSubmite(events, items.id, items.obj_type, data)
                          }
                          onClickData={() =>
                            number_all(items.id, `/${items.obj_type}`)
                          }
                        ></EditDrop>
                        <SvgLoader path="../../img/Group5.svg">
                          <SvgProxy selector="#co" />
                        </SvgLoader>
                      </div>
                    </div>
                    <div className="d_flex_center date_persons">
                      <div className="persons_text_left">День рождения:</div>
                      <div className="persons_text_right">
                        {items.birth_date !== undefined
                          ? items.birth_date
                          : items.event_date}
                      </div>
                    </div>
                    <div className="d_flex_center adress_persons">
                      <div className="persons_text_left">Город:</div>
                      <div className="persons_text_right">{items.city}</div>
                    </div>
                    <div className="d_flex_center page_persons">
                      <NavLink
                        className="text_link d_flex_center"
                        to={`/${items.obj_type}/id/${items.id}`}
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
        )}
        {display.visible === true && (
          <div className="persons_list_grid persons_list_column">
            <div className="header_persons_list">
              <div className="header_persons_list_name">Имя</div>
              <div className="header_persons_list_date">Дата рождения</div>
              <div className="header_persons_list_city">Город</div>
            </div>
            <div className="persons_list_column">
              {none.data_favorite !== null &&
                none.data_favorite.map((items, i) => (
                  <div className="persons_items">
                    <div className="persons_items_head ">
                      <div className="container_info_persons d_flex_center">
                        <div className="icon_image active">
                          {items.firstname ? items.firstname[0] : items.name[0]}
                          <SvgLoader
                            className="favorite_svg"
                            path="../../img/favorites_21.svg"
                          >
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                        </div>
                        <div className="container_info_persons_column">
                          <div className="container_info_persons_name">
                            {items.firstname
                              ? items.firstname + " " + items.lastname
                              : items.name}
                          </div>
                          <NavLink
                            className="text_link d_flex_center"
                            to={`/${items.obj_type}/id/${items.id}`}
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
                        {" "}
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
                      className="d_flex_center edit_persons"
                    >
                      <SvgLoader path="../../img/Edit1.svg">
                        <SvgProxy selector="#co" />
                      </SvgLoader>
                      <div className="persons_text_right">Редактировать</div>
                    </NavLink>
                    <div
                      className="d_flex_center delete_persons"
                      onClick={() => delete_favorite(items.id, items.obj_type)}
                    >
                      <SvgLoader path="../../img/Delete1.svg">
                        <SvgProxy selector="#co" />
                      </SvgLoader>
                      <div className="persons_text_right">
                        Удалить из избранного
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Favorite;
