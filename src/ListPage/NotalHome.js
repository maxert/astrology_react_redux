import React, { useContext, useState, useEffect } from "react";
import Search from "../addElement/search";
import { NavLink, useRouteMatch } from "react-router-dom";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { ReduceContext } from "../context/reducerContext";
import { SelectNew } from "../addElement/SelectNew";
import EditDrop from "../addElement/editDropDown";
import { Dimmer, Loader } from "semantic-ui-react";
//Блок Главной страниццы
function NotalHome() {
  const [select, setSelect] = useState("0");
  const { none, createNotals } = useContext(ReduceContext);
  function selectNew(event, data) {
    setSelect(data.value);
    debugger;
  }
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("save_natal"));
    if (data !== null) {
      const date = data.date.split(".");
      let new_date = date[2] + "-" + date[1] + "-" + date[0];
      data["date"] = new_date;

      createNotals(data);
    }
  }, []);
  return (
    <div className="container_list">
      <div className="container_persons">
        <div className="button_header">
          <NavLink to={`/`}>
            <div className="purple">
              <SvgLoader path="../../img/Arrow2.svg">
                <SvgProxy selector="#cst" />
              </SvgLoader>
              Назад
            </div>
          </NavLink>
        </div>
        <div className="element_continer notal_home">
          <div className="notal_card_community">
            <div className="notal_card_head">
              <div className="text_big_all">Натальная карта</div>
            </div>
            <div className="notal_person">
              <div className="persons_items notal_items">
                <div className="persons_items_head d_flex_center">
                  <div className="container_info_persons d_flex_center">
                    <SelectNew
                      ChangeSelect={(event, data) => selectNew(event, data)}
                    ></SelectNew>
                    <div className="container_info_persons_name">
                      {/* {Birthday + " " + Time} */}
                    </div>
                  </div>
                  <div className="persons_edit">
                    <EditDrop></EditDrop>
                    <SvgLoader path="../../img/Group5.svg">
                      <SvgProxy selector="#co" />
                    </SvgLoader>
                  </div>
                </div>
                {none.isLoading === false ? (
                  <Dimmer active={true} inverted>
                    <Loader size="massive">Loading</Loader>
                  </Dimmer>
                ) : select === "0" ? (
                  <div className="notal_table_persons">
                    <div className="d_flex_center image_notal notalPersons_left">
                      <SvgLoader path="../../img/Натальная карта.svg">
                        <SvgProxy selector="#co" />
                      </SvgLoader>

                      {none.notal_home !== undefined && (
                        <div className="block_numbers">
                          <div className="one">
                            {none.notal_home.houses[5].nmz}
                          </div>
                          <div className="two">
                            {none.notal_home.houses[6].nmz}
                          </div>
                          <div className="three">
                            {none.notal_home.houses[7].nmz}
                          </div>
                          <div className="four">
                            {none.notal_home.houses[8].nmz}
                          </div>
                          <div className="five">
                            {none.notal_home.houses[9].nmz}
                          </div>
                          <div className="six">
                            {none.notal_home.houses[10].nmz}
                          </div>
                          <div className="seven">
                            {none.notal_home.houses[11].nmz}
                          </div>
                          <div className="eight">
                            {none.notal_home.houses[12].nmz}
                          </div>
                          <div className="nine">
                            {none.notal_home.houses[1].nmz}
                          </div>
                          <div className="ten">
                            {none.notal_home.houses[2].nmz}
                          </div>
                          <div className="eleven">
                            {none.notal_home.houses[3].nmz}
                          </div>
                          <div className="Twelve">
                            {none.notal_home.houses[4].nmz}
                          </div>
                        </div>
                      )}
                      {none.notal_home !== undefined && (
                        <div className="block_info">
                          <div className="grid_column_two">
                            <div>
                              {none.notal_home.houses[2].pl.map((items, i) => (
                                <div
                                  className="OneOne"
                                  key={i}
                                  dangerouslySetInnerHTML={{ __html: items }}
                                ></div>
                              ))}
                            </div>
                            <div>
                              {none.notal_home.houses[12].pl.map((items, i) => (
                                <div
                                  key={i}
                                  className="OneOne"
                                  dangerouslySetInnerHTML={{ __html: items }}
                                ></div>
                              ))}
                            </div>
                          </div>
                          <div className="grid_column_three">
                            <div>
                              {none.notal_home.houses[3].pl.map((items, i) => (
                                <div
                                  key={i}
                                  className="OneOne"
                                  dangerouslySetInnerHTML={{ __html: items }}
                                ></div>
                              ))}
                            </div>
                            <div>
                              {none.notal_home.houses[1].pl.map((items, i) => (
                                <div
                                  key={i}
                                  className="OneOne"
                                  dangerouslySetInnerHTML={{ __html: items }}
                                ></div>
                              ))}
                            </div>
                            <div>
                              {none.notal_home.houses[11].pl.map((items, i) => (
                                <div
                                  key={i}
                                  className="OneOne"
                                  dangerouslySetInnerHTML={{ __html: items }}
                                ></div>
                              ))}
                            </div>
                          </div>
                          <div className="grid_column_two">
                            <div>
                              {none.notal_home.houses[4].pl.map((items, i) => (
                                <div
                                  key={i}
                                  className="OneOne"
                                  dangerouslySetInnerHTML={{ __html: items }}
                                ></div>
                              ))}
                            </div>
                            <div>
                              {none.notal_home.houses[10].pl.map((items, i) => (
                                <div
                                  key={i}
                                  className="OneOne"
                                  dangerouslySetInnerHTML={{ __html: items }}
                                ></div>
                              ))}
                            </div>
                          </div>
                          <div className="grid_column_three">
                            <div>
                              {none.notal_home.houses[5].pl.map((items, i) => (
                                <div
                                  key={i}
                                  className="OneOne"
                                  dangerouslySetInnerHTML={{ __html: items }}
                                ></div>
                              ))}
                            </div>
                            <div>
                              {none.notal_home.houses[7].pl.map((items, i) => (
                                <div
                                  key={i}
                                  className="OneOne"
                                  dangerouslySetInnerHTML={{ __html: items }}
                                ></div>
                              ))}
                            </div>
                            <div>
                              {none.notal_home.houses[9].pl.map((items, i) => (
                                <div
                                  key={i}
                                  className="OneOne"
                                  dangerouslySetInnerHTML={{ __html: items }}
                                ></div>
                              ))}
                            </div>
                          </div>
                          <div className="grid_column_two">
                            <div>
                              {none.notal_home.houses[6].pl.map((items, i) => (
                                <div
                                  key={i}
                                  className="OneOne"
                                  dangerouslySetInnerHTML={{ __html: items }}
                                ></div>
                              ))}
                            </div>
                            <div>
                              {none.notal_home.houses[8].pl.map((items, i) => (
                                <div
                                  key={i}
                                  className="OneOne"
                                  dangerouslySetInnerHTML={{ __html: items }}
                                ></div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="notalPersons_right">
                      <div className="container_info_persons_name">
                        Вимшотари Даша
                      </div>
                      <div className="table_persons_overflow">
                        {none.notal_home !== undefined && (
                          <div className="table_persons">
                            <div className="table_persons_left">
                              {none.notal_home.dasha.map((items, i) => (
                                <div
                                  className="table_persons_left_text"
                                  key={i}
                                >
                                  {items[0]}
                                </div>
                              ))}
                            </div>
                            <div className="table_persons_right">
                              {none.notal_home.dasha.map((items, i) => (
                                <div className="table_persons_date" key={i}>
                                  {items[1]}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="notalPersons_bottom">
                      {none.notal_home !== undefined && (
                        <div className="table_planets">
                          <div className="header_table">
                            <div className="table_text table_text_small">
                              Планета
                            </div>
                            {Object.keys(none.notal_home.res_planet).map(
                              (items, i) => (
                                <div className="table_text" key={i}>
                                  {items}
                                </div>
                              )
                            )}
                          </div>
                          <div className="footer_table">
                            <div className="table_text table_text_small">
                              Эклиптика
                            </div>

                            {Object.keys(none.notal_home.res_planet).map(
                              (items, i) => (
                                <div className="table_text" key={i}>
                                  <div className="center_table">
                                    <div
                                      className="table_text_time"
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          none.notal_home.res_planet[items].text
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="notal_table_persons">
                    <div className="d_flex_center image_notal notalPersons_left">
                      <SvgLoader path="../../img/Натальная карта.svg">
                        <SvgProxy selector="#co" />
                      </SvgLoader>

                      {none.notal_home !== undefined && (
                        <div className="block_numbers">
                          <div className="one">
                            {none.notal_home.houses_ay[5].nmz}
                          </div>
                          <div className="two">
                            {none.notal_home.houses_ay[6].nmz}
                          </div>
                          <div className="three">
                            {none.notal_home.houses_ay[7].nmz}
                          </div>
                          <div className="four">
                            {none.notal_home.houses_ay[8].nmz}
                          </div>
                          <div className="five">
                            {none.notal_home.houses_ay[9].nmz}
                          </div>
                          <div className="six">
                            {none.notal_home.houses_ay[10].nmz}
                          </div>
                          <div className="seven">
                            {none.notal_home.houses_ay[11].nmz}
                          </div>
                          <div className="eight">
                            {none.notal_home.houses_ay[12].nmz}
                          </div>
                          <div className="nine">
                            {none.notal_home.houses_ay[1].nmz}
                          </div>
                          <div className="ten">
                            {none.notal_home.houses_ay[2].nmz}
                          </div>
                          <div className="eleven">
                            {none.notal_home.houses_ay[3].nmz}
                          </div>
                          <div className="Twelve">
                            {none.notal_home.houses_ay[4].nmz}
                          </div>
                        </div>
                      )}
                      {none.notal_home !== undefined && (
                        <div className="block_info">
                          <div className="grid_column_two">
                            <div>
                              {none.notal_home.houses_ay[2].pl.map(
                                (items, i) => (
                                  <div
                                    className="OneOne"
                                    key={i}
                                    dangerouslySetInnerHTML={{ __html: items }}
                                  ></div>
                                )
                              )}
                            </div>
                            <div>
                              {none.notal_home.houses_ay[12].pl.map(
                                (items, i) => (
                                  <div
                                    key={i}
                                    className="OneOne"
                                    dangerouslySetInnerHTML={{ __html: items }}
                                  ></div>
                                )
                              )}
                            </div>
                          </div>
                          <div className="grid_column_three">
                            <div>
                              {none.notal_home.houses_ay[3].pl.map(
                                (items, i) => (
                                  <div
                                    key={i}
                                    className="OneOne"
                                    dangerouslySetInnerHTML={{ __html: items }}
                                  ></div>
                                )
                              )}
                            </div>
                            <div>
                              {none.notal_home.houses_ay[1].pl.map(
                                (items, i) => (
                                  <div
                                    key={i}
                                    className="OneOne"
                                    dangerouslySetInnerHTML={{ __html: items }}
                                  ></div>
                                )
                              )}
                            </div>
                            <div>
                              {none.notal_home.houses_ay[11].pl.map(
                                (items, i) => (
                                  <div
                                    key={i}
                                    className="OneOne"
                                    dangerouslySetInnerHTML={{ __html: items }}
                                  ></div>
                                )
                              )}
                            </div>
                          </div>
                          <div className="grid_column_two">
                            <div>
                              {none.notal_home.houses_ay[4].pl.map(
                                (items, i) => (
                                  <div
                                    key={i}
                                    className="OneOne"
                                    dangerouslySetInnerHTML={{ __html: items }}
                                  ></div>
                                )
                              )}
                            </div>
                            <div>
                              {none.notal_home.houses_ay[10].pl.map(
                                (items, i) => (
                                  <div
                                    key={i}
                                    className="OneOne"
                                    dangerouslySetInnerHTML={{ __html: items }}
                                  ></div>
                                )
                              )}
                            </div>
                          </div>
                          <div className="grid_column_three">
                            <div>
                              {none.notal_home.houses_ay[5].pl.map(
                                (items, i) => (
                                  <div
                                    key={i}
                                    className="OneOne"
                                    dangerouslySetInnerHTML={{ __html: items }}
                                  ></div>
                                )
                              )}
                            </div>
                            <div>
                              {none.notal_home.houses_ay[7].pl.map(
                                (items, i) => (
                                  <div
                                    key={i}
                                    className="OneOne"
                                    dangerouslySetInnerHTML={{ __html: items }}
                                  ></div>
                                )
                              )}
                            </div>
                            <div>
                              {none.notal_home.houses_ay[9].pl.map(
                                (items, i) => (
                                  <div
                                    key={i}
                                    className="OneOne"
                                    dangerouslySetInnerHTML={{ __html: items }}
                                  ></div>
                                )
                              )}
                            </div>
                          </div>
                          <div className="grid_column_two">
                            <div>
                              {none.notal_home.houses_ay[6].pl.map(
                                (items, i) => (
                                  <div
                                    key={i}
                                    className="OneOne"
                                    dangerouslySetInnerHTML={{ __html: items }}
                                  ></div>
                                )
                              )}
                            </div>
                            <div>
                              {none.notal_home.houses_ay[8].pl.map(
                                (items, i) => (
                                  <div
                                    key={i}
                                    className="OneOne"
                                    dangerouslySetInnerHTML={{ __html: items }}
                                  ></div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="notalPersons_right">
                      <div className="container_info_persons_name">
                        Вимшотари Даша
                      </div>
                      <div className="table_persons_overflow">
                        {none.notal_home !== undefined && (
                          <div className="table_persons">
                            <div className="table_persons_left">
                              {none.notal_home.dasha_ay.map((items, i) => (
                                <div
                                  className="table_persons_left_text"
                                  key={i}
                                >
                                  {items[0]}
                                </div>
                              ))}
                            </div>
                            <div className="table_persons_right">
                              {none.notal_home.dasha_ay.map((items, i) => (
                                <div className="table_persons_date" key={i}>
                                  {items[1]}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="notalPersons_bottom">
                      {none.notal_home !== undefined &&
                        (select === "0" ? (
                          <div className="table_planets">
                            <div className="header_table">
                              <div className="table_text table_text_small">
                                Планета
                              </div>
                              {Object.keys(none.notal_home.res_planet).map(
                                (items, i) => (
                                  <div className="table_text" key={i}>
                                    {items}
                                  </div>
                                )
                              )}
                            </div>
                            <div className="footer_table">
                              <div className="table_text table_text_small">
                                Эклиптика
                              </div>

                              {Object.keys(none.notal_home.res_planet).map(
                                (items, i) => (
                                  <div className="table_text" key={i}>
                                    <div className="center_table">
                                      <div
                                        className="table_text_time"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            none.notal_home.res_planet[items]
                                              .text
                                        }}
                                      ></div>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="table_planets">
                            <div className="header_table">
                              <div className="table_text table_text_small">
                                Планета
                              </div>
                              {Object.keys(none.notal_home.res_planet).map(
                                (items, i) => (
                                  <div className="table_text" key={i}>
                                    {items}
                                  </div>
                                )
                              )}
                            </div>
                            <div className="footer_table">
                              <div className="table_text table_text_small">
                                Эклиптика
                              </div>

                              {Object.keys(none.notal_home.res_planet).map(
                                (items, i) => (
                                  <div className="table_text" key={i}>
                                    <div className="center_table">
                                      <div
                                        className="table_text_time"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            none.notal_home.res_planet[items]
                                              .text_ay
                                        }}
                                      ></div>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotalHome;
