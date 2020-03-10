import React, { useContext } from "react";
import Search from "../addElement/search";
import { NavLink, useRouteMatch } from "react-router-dom";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { ReduceContext } from "../context/reducerContext";
import { SelectExample } from "../addElement/Select";
import EditDrop from "../addElement/editDropDown";
function Favorite() {
  const { hide, none, show } = useContext(ReduceContext);
  let { url } = useRouteMatch();

  return (
    <div className="container_list">
      <div className="search_container">
        <Search />
      </div>
      <h2>Избранное</h2>
      <div className="container_persons container_favorites">
        <div className="container_persons_head">
          <SelectExample></SelectExample>
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
                path="../img/Group3.svg"
                className={none.visible ? " " : "active"}
                onClick={none.visible ? show : show}
              >
                <SvgProxy selector="#co" />
              </SvgLoader>

              <SvgLoader
                path="../img/Group4.svg"
                className={none.visible ? "active" : " "}
                onClick={none.visible ? hide : hide}
              >
                <SvgProxy selector="#co" />
              </SvgLoader>
            </div>
          </div>
        </div>

        {none.visible === false && (
          <div className="persons_list_grid">
            <div className="persons_items">
              <div className="persons_items_head d_flex_center">
                <div className="container_info_persons d_flex_center">
                  <div className="icon_image active">
                    <img
                      className="icon_image_size"
                      src="/img/Ellipse 11.png"
                      alt=""
                    />
                    <SvgLoader
                      className="favorite_svg"
                      path="../img/favorites_21.svg"
                    >
                      <SvgProxy selector="#co" />
                    </SvgLoader>
                  </div>
                  <div className="container_info_persons_name">
                    Ростислав Кардашевский
                  </div>
                </div>
                <div className="persons_edit">
                  <EditDrop></EditDrop>
                  <SvgLoader path="../img/Group5.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                </div>
              </div>
              <div className="d_flex_center date_persons">
                <div className="persons_text_left">День рождения:</div>
                <div className="persons_text_right">20.06.2006</div>
              </div>
              <div className="d_flex_center adress_persons">
                <div className="persons_text_left">Город:</div>
                <div className="persons_text_right">Зеленодольск</div>
              </div>
              <div className="d_flex_center page_persons">
                <NavLink className="text_link d_flex_center" to={`${url}/all`}>
                  Перейти{" "}
                  <SvgLoader path="../img/Arrow_21.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                </NavLink>
              </div>
            </div>
            <div className="persons_items">
              <div className="persons_items_head d_flex_center">
                <div className="container_info_persons d_flex_center">
                  <div className="icon_image active">
                    <img
                      className="icon_image_size"
                      src="/img/Ellipse 11.png"
                      alt=""
                    />
                    <SvgLoader
                      className="favorite_svg"
                      path="../img/favorites_21.svg"
                    >
                      <SvgProxy selector="#co" />
                    </SvgLoader>
                  </div>
                  <div className="container_info_persons_name">
                    Ростислав Кардашевский
                  </div>
                </div>
                <div className="persons_edit">
                <EditDrop></EditDrop>
                  <SvgLoader path="../img/Group5.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                </div>
              </div>
              <div className="d_flex_center date_persons">
                <div className="persons_text_left">День рождения:</div>
                <div className="persons_text_right">20.06.2006</div>
              </div>
              <div className="d_flex_center adress_persons">
                <div className="persons_text_left">Город:</div>
                <div className="persons_text_right">Зеленодольск</div>
              </div>
              <div className="d_flex_center page_persons">
                <NavLink className="text_link d_flex_center" to={`${url}/all`}>
                  Перейти{" "}
                  <SvgLoader path="../img/Arrow_21.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                </NavLink>
              </div>
            </div>
            <div className="persons_items">
              <div className="persons_items_head d_flex_center">
                <div className="container_info_persons d_flex_center">
                  <div className="icon_image active">
                    <img
                      className="icon_image_size"
                      src="/img/Ellipse 11.png"
                      alt=""
                    />
                    <SvgLoader
                      className="favorite_svg"
                      path="../img/favorites_21.svg"
                    >
                      <SvgProxy selector="#co" />
                    </SvgLoader>
                  </div>
                  <div className="container_info_persons_name">
                    Ростислав Кардашевский
                  </div>
                </div>
                <div className="persons_edit">
                <EditDrop></EditDrop>
                  <SvgLoader path="../img/Group5.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                </div>
              </div>
              <div className="d_flex_center date_persons">
                <div className="persons_text_left">День рождения:</div>
                <div className="persons_text_right">20.06.2006</div>
              </div>
              <div className="d_flex_center adress_persons">
                <div className="persons_text_left">Город:</div>
                <div className="persons_text_right">Зеленодольск</div>
              </div>
              <div className="d_flex_center page_persons">
                <NavLink className="text_link d_flex_center" to={`${url}/all`}>
                  Перейти{" "}
                  <SvgLoader path="../img/Arrow_21.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                </NavLink>
              </div>
            </div>
            <div className="persons_items">
              <div className="persons_items_head d_flex_center">
                <div className="container_info_persons d_flex_center">
                  <div className="icon_image active">
                    <img
                      className="icon_image_size"
                      src="/img/Ellipse 11.png"
                      alt=""
                    />
                    <SvgLoader
                      className="favorite_svg"
                      path="../img/favorites_21.svg"
                    >
                      <SvgProxy selector="#co" />
                    </SvgLoader>
                  </div>
                  <div className="container_info_persons_name">
                    Ростислав Кардашевский
                  </div>
                </div>
                <div className="persons_edit">
                <EditDrop></EditDrop>
                  <SvgLoader path="../img/Group5.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                </div>
              </div>
              <div className="d_flex_center date_persons">
                <div className="persons_text_left">День рождения:</div>
                <div className="persons_text_right">20.06.2006</div>
              </div>
              <div className="d_flex_center adress_persons">
                <div className="persons_text_left">Город:</div>
                <div className="persons_text_right">Зеленодольск</div>
              </div>
              <div className="d_flex_center page_persons">
                <NavLink className="text_link d_flex_center" to={`${url}/all`}>
                  Перейти{" "}
                  <SvgLoader path="../img/Arrow_21.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                </NavLink>
              </div>
            </div>
            <div className="persons_items">
              <div className="persons_items_head d_flex_center">
                <div className="container_info_persons d_flex_center">
                  <div className="icon_image active">
                    <img
                      className="icon_image_size"
                      src="/img/Ellipse 11.png"
                      alt=""
                    />
                    <SvgLoader
                      className="favorite_svg"
                      path="../img/favorites_21.svg"
                    >
                      <SvgProxy selector="#co" />
                    </SvgLoader>
                  </div>
                  <div className="container_info_persons_name">
                    Ростислав Кардашевский
                  </div>
                </div>
                <div className="persons_edit">
                <EditDrop></EditDrop>
                  <SvgLoader path="../img/Group5.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                </div>
              </div>
              <div className="d_flex_center date_persons">
                <div className="persons_text_left">День рождения:</div>
                <div className="persons_text_right">20.06.2006</div>
              </div>
              <div className="d_flex_center adress_persons">
                <div className="persons_text_left">Город:</div>
                <div className="persons_text_right">Зеленодольск</div>
              </div>
              <div className="d_flex_center page_persons">
                <NavLink className="text_link d_flex_center" to={`${url}/all`}>
                  Перейти{" "}
                  <SvgLoader path="../img/Arrow_21.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                </NavLink>
              </div>
            </div>
            <div className="persons_items">
              <div className="persons_items_head d_flex_center">
                <div className="container_info_persons d_flex_center">
                  <div className="icon_image active">
                    <img
                      className="icon_image_size"
                      src="/img/Ellipse 11.png"
                      alt=""
                    />
                    <SvgLoader
                      className="favorite_svg"
                      path="../img/favorites_21.svg"
                    >
                      <SvgProxy selector="#co" />
                    </SvgLoader>
                  </div>
                  <div className="container_info_persons_name">
                    Ростислав Кардашевский
                  </div>
                </div>
                <div className="persons_edit">
                <EditDrop></EditDrop>
                  <SvgLoader path="../img/Group5.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                </div>
              </div>
              <div className="d_flex_center date_persons">
                <div className="persons_text_left">День рождения:</div>
                <div className="persons_text_right">20.06.2006</div>
              </div>
              <div className="d_flex_center adress_persons">
                <div className="persons_text_left">Город:</div>
                <div className="persons_text_right">Зеленодольск</div>
              </div>
              <div className="d_flex_center page_persons">
                <NavLink className="text_link d_flex_center" to={`${url}/all`}>
                  Перейти{" "}
                  <SvgLoader path="../img/Arrow_21.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                </NavLink>
              </div>
            </div>
          </div>
        )}
        {none.visible === true && (
          <div className="persons_list_grid persons_list_column">
            <div className="header_persons_list">
              <div className="header_persons_list_name">Имя</div>
              <div className="header_persons_list_date">Дата рождения</div>
              <div className="header_persons_list_city">Город</div>
            </div>
            <div className="persons_list_column">
              <div className="persons_items">
                <div className="persons_items_head ">
                  <div className="container_info_persons d_flex_center">
                    <div className="icon_image">
                      <img
                        className="icon_image_size"
                        src="/img/Ellipse 11.png"
                        alt=""
                      />
                    </div>
                    <div className="container_info_persons_column">
                      <div className="container_info_persons_name">
                        Ростислав Кардашевский
                      </div>
                      <NavLink
                        className="text_link d_flex_center"
                        to={`${url}/all`}
                      >
                        Перейти{" "}
                        <SvgLoader path="../img/Arrow_21.svg">
                          <SvgProxy selector="#co" />
                        </SvgLoader>
                      </NavLink>
                    </div>
                  </div>
                </div>
                <div className="d_flex_center date_persons">
                  <div className="persons_text_right">20.06.2006</div>
                </div>
                <div className="d_flex_center adress_persons">
                  <div className="persons_text_right">Зеленодольск</div>
                </div>
                <div className="d_flex_center favorite_persons">
                  <SvgLoader path="../img/favorites.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                  <div className="persons_text_right">В избранные</div>
                </div>
                <div className="d_flex_center edit_persons">
                  <SvgLoader path="../img/Edit1.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                  <div className="persons_text_right">Редактировать</div>
                </div>
                <div className="d_flex_center delete_persons">
                  <SvgLoader path="../img/Delete1.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                  <div className="persons_text_right">Удалить из избранного</div>
                </div>
              </div>
              <div className="persons_items">
                <div className="persons_items_head ">
                  <div className="container_info_persons d_flex_center">
                    <div className="icon_image active">
                      <img
                        className="icon_image_size"
                        src="/img/Ellipse 11.png"
                        alt=""
                      />
                      <SvgLoader
                        className="favorite_svg"
                        path="../img/favorites_21.svg"
                      >
                        <SvgProxy selector="#co" />
                      </SvgLoader>
                    </div>
                    <div className="container_info_persons_column">
                      <div className="container_info_persons_name">
                        Ростислав Кардашевский
                      </div>
                      <NavLink
                        className="text_link d_flex_center"
                        to={`${url}/all`}
                      >
                        Перейти{" "}
                        <SvgLoader path="../img/Arrow_21.svg">
                          <SvgProxy selector="#co" />
                        </SvgLoader>
                      </NavLink>
                    </div>
                  </div>
                </div>
                <div className="d_flex_center date_persons">
                  <div className="persons_text_right">20.06.2006</div>
                </div>
                <div className="d_flex_center adress_persons">
                  <div className="persons_text_right">Зеленодольск</div>
                </div>
                <div className="d_flex_center favorite_persons">
                  <SvgLoader path="../img/favorites.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                  <div className="persons_text_right">В избранные</div>
                </div>
                <div className="d_flex_center edit_persons">
                  <SvgLoader path="../img/Edit1.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                  <div className="persons_text_right">Редактировать</div>
                </div>
                <div className="d_flex_center delete_persons">
                  <SvgLoader path="../img/Delete1.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>
                  <div className="persons_text_right">Удалить из избранного</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Favorite;
