import React, { useContext } from "react";
import { SvgLoader, SvgProxy } from "react-svgmt";
import ModalExampleDimmer from "./ModalCard";
import { ReduceContext } from "../context/reducerContext";

//Блок натальной карты связи
function NotalCommunity() {
  const { none } = useContext(ReduceContext);
  if (none.data_fetch_links === null || none.data_fetch_links.length === 0) {
    return null;
  }

  return (
    none.data_fetch_links.find(index => index.isDisplay===true&&index.natal!==null)!==undefined && (
      <div className="notal_card_community">
        <div>
          <div className="text_big_all">натальные карты Связей</div>
          <div className="notal_card_community_container">
            {none.data_fetch_links.map(
              items =>
                items.isDisplay === true&&items.natal!==null ? (
                  <div className="persons_items notal_items" key={items.id}>
                    <div className="persons_items_head d_flex_center">
                      <div className="container_info_persons d_flex_center">
                        <div className="container_info_persons_name">
                          {items.name}
                        </div>
                      </div>
                      {/* <div className="persons_edit">
                    <EditDrop></EditDrop>
                    <SvgLoader path="../../img/Group5.svg">
                      <SvgProxy selector="#co" />
                    </SvgLoader>
                  </div> */}
                    </div>
                    <div className="d_flex_center date_persons">
                      <div className="persons_text_left">На дату:</div>
                      <div className="persons_text_right">
                        {items.obj.birth_date}
                      </div>
                    </div>
                    {items.obj.city === null ? null : (
                      <div className="d_flex_center adress_persons">
                        <div className="persons_text_left">Город:</div>
                        <div className="persons_text_right">
                          {items.obj.city}
                        </div>
                      </div>
                    )}

                    <div className="d_flex_center image_notal notalPersons_left">
                      <ModalExampleDimmer
                      Houses={items.natal.data}
                      ></ModalExampleDimmer>
                      <SvgLoader path="../../img/Натальная карта.svg">
                        <SvgProxy selector="#co" />
                      </SvgLoader>

                      <div className="block_numbers">
                        <div className="one">
                          {items.natal.data.houses[5].nmz}
                        </div>
                        <div className="two">
                          {items.natal.data.houses[6].nmz}
                        </div>
                        <div className="three">
                          {items.natal.data.houses[7].nmz}
                        </div>
                        <div className="four">
                          {items.natal.data.houses[8].nmz}
                        </div>
                        <div className="five">
                          {items.natal.data.houses[9].nmz}
                        </div>
                        <div className="six">
                          {items.natal.data.houses[10].nmz}
                        </div>
                        <div className="seven">
                          {items.natal.data.houses[11].nmz}
                        </div>
                        <div className="eight">
                          {items.natal.data.houses[12].nmz}
                        </div>
                        <div className="nine">
                          {items.natal.data.houses[1].nmz}
                        </div>
                        <div className="ten">
                          {items.natal.data.houses[2].nmz}
                        </div>
                        <div className="eleven">
                          {items.natal.data.houses[3].nmz}
                        </div>
                        <div className="Twelve">
                          {items.natal.data.houses[4].nmz}
                        </div>
                      </div>

                      <div className="block_info">
                        <div className="grid_column_two">
                          <div>
                            {items.natal.data.houses[2].pl.map((items, i) => (
                              <div
                                className="OneOne"
                                key={i}
                                dangerouslySetInnerHTML={{ __html: items }}
                              ></div>
                            ))}
                          </div>
                          <div>
                            {items.natal.data.houses[12].pl.map((items, i) => (
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
                            {items.natal.data.houses[3].pl.map((items, i) => (
                              <div
                                key={i}
                                className="OneOne"
                                dangerouslySetInnerHTML={{ __html: items }}
                              ></div>
                            ))}
                          </div>
                          <div>
                            {items.natal.data.houses[1].pl.map((items, i) => (
                              <div
                                key={i}
                                className="OneOne"
                                dangerouslySetInnerHTML={{ __html: items }}
                              ></div>
                            ))}
                          </div>
                          <div>
                            {items.natal.data.houses[11].pl.map((items, i) => (
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
                            {items.natal.data.houses[4].pl.map((items, i) => (
                              <div
                                key={i}
                                className="OneOne"
                                dangerouslySetInnerHTML={{ __html: items }}
                              ></div>
                            ))}
                          </div>
                          <div>
                            {items.natal.data.houses[10].pl.map((items, i) => (
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
                            {items.natal.data.houses[5].pl.map((items, i) => (
                              <div
                                key={i}
                                className="OneOne"
                                dangerouslySetInnerHTML={{ __html: items }}
                              ></div>
                            ))}
                          </div>
                          <div>
                            {items.natal.data.houses[7].pl.map((items, i) => (
                              <div
                                key={i}
                                className="OneOne"
                                dangerouslySetInnerHTML={{ __html: items }}
                              ></div>
                            ))}
                          </div>
                          <div>
                            {items.natal.data.houses[9].pl.map((items, i) => (
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
                            {items.natal.data.houses[6].pl.map((items, i) => (
                              <div
                                key={i}
                                className="OneOne"
                                dangerouslySetInnerHTML={{ __html: items }}
                              ></div>
                            ))}
                          </div>
                          <div>
                            {items.natal.data.houses[8].pl.map((items, i) => (
                              <div
                                key={i}
                                className="OneOne"
                                dangerouslySetInnerHTML={{ __html: items }}
                              ></div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ):null
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default NotalCommunity;
