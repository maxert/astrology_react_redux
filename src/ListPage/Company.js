import React, { useContext, useEffect } from "react";
import Search from "../addElement/search";
import { Button } from "semantic-ui-react";
import { NavLink, useRouteMatch, Switch, Route } from "react-router-dom";
import { SvgLoader, SvgProxy } from "react-svgmt";
import EditDrop from "../addElement/editDropDown";
import CompanyList from "../ListPage/CompanyList";
import CompanyAdd from "../ListPage/CompanyAdd";
import { ReduceContext } from "../context/reducerContext";
import CompanyEdit from "./CompanyEdit";
import PaginationExamplePagination from "../addElement/pagination";

//Страница списка компаний
function CompanyHome() {
  const {
    hide,
    none,
    show,
    Fetch_data_сompany,
    delete_company,
    number_all,
    Add_favorite
  } = useContext(ReduceContext);
  let { url } = useRouteMatch();
  function pagination(Value) {
    Fetch_data_сompany(Value._targetInst.pendingProps.value);
  }

  function newSubmite(events, id, value) {
    if (events.target.dataset.index === "2") {
      delete_company(id);
    } else if (events.target.dataset.index === "0") {
      debugger;
      Add_favorite("company", id);
    }
  }
  useEffect(() => {
    Fetch_data_сompany();
  });

  return (
    <div className="container_list">
      <div className="search_container">
        <Search />
      </div>
      <h2>Компания</h2>
      <div className="container_persons container_company">
        <div className="container_persons_head">
          <NavLink to={`${url}/add`}>
            <Button>Создать новую Компанию</Button>
          </NavLink>
          <div className="container_persons_head_right">
            <div className="filter_abc">
              <button className="text_head_persons abs_to_A_and_Y button_select active">
                По алфавиту А-Я
              </button>
              <button className="text_head_persons abs_to_Y_and_A button_select">
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
                className={none.visible ? " " : "active"}
                onClick={none.visible ? show : show}
              >
                <SvgProxy selector="#co" />
              </SvgLoader>

              <SvgLoader
                path="../../img/Group4.svg"
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
            {none.data_company !== null &&
              none.data_company.companies.map(companies => (
                <div className="persons_items" key={companies.id}>
                  <div className="persons_items_head d_flex_center">
                    <div className="container_info_persons d_flex_center">
                      <div className="icon_image">{companies.name[0]}</div>
                      <div className="container_info_persons_name">
                        {companies.name}
                      </div>
                    </div>
                    <div className="persons_edit">
                      <EditDrop
                        key={companies.id}
                        onClickDataNew={(events, data) =>
                          newSubmite(events, companies.id, data)
                        }
                        onClickData={() => number_all(companies.id)}
                      ></EditDrop>
                      <SvgLoader path="../../img/Group5.svg">
                        <SvgProxy selector="#co" />
                      </SvgLoader>
                    </div>
                  </div>
                  <div className="d_flex_center date_persons">
                    <div className="persons_text_left">День рождения:</div>
                    <div className="persons_text_right">
                      {companies.birth_date}
                    </div>
                  </div>
                  <div className="d_flex_center adress_persons">
                    <div className="persons_text_left">Город:</div>
                    <div className="persons_text_right">{companies.city}</div>
                  </div>
                  <div className="d_flex_center page_persons">
                    <NavLink
                      className="text_link d_flex_center"
                      to={`${url}/id/${companies.id}`}
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
        {none.visible === true && (
          <div className="persons_list_grid persons_list_column">
            <div className="header_persons_list">
              <div className="header_persons_list_name">Название компании</div>
              <div className="header_persons_list_date">Дата основания</div>
              <div className="header_persons_list_city">Город</div>
            </div>
            <div className="persons_list_column">
              {none.data_company !== undefined &&
                none.data_company.companies.map((companies, i) => (
                  <div className="persons_items" key={i}>
                    <div className="persons_items_head ">
                      <div className="container_info_persons d_flex_center">
                        <div className="icon_image active">
                          {companies.name[0]}
                          <SvgLoader
                            className="favorite_svg"
                            path="../../img/favorites_21.svg"
                          >
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                        </div>
                        <div className="container_info_persons_column">
                          <div className="container_info_persons_name">
                            {companies.name}
                          </div>
                          <NavLink
                            className="text_link d_flex_center"
                            to={`${url}/id/${companies.id}`}
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
                        {companies.birth_date}
                      </div>
                    </div>
                    <div className="d_flex_center adress_persons">
                      <div className="persons_text_right">{companies.city}</div>
                    </div>
                    <div className="d_flex_center favorite_persons" onClick={()=>Add_favorite("company", companies.id)}>
                      <SvgLoader path="../../img/favorites.svg">
                        <SvgProxy selector="#co" />
                      </SvgLoader>
                      <div className="persons_text_right">В избранные</div>
                    </div>
                    <NavLink
                      to={`${url}/${companies.id}/events`}
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
                          delete_company(companies.id);
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
      <div className="d_flex_center pagination">
        <PaginationExamplePagination
          listPageAll={none.data_company ? none.data_company.pages : 1}
          listpagedefault={1}
          SelectPagination={SelectPagination => pagination(SelectPagination)}
        />
      </div>
    </div>
  );
}
function Company() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={CompanyHome} />
      <Route path={`${path}/id/:id`} component={CompanyList} />
      <Route path={`${path}/add`} component={CompanyAdd} />
      <Route path={`${path}/:id/edit`} component={CompanyEdit} />
    </Switch>
  );
}
export default Company;
