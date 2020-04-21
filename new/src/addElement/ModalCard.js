import React, { useState } from "react";
import { Modal } from "semantic-ui-react";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { SelectNew } from "./SelectNew";

//Модальной окно натальной карты
function ModalExampleDimmer(Houses) {
  const [select, setSelect] = useState("1");
  function selectNew(event, data) {
    setSelect(data.value);
  }
  return (
    <Modal
      trigger={<div className="modal_click"></div>}
      closeIcon
      className="modal_big">
      <div className="notal_card_community element_continer ">
        <div className="notal_person">
          <div className="persons_items notal_items">
            <div className="persons_items_head d_flex_center">
              <div className="container_info_persons d_flex_center">
                <SelectNew
                  ValueNew={select}
                  ChangeSelect={(event, data) =>
                    selectNew(event, data)
                  }></SelectNew>
                <div className="container_info_persons_name"></div>
              </div>
            </div>

            {select === "1" ? (
              <div className="notal_table_persons">
                <div className="d_flex_center image_notal notalPersons_left">
                  <SvgLoader path="../../img/Натальная карта.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>

                  {Houses.Houses !== undefined && (
                    <div className="block_numbers">
                      <div className="one">{Houses.Houses.houses[5].nmz}</div>
                      <div className="two">{Houses.Houses.houses[6].nmz}</div>
                      <div className="three">{Houses.Houses.houses[7].nmz}</div>
                      <div className="four">{Houses.Houses.houses[8].nmz}</div>
                      <div className="five">{Houses.Houses.houses[9].nmz}</div>
                      <div className="six">{Houses.Houses.houses[10].nmz}</div>
                      <div className="seven">
                        {Houses.Houses.houses[11].nmz}
                      </div>
                      <div className="eight">
                        {Houses.Houses.houses[12].nmz}
                      </div>
                      <div className="nine">{Houses.Houses.houses[1].nmz}</div>
                      <div className="ten">{Houses.Houses.houses[2].nmz}</div>
                      <div className="eleven">
                        {Houses.Houses.houses[3].nmz}
                      </div>
                      <div className="Twelve">
                        {Houses.Houses.houses[4].nmz}
                      </div>
                    </div>
                  )}
                  {Houses.Houses !== undefined && (
                    <div className="block_info">
                      <div className="grid_column_two">
                        <div>
                          {Houses.Houses.houses[2].pl.map((items, i) => (
                            <div
                              className="OneOne"
                              key={i}
                              dangerouslySetInnerHTML={{ __html: items }}></div>
                          ))}
                        </div>
                        <div>
                          {Houses.Houses.houses[12].pl.map((items, i) => (
                            <div
                              key={i}
                              className="OneOne"
                              dangerouslySetInnerHTML={{ __html: items }}></div>
                          ))}
                        </div>
                      </div>
                      <div className="grid_column_three">
                        <div>
                          {Houses.Houses.houses[3].pl.map((items, i) => (
                            <div
                              key={i}
                              className="OneOne"
                              dangerouslySetInnerHTML={{ __html: items }}></div>
                          ))}
                        </div>
                        <div>
                          {Houses.Houses.houses[1].pl.map((items, i) => (
                            <div
                              key={i}
                              className="OneOne"
                              dangerouslySetInnerHTML={{ __html: items }}></div>
                          ))}
                        </div>
                        <div>
                          {Houses.Houses.houses[11].pl.map((items, i) => (
                            <div
                              key={i}
                              className="OneOne"
                              dangerouslySetInnerHTML={{ __html: items }}></div>
                          ))}
                        </div>
                      </div>
                      <div className="grid_column_two">
                        <div>
                          {Houses.Houses.houses[4].pl.map((items, i) => (
                            <div
                              key={i}
                              className="OneOne"
                              dangerouslySetInnerHTML={{ __html: items }}></div>
                          ))}
                        </div>
                        <div>
                          {Houses.Houses.houses[10].pl.map((items, i) => (
                            <div
                              key={i}
                              className="OneOne"
                              dangerouslySetInnerHTML={{ __html: items }}></div>
                          ))}
                        </div>
                      </div>
                      <div className="grid_column_three">
                        <div>
                          {Houses.Houses.houses[5].pl.map((items, i) => (
                            <div
                              key={i}
                              className="OneOne"
                              dangerouslySetInnerHTML={{ __html: items }}></div>
                          ))}
                        </div>
                        <div>
                          {Houses.Houses.houses[7].pl.map((items, i) => (
                            <div
                              key={i}
                              className="OneOne"
                              dangerouslySetInnerHTML={{ __html: items }}></div>
                          ))}
                        </div>
                        <div>
                          {Houses.Houses.houses[9].pl.map((items, i) => (
                            <div
                              key={i}
                              className="OneOne"
                              dangerouslySetInnerHTML={{ __html: items }}></div>
                          ))}
                        </div>
                      </div>
                      <div className="grid_column_two">
                        <div>
                          {Houses.Houses.houses[6].pl.map((items, i) => (
                            <div
                              key={i}
                              className="OneOne"
                              dangerouslySetInnerHTML={{ __html: items }}></div>
                          ))}
                        </div>
                        <div>
                          {Houses.Houses.houses[8].pl.map((items, i) => (
                            <div
                              key={i}
                              className="OneOne"
                              dangerouslySetInnerHTML={{ __html: items }}></div>
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
                    {Houses.Houses !== undefined && (
                      <div className="table_persons">
                        <div className="table_persons_left">
                          {Houses.Houses.dasha.map((items, i) => (
                            <div className="table_persons_left_text" key={i}>
                              {items[0]}
                            </div>
                          ))}
                        </div>
                        <div className="table_persons_right">
                          {Houses.Houses.dasha.map((items, i) => (
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
                  {Houses.Houses !== undefined && (
                    <div className="table_planets">
                      <div className="header_table">
                        <div className="table_text table_text_small">
                          Планета
                        </div>
                        {Object.keys(Houses.Houses.res_planet).map(
                          (items, i) => (
                            <div className="table_text" key={i}>
                              {items}
                            </div>
                          ),
                        )}
                      </div>
                      <div className="footer_table">
                        <div className="table_text table_text_small">
                          Эклиптика
                        </div>

                        {Object.keys(Houses.Houses.res_planet).map(
                          (items, i) => (
                            <div className="table_text" key={i}>
                              <div className="center_table">
                                <div
                                  className="table_text_time"
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      Houses.Houses.res_planet[items].text,
                                  }}></div>
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : select === "2" ? (
              <div className="notal_table_persons">
                <div className="d_flex_center image_notal notalPersons_left">
                  <SvgLoader path="../../img/Натальная карта.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>

                  {Houses.Houses !== undefined && (
                    <div className="block_numbers">
                      <div className="one">
                        {Houses.Houses.houses_ay[5].nmz}
                      </div>
                      <div className="two">
                        {Houses.Houses.houses_ay[6].nmz}
                      </div>
                      <div className="three">
                        {Houses.Houses.houses_ay[7].nmz}
                      </div>
                      <div className="four">
                        {Houses.Houses.houses_ay[8].nmz}
                      </div>
                      <div className="five">
                        {Houses.Houses.houses_ay[9].nmz}
                      </div>
                      <div className="six">
                        {Houses.Houses.houses_ay[10].nmz}
                      </div>
                      <div className="seven">
                        {Houses.Houses.houses_ay[11].nmz}
                      </div>
                      <div className="eight">
                        {Houses.Houses.houses_ay[12].nmz}
                      </div>
                      <div className="nine">
                        {Houses.Houses.houses_ay[1].nmz}
                      </div>
                      <div className="ten">
                        {Houses.Houses.houses_ay[2].nmz}
                      </div>
                      <div className="eleven">
                        {Houses.Houses.houses_ay[3].nmz}
                      </div>
                      <div className="Twelve">
                        {Houses.Houses.houses_ay[4].nmz}
                      </div>
                    </div>
                  )}
                  {Houses.Houses !== undefined && (
                    <div className="block_info">
                      <div className="grid_column_two">
                        <div>
                          {Houses.Houses.houses_ay[2].pl.map((items, i) => (
                            <div
                              className="OneOne"
                              key={i}
                              dangerouslySetInnerHTML={{ __html: items }}></div>
                          ))}
                        </div>
                        <div>
                          {Houses.Houses.houses_ay[12].pl.map((items, i) => (
                            <div
                              key={i}
                              className="OneOne"
                              dangerouslySetInnerHTML={{ __html: items }}></div>
                          ))}
                        </div>
                      </div>
                      <div className="grid_column_three">
                        <div>
                          {Houses.Houses.houses_ay[3].pl.map((items, i) => (
                            <div
                              key={i}
                              className="OneOne"
                              dangerouslySetInnerHTML={{ __html: items }}></div>
                          ))}
                        </div>
                        <div>
                          {Houses.Houses.houses_ay[1].pl.map((items, i) => (
                            <div
                              key={i}
                              className="OneOne"
                              dangerouslySetInnerHTML={{ __html: items }}></div>
                          ))}
                        </div>
                        <div>
                          {Houses.Houses.houses_ay[11].pl.map((items, i) => (
                            <div
                              key={i}
                              className="OneOne"
                              dangerouslySetInnerHTML={{ __html: items }}></div>
                          ))}
                        </div>
                      </div>
                      <div className="grid_column_two">
                        <div>
                          {Houses.Houses.houses_ay[4].pl.map((items, i) => (
                            <div
                              key={i}
                              className="OneOne"
                              dangerouslySetInnerHTML={{ __html: items }}></div>
                          ))}
                        </div>
                        <div>
                          {Houses.Houses.houses_ay[10].pl.map((items, i) => (
                            <div
                              key={i}
                              className="OneOne"
                              dangerouslySetInnerHTML={{ __html: items }}></div>
                          ))}
                        </div>
                      </div>
                      <div className="grid_column_three">
                        <div>
                          {Houses.Houses.houses_ay[5].pl.map((items, i) => (
                            <div
                              key={i}
                              className="OneOne"
                              dangerouslySetInnerHTML={{ __html: items }}></div>
                          ))}
                        </div>
                        <div>
                          {Houses.Houses.houses_ay[7].pl.map((items, i) => (
                            <div
                              key={i}
                              className="OneOne"
                              dangerouslySetInnerHTML={{ __html: items }}></div>
                          ))}
                        </div>
                        <div>
                          {Houses.Houses.houses_ay[9].pl.map((items, i) => (
                            <div
                              key={i}
                              className="OneOne"
                              dangerouslySetInnerHTML={{ __html: items }}></div>
                          ))}
                        </div>
                      </div>
                      <div className="grid_column_two">
                        <div>
                          {Houses.Houses.houses_ay[6].pl.map((items, i) => (
                            <div
                              key={i}
                              className="OneOne"
                              dangerouslySetInnerHTML={{ __html: items }}></div>
                          ))}
                        </div>
                        <div>
                          {Houses.Houses.houses_ay[8].pl.map((items, i) => (
                            <div
                              key={i}
                              className="OneOne"
                              dangerouslySetInnerHTML={{ __html: items }}></div>
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
                    {Houses.Houses !== undefined && (
                      <div className="table_persons">
                        <div className="table_persons_left">
                          {Houses.Houses.dasha_ay.map((items, i) => (
                            <div className="table_persons_left_text" key={i}>
                              {items[0]}
                            </div>
                          ))}
                        </div>
                        <div className="table_persons_right">
                          {Houses.Houses.dasha_ay.map((items, i) => (
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
                  {Houses.Houses !== undefined && (
                    <div className="table_planets">
                      <div className="header_table">
                        <div className="table_text table_text_small">
                          Планета
                        </div>
                        {Object.keys(Houses.Houses.res_planet).map(
                          (items, i) => (
                            <div className="table_text" key={i}>
                              {items}
                            </div>
                          ),
                        )}
                      </div>
                      <div className="footer_table">
                        <div className="table_text table_text_small">
                          Эклиптика
                        </div>

                        {Object.keys(Houses.Houses.res_planet).map(
                          (items, i) => (
                            <div className="table_text" key={i}>
                              <div className="center_table">
                                <div
                                  className="table_text_time"
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      Houses.Houses.res_planet[items].text_ay,
                                  }}></div>
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalExampleDimmer;
