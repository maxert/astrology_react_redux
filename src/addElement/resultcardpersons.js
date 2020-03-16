import React, { useContext } from "react";
import EditDrop from "./editDropDown";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { SelectNew } from "./SelectNew";
import CreateNote from "./createNote";
import NoteList from "./NoteList";
import { ShowContext } from "../context/show/showContext";
import { ReduceContext } from "../context/reducerContext";

//Блок скрытой натальной карты персоны
function ResultCardPersons() {
  const { display } = useContext(ShowContext);
  const { none } = useContext(ReduceContext);
  if (!display.visible) {
    return null;
  }
  return (
    <div className="element_continer">
      <div className="notal_card_community">
        <div className="notal_card_head">
          <div className="text_big_all">Натальная карта персоны</div>
        </div>
        <div className="notal_person">
          <div className="persons_items notal_items">
            <div className="persons_items_head d_flex_center">
              <div className="container_info_persons d_flex_center">
                <SelectNew></SelectNew>
                <div className="container_info_persons_name">
                  Tue 24-09-1991 15:00:00
                </div>
              </div>
              <div className="persons_edit">
                <EditDrop></EditDrop>
                <SvgLoader path="../../img/Group5.svg">
                  <SvgProxy selector="#co" />
                </SvgLoader>
              </div>
            </div>
            <div className="notal_table_persons">
              <div className="d_flex_center image_notal notalPersons_left">
                <SvgLoader path="../../img/Натальная карта.svg">
                  <SvgProxy selector="#co" />
                </SvgLoader>

                {none.data_notal !== undefined && (
                  <div className="block_numbers">
                    <div className="one">
                      {none.data_notal.data.houses[5].nmz}
                    </div>
                    <div className="two">
                      {none.data_notal.data.houses[6].nmz}
                    </div>
                    <div className="three">
                      {none.data_notal.data.houses[7].nmz}
                    </div>
                    <div className="four">
                      {none.data_notal.data.houses[8].nmz}
                    </div>
                    <div className="five">
                      {none.data_notal.data.houses[9].nmz}
                    </div>
                    <div className="six">
                      {none.data_notal.data.houses[10].nmz}
                    </div>
                    <div className="seven">
                      {none.data_notal.data.houses[11].nmz}
                    </div>
                    <div className="eight">
                      {none.data_notal.data.houses[12].nmz}
                    </div>
                    <div className="nine">
                      {none.data_notal.data.houses[1].nmz}
                    </div>
                    <div className="ten">
                      {none.data_notal.data.houses[2].nmz}
                    </div>
                    <div className="eleven">
                      {none.data_notal.data.houses[3].nmz}
                    </div>
                    <div className="Twelve">
                      {none.data_notal.data.houses[4].nmz}
                    </div>
                  </div>
                )}
                {none.data_notal !== undefined && (
                  <div className="block_info">
                    <div className="grid_column_two">
                      <div>
                        {none.data_notal.data.houses[2].pl.map(items => (
                          <div className="OneOne">{items}</div>
                        ))}
                      </div>
                      <div>
                        {none.data_notal.data.houses[12].pl.map(items => (
                          <div className="OneOne">{items}</div>
                        ))}
                      </div>
                    </div>
                    <div className="grid_column_three">
                      <div>
                        {none.data_notal.data.houses[3].pl.map(items => (
                          <div className="OneOne">{items}</div>
                        ))}
                      </div>
                      <div>
                        {none.data_notal.data.houses[1].pl.map(items => (
                          <div className="OneOne">{items}</div>
                        ))}
                      </div>
                      <div>
                        {none.data_notal.data.houses[11].pl.map(items => (
                          <div className="OneOne">{items}</div>
                        ))}
                      </div>
                    </div>
                    <div className="grid_column_two">
                      <div>
                        {none.data_notal.data.houses[4].pl.map(items => (
                          <div className="OneOne">{items}</div>
                        ))}
                      </div>
                      <div>
                        {none.data_notal.data.houses[10].pl.map(items => (
                          <div className="OneOne">{items}</div>
                        ))}
                      </div>
                    </div>
                    <div className="grid_column_three">
                      <div>
                        {none.data_notal.data.houses[5].pl.map(items => (
                          <div className="OneOne">{items}</div>
                        ))}
                      </div>
                      <div>
                        {none.data_notal.data.houses[7].pl.map(items => (
                          <div className="OneOne">{items}</div>
                        ))}
                      </div>
                      <div>
                        {none.data_notal.data.houses[9].pl.map(items => (
                          <div className="OneOne">{items}</div>
                        ))}
                      </div>
                    </div>
                    <div className="grid_column_two">
                      <div>
                        {none.data_notal.data.houses[6].pl.map(items => (
                          <div className="OneOne">{items}</div>
                        ))}
                      </div>
                      <div>
                        {none.data_notal.data.houses[7].pl.map(items => (
                          <div className="OneOne">{items}</div>
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
                  {none.data_notal !== undefined && (
                    <div className="table_persons">
                      <div className="table_persons_left">
                        {none.data_notal.data.dasha.map((items, i) => (
                          <div className="table_persons_left_text" key={i}>
                            {items[0]}
                          </div>
                        ))}
                      </div>
                      <div className="table_persons_right">
                        {none.data_notal.data.dasha.map((items, i) => (
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
                {none.data_notal !== undefined && (
                  <div className="table_planets">
                    <div className="header_table">
                      <div className="table_text table_text_small">Планета</div>
                      {Object.keys(none.data_notal.data.res_planet).map(
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

                      {Object.keys(none.data_notal.data.res_planet).map(
                        (items, i) => (
                          <div className="table_text" key={i}>
                            <div className="center_table">
                              <div className="table_text_time">
                                {none.data_notal.data.res_planet[items].text}
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateNote></CreateNote>
      <NoteList></NoteList>
    </div>
  );
}
export default ResultCardPersons;
