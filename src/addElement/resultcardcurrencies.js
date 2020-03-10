import React, { useContext } from "react";
import EditDrop from "../addElement/editDropDown";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { SelectNew } from "../addElement/SelectNew";
import CreateNote from "./createNote";
import NoteList from "./NoteList";
import { ReduceContext } from "../context/reducerContext";
import { SelectCurrentry } from "./SelectCurrentry";


//Блок скрытой натальной карты валюты
function NotalCommunity() {
  const { none } = useContext(ReduceContext);
  if (!none.visible) {
    return null;
  }
  return (
    <div className="element_continer">
      <div className="notal_card_community">
        <div className="notal_card_head">
          <div className="text_big_all">Натальная карта гривны </div>
          <div className="select_currentry">
            Сравнить натальную карту с другой валютой:
            <SelectCurrentry></SelectCurrentry>
          </div>
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
                <SvgLoader path="../img/Group5.svg">
                  <SvgProxy selector="#co" />
                </SvgLoader>
              </div>
            </div>
            <div className="notal_table_persons">
              <div className="d_flex_center image_notal notalPersons_left">
                <SvgLoader path="../img/Натальная карта.svg">
                  <SvgProxy selector="#co" />
                </SvgLoader>
                <div className="block_numbers">
                  <div className="one">1</div>
                  <div className="two">2</div>
                  <div className="three">3</div>
                  <div className="four">4</div>
                  <div className="five">5</div>
                  <div className="six">6</div>
                  <div className="seven">7</div>
                  <div className="eight">8</div>
                  <div className="nine">9</div>
                  <div className="ten">10</div>
                  <div className="eleven">11</div>
                  <div className="Twelve">12</div>
                </div>
                <div className="block_info">
                  <div className="OneOne">
                    <span>Asc</span> - Стр. 11:46:48
                  </div>
                  <div className="OneTwo">
                    <span>Asc</span> - Стр. 11:46:48
                  </div>
                  <div className="OneThree">
                    <span>Asc</span> - Стр. 11:46:48
                  </div>
                  <div className="TwoOne">
                    <span>Ur</span> - Коз. 09:50:33
                  </div>
                  <div className="TwoTwo">
                    <span>Ne</span> - Коз. 13:59:40 R
                  </div>
                  <div className="TwoThree">
                    <span>Ne</span> - Коз. 13:59:40 R
                  </div>
                  <div className="ThreeOne">
                    <span>Ur</span> - Коз. 00:16:57
                  </div>
                  <div className="ThreeTwo">
                    <span>Sa</span> - Вод. 00:16:57
                  </div>
                  <div className="ThreeThree">
                    <span>Sa</span> - Коз. 00:16:57
                  </div>
                  <div className="FourOne">
                    <span>Ur</span> - Коз. 00:16:57
                  </div>
                  <div className="FourTwo">
                    <span>Sa</span> - Вод. 00:16:57
                  </div>
                  <div className="FourThree">
                    <span>Sa</span> - Коз. 00:16:57
                  </div>
                  <div className="FiveOne">
                    <span>Ur</span> - Коз. 00:16:57
                  </div>
                  <div className="FiveTwo">
                    <span>Sa</span> - Вод. 00:16:57
                  </div>
                  <div className="FiveThree">
                    <span>Sa</span> - Коз. 00:16:57
                  </div>
                  <div className="SixOne">
                    <span>Ur</span> - Коз. 00:16:57
                  </div>
                  <div className="SixTwo">
                    <span>Sa</span> - Вод. 00:16:57
                  </div>
                  <div className="SixThree">
                    <span>Sa</span> - Коз. 00:16:57
                  </div>
                  <div className="SevenOne">
                    <span>Ur</span> - Коз. 00:16:57
                  </div>
                  <div className="SevenTwo">
                    <span>Sa</span> - Вод. 00:16:57
                  </div>
                  <div className="SevenThree">
                    <span>Sa</span> - Коз. 00:16:57
                  </div>
                  <div className="EightOne">
                    <span>Ur</span> - Коз. 00:16:57
                  </div>
                  <div className="EightTwo">
                    <span>Sa</span> - Вод. 00:16:57
                  </div>
                  <div className="EightThree">
                    <span>Sa</span> - Коз. 00:16:57
                  </div>
                  <div className="NineOne">
                    <span>Ur</span> - Коз. 00:16:57
                  </div>
                  <div className="NineTwo">
                    <span>Sa</span> - Вод. 00:16:57
                  </div>
                  <div className="NineThree">
                    <span>Sa</span> - Коз. 00:16:57
                  </div>
                  <div className="TenOne">
                    <span>Ur</span> - Коз. 00:16:57
                  </div>
                  <div className="TenTwo">
                    <span>Sa</span> - Вод. 00:16:57
                  </div>
                  <div className="TenThree">
                    <span>Sa</span> - Коз. 00:16:57
                  </div>
                  <div className="ElevenOne">
                    <span>Ur</span> - Коз. 00:16:57
                  </div>
                  <div className="ElevenTwo">
                    <span>Sa</span> - Вод. 00:16:57
                  </div>
                  <div className="ElevenThree">
                    <span>Sa</span> - Коз. 00:16:57
                  </div>
                  <div className="TwelveOne">
                    <span>Ur</span> - Коз. 00:16:57
                  </div>
                  <div className="TwelveTwo">
                    <span>Sa</span> - Вод. 00:16:57
                  </div>
                  <div className="TwelveThree">
                    <span>Sa</span> - Коз. 00:16:57
                  </div>
                </div>
              </div>
              <div className="notalPersons_right">
                <div className="container_info_persons_name">
                  Вимшотари Даша
                </div>
                <div className="table_persons_overflow">
                  <div className="table_persons">
                    <div className="table_persons_left">
                      <div className="table_persons_left_text">Ke-Ke-Ke</div>
                      <div className="table_persons_left_text">Ke-Ke-Ve</div>
                      <div className="table_persons_left_text">Ke-Ke-Su</div>
                      <div className="table_persons_left_text">Ke-Ke-Mo</div>
                      <div className="table_persons_left_text">Ke-Ke-Ma</div>
                      <div className="table_persons_left_text">Ke-Ke-Ra</div>
                      <div className="table_persons_left_text">Ke-Ke-Ke</div>
                      <div className="table_persons_left_text">Ke-Ke-Ve</div>
                      <div className="table_persons_left_text">Ke-Ke-Su</div>
                      <div className="table_persons_left_text">Ke-Ke-Mo</div>
                      <div className="table_persons_left_text">Ke-Ke-Ma</div>
                      <div className="table_persons_left_text">Ke-Ke-Ra</div>
                    </div>
                    <div className="table_persons_right">
                      <div className="table_persons_date">
                        Tue 31-05-1988 07:57
                      </div>
                      <div className="table_persons_date">
                        Thu 09-06-1988 00:45
                      </div>
                      <div className="table_persons_date">
                        Sun 03-07-1988 21:19
                      </div>
                      <div className="table_persons_date">
                        Mon 11-07-1988 08:18
                      </div>
                      <div className="table_persons_date">
                        Sat 23-07-1988 18:35
                      </div>
                      <div className="table_persons_date">
                        Mon 01-08-1988 11:23
                      </div>
                      <div className="table_persons_date">
                        Tue 31-05-1988 07:57
                      </div>
                      <div className="table_persons_date">
                        Thu 09-06-1988 00:45
                      </div>
                      <div className="table_persons_date">
                        Sun 03-07-1988 21:19
                      </div>
                      <div className="table_persons_date">
                        Mon 11-07-1988 08:18
                      </div>
                      <div className="table_persons_date">
                        Sat 23-07-1988 18:35
                      </div>
                      <div className="table_persons_date">
                        Mon 01-08-1988 11:23
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="notalPersons_bottom">
                <div className="table_planets">
                  <div className="header_table">
                    <div className="table_text table_text_small">Планета</div>
                    <div className="table_text">Asc</div>
                    <div className="table_text">Mo</div>
                    <div className="table_text">Солнце</div>
                    <div className="table_text">Меркурий</div>
                    <div className="table_text">Венера</div>
                    <div className="table_text">Марс</div>
                    <div className="table_text">Юпитер</div>
                    <div className="table_text">Сатурн</div>
                    <div className="table_text">Уран</div>
                    <div className="table_text">Нептун</div>
                    <div className="table_text">Плутон</div>
                  </div>
                  <div className="footer_table">
                    <div className="table_text table_text_small">Эклиптика</div>
                    <div className="table_text">
                      <div className="center_table">
                        <SvgLoader path="../img/Aquarius1.svg">
                          <SvgProxy selector="#co" />
                        </SvgLoader>
                        <div className="table_text_time">2:22:10</div>
                      </div>
                    </div>
                    <div className="table_text">
                      <div className="center_table">
                        <SvgLoader path="../img/Aquarius1.svg">
                          <SvgProxy selector="#co" />
                        </SvgLoader>
                        <div className="table_text_time">2:22:10</div>
                      </div>
                    </div>
                    <div className="table_text">
                      <div className="center_table">
                        <SvgLoader path="../img/Aquarius1.svg">
                          <SvgProxy selector="#co" />
                        </SvgLoader>
                        <div className="table_text_time">2:22:10</div>
                      </div>
                    </div>
                    <div className="table_text">
                      <div className="center_table">
                        <SvgLoader path="../img/Aquarius1.svg">
                          <SvgProxy selector="#co" />
                        </SvgLoader>
                        <div className="table_text_time">2:22:10</div>
                      </div>
                    </div>
                    <div className="table_text">
                      <div className="center_table">
                        <SvgLoader path="../img/Aquarius1.svg">
                          <SvgProxy selector="#co" />
                        </SvgLoader>
                        <div className="table_text_time">2:22:10</div>
                      </div>
                    </div>
                    <div className="table_text">
                      <div className="center_table">
                        <SvgLoader path="../img/Aquarius1.svg">
                          <SvgProxy selector="#co" />
                        </SvgLoader>
                        <div className="table_text_time">2:22:10</div>
                      </div>
                    </div>
                    <div className="table_text">
                      <div className="center_table">
                        <SvgLoader path="../img/Aquarius1.svg">
                          <SvgProxy selector="#co" />
                        </SvgLoader>
                        <div className="table_text_time">2:22:10</div>
                      </div>
                    </div>
                    <div className="table_text">
                      <div className="center_table">
                        <SvgLoader path="../img/Aquarius1.svg">
                          <SvgProxy selector="#co" />
                        </SvgLoader>
                        <div className="table_text_time">2:22:10</div>
                      </div>
                    </div>
                    <div className="table_text">
                      <div className="center_table">
                        <SvgLoader path="../img/Aquarius1.svg">
                          <SvgProxy selector="#co" />
                        </SvgLoader>
                        <div className="table_text_time">2:22:10</div>
                      </div>
                    </div>
                    <div className="table_text">
                      <div className="center_table">
                        <SvgLoader path="../img/Aquarius1.svg">
                          <SvgProxy selector="#co" />
                        </SvgLoader>
                        <div className="table_text_time">2:22:10</div>
                      </div>
                    </div>
                    <div className="table_text">
                      <div className="center_table">
                        <SvgLoader path="../img/Aquarius1.svg">
                          <SvgProxy selector="#co" />
                        </SvgLoader>
                        <div className="table_text_time">2:22:10</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container_comprasion">
              <div className="container_comprasion_left">
                <div className="text_all">Натальная карта Гривны</div>
                <div className="d_flex_center image_notal notalPersons_left">
                <SvgLoader path="../img/Натальная карта.svg">
                  <SvgProxy selector="#co" />
                </SvgLoader>
                <div className="block_numbers">
                  <div className="one">1</div>
                  <div className="two">2</div>
                  <div className="three">3</div>
                  <div className="four">4</div>
                  <div className="five">5</div>
                  <div className="six">6</div>
                  <div className="seven">7</div>
                  <div className="eight">8</div>
                  <div className="nine">9</div>
                  <div className="ten">10</div>
                  <div className="eleven">11</div>
                  <div className="Twelve">12</div>
                </div>
                <div className="block_info">
                  <div className="OneOne">
                    <span>Asc</span> - Стр. 11:46:48
                  </div>
                  <div className="OneTwo">
                    <span>Asc</span> - Стр. 11:46:48
                  </div>
                  <div className="OneThree">
                    <span>Asc</span> - Стр. 11:46:48
                  </div>
                  <div className="TwoOne">
                    <span>Ur</span> - Коз. 09:50:33
                  </div>
                  <div className="TwoTwo">
                    <span>Ne</span> - Коз. 13:59:40 R
                  </div>
                  <div className="TwoThree">
                    <span>Ne</span> - Коз. 13:59:40 R
                  </div>
                  <div className="ThreeOne">
                    <span>Ur</span> - Коз. 00:16:57
                  </div>
                  <div className="ThreeTwo">
                    <span>Sa</span> - Вод. 00:16:57
                  </div>
                  <div className="ThreeThree">
                    <span>Sa</span> - Коз. 00:16:57
                  </div>
                  <div className="FourOne">
                    <span>Ur</span> - Коз. 00:16:57
                  </div>
                  <div className="FourTwo">
                    <span>Sa</span> - Вод. 00:16:57
                  </div>
                  <div className="FourThree">
                    <span>Sa</span> - Коз. 00:16:57
                  </div>
                  <div className="FiveOne">
                    <span>Ur</span> - Коз. 00:16:57
                  </div>
                  <div className="FiveTwo">
                    <span>Sa</span> - Вод. 00:16:57
                  </div>
                  <div className="FiveThree">
                    <span>Sa</span> - Коз. 00:16:57
                  </div>
                  <div className="SixOne">
                    <span>Ur</span> - Коз. 00:16:57
                  </div>
                  <div className="SixTwo">
                    <span>Sa</span> - Вод. 00:16:57
                  </div>
                  <div className="SixThree">
                    <span>Sa</span> - Коз. 00:16:57
                  </div>
                  <div className="SevenOne">
                    <span>Ur</span> - Коз. 00:16:57
                  </div>
                  <div className="SevenTwo">
                    <span>Sa</span> - Вод. 00:16:57
                  </div>
                  <div className="SevenThree">
                    <span>Sa</span> - Коз. 00:16:57
                  </div>
                  <div className="EightOne">
                    <span>Ur</span> - Коз. 00:16:57
                  </div>
                  <div className="EightTwo">
                    <span>Sa</span> - Вод. 00:16:57
                  </div>
                  <div className="EightThree">
                    <span>Sa</span> - Коз. 00:16:57
                  </div>
                  <div className="NineOne">
                    <span>Ur</span> - Коз. 00:16:57
                  </div>
                  <div className="NineTwo">
                    <span>Sa</span> - Вод. 00:16:57
                  </div>
                  <div className="NineThree">
                    <span>Sa</span> - Коз. 00:16:57
                  </div>
                  <div className="TenOne">
                    <span>Ur</span> - Коз. 00:16:57
                  </div>
                  <div className="TenTwo">
                    <span>Sa</span> - Вод. 00:16:57
                  </div>
                  <div className="TenThree">
                    <span>Sa</span> - Коз. 00:16:57
                  </div>
                  <div className="ElevenOne">
                    <span>Ur</span> - Коз. 00:16:57
                  </div>
                  <div className="ElevenTwo">
                    <span>Sa</span> - Вод. 00:16:57
                  </div>
                  <div className="ElevenThree">
                    <span>Sa</span> - Коз. 00:16:57
                  </div>
                  <div className="TwelveOne">
                    <span>Ur</span> - Коз. 00:16:57
                  </div>
                  <div className="TwelveTwo">
                    <span>Sa</span> - Вод. 00:16:57
                  </div>
                  <div className="TwelveThree">
                    <span>Sa</span> - Коз. 00:16:57
                  </div>
                </div>
              </div>
                <div className="notalPersons_bottom">
                  <div className="table_planets">
                    <div className="header_table">
                      <div className="table_text table_text_small">Планета</div>
                      <div className="table_text">Asc</div>
                      <div className="table_text">Mo</div>
                      <div className="table_text">Солнце</div>
                      <div className="table_text">Меркурий</div>
                      <div className="table_text">Венера</div>
                      <div className="table_text">Марс</div>
                      <div className="table_text">Юпитер</div>
                      <div className="table_text">Сатурн</div>
                      <div className="table_text">Уран</div>
                      <div className="table_text">Нептун</div>
                      <div className="table_text">Плутон</div>
                    </div>
                    <div className="footer_table">
                      <div className="table_text table_text_small">
                        Эклиптика
                      </div>
                      <div className="table_text">
                        <div className="center_table">
                          <SvgLoader path="../img/Aquarius1.svg">
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                          <div className="table_text_time">2:22:10</div>
                        </div>
                      </div>
                      <div className="table_text">
                        <div className="center_table">
                          <SvgLoader path="../img/Aquarius1.svg">
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                          <div className="table_text_time">2:22:10</div>
                        </div>
                      </div>
                      <div className="table_text">
                        <div className="center_table">
                          <SvgLoader path="../img/Aquarius1.svg">
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                          <div className="table_text_time">2:22:10</div>
                        </div>
                      </div>
                      <div className="table_text">
                        <div className="center_table">
                          <SvgLoader path="../img/Aquarius1.svg">
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                          <div className="table_text_time">2:22:10</div>
                        </div>
                      </div>
                      <div className="table_text">
                        <div className="center_table">
                          <SvgLoader path="../img/Aquarius1.svg">
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                          <div className="table_text_time">2:22:10</div>
                        </div>
                      </div>
                      <div className="table_text">
                        <div className="center_table">
                          <SvgLoader path="../img/Aquarius1.svg">
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                          <div className="table_text_time">2:22:10</div>
                        </div>
                      </div>
                      <div className="table_text">
                        <div className="center_table">
                          <SvgLoader path="../img/Aquarius1.svg">
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                          <div className="table_text_time">2:22:10</div>
                        </div>
                      </div>
                      <div className="table_text">
                        <div className="center_table">
                          <SvgLoader path="../img/Aquarius1.svg">
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                          <div className="table_text_time">2:22:10</div>
                        </div>
                      </div>
                      <div className="table_text">
                        <div className="center_table">
                          <SvgLoader path="../img/Aquarius1.svg">
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                          <div className="table_text_time">2:22:10</div>
                        </div>
                      </div>
                      <div className="table_text">
                        <div className="center_table">
                          <SvgLoader path="../img/Aquarius1.svg">
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                          <div className="table_text_time">2:22:10</div>
                        </div>
                      </div>
                      <div className="table_text">
                        <div className="center_table">
                          <SvgLoader path="../img/Aquarius1.svg">
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                          <div className="table_text_time">2:22:10</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="notalPersons_right">
                    <div className="container_info_persons_name">
                      Вимшотари Даша
                    </div>
                    <div className="table_persons_overflow">
                      <div className="table_persons">
                        <div className="table_persons_left">
                          <div className="table_persons_left_text">
                            Ke-Ke-Ke
                          </div>
                          <div className="table_persons_left_text">
                            Ke-Ke-Ve
                          </div>
                          <div className="table_persons_left_text">
                            Ke-Ke-Su
                          </div>
                          <div className="table_persons_left_text">
                            Ke-Ke-Mo
                          </div>
                          <div className="table_persons_left_text">
                            Ke-Ke-Ma
                          </div>
                          <div className="table_persons_left_text">
                            Ke-Ke-Ra
                          </div>
                          <div className="table_persons_left_text">
                            Ke-Ke-Ke
                          </div>
                          <div className="table_persons_left_text">
                            Ke-Ke-Ve
                          </div>
                          <div className="table_persons_left_text">
                            Ke-Ke-Su
                          </div>
                          <div className="table_persons_left_text">
                            Ke-Ke-Mo
                          </div>
                          <div className="table_persons_left_text">
                            Ke-Ke-Ma
                          </div>
                          <div className="table_persons_left_text">
                            Ke-Ke-Ra
                          </div>
                        </div>
                        <div className="table_persons_right">
                          <div className="table_persons_date">
                            Tue 31-05-1988 07:57
                          </div>
                          <div className="table_persons_date">
                            Thu 09-06-1988 00:45
                          </div>
                          <div className="table_persons_date">
                            Sun 03-07-1988 21:19
                          </div>
                          <div className="table_persons_date">
                            Mon 11-07-1988 08:18
                          </div>
                          <div className="table_persons_date">
                            Sat 23-07-1988 18:35
                          </div>
                          <div className="table_persons_date">
                            Mon 01-08-1988 11:23
                          </div>
                          <div className="table_persons_date">
                            Tue 31-05-1988 07:57
                          </div>
                          <div className="table_persons_date">
                            Thu 09-06-1988 00:45
                          </div>
                          <div className="table_persons_date">
                            Sun 03-07-1988 21:19
                          </div>
                          <div className="table_persons_date">
                            Mon 11-07-1988 08:18
                          </div>
                          <div className="table_persons_date">
                            Sat 23-07-1988 18:35
                          </div>
                          <div className="table_persons_date">
                            Mon 01-08-1988 11:23
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container_comprasion_right">
                <div className="text_all">
                  Натальная карта Английский фунт стерлингов
                </div>
                <div className="d_flex_center image_notal notalPersons_left">
                  <SvgLoader path="../img/Натальная карта.svg">
                    <SvgProxy selector="#co" />
                  </SvgLoader>

                  <div className="block_info">
                    <div className="OneOne">
                      <span>Asc</span> - Стр. 11:46:48
                    </div>
                    <div className="OneTwo">
                      <span>Asc</span> - Стр. 11:46:48
                    </div>
                    <div className="OneThree">
                      <span>Asc</span> - Стр. 11:46:48
                    </div>
                    <div className="TwoOne">
                      <span>Ur</span> - Коз. 09:50:33
                    </div>
                    <div className="TwoTwo">
                      <span>Ne</span> - Коз. 13:59:40 R
                    </div>
                    <div className="TwoThree">
                      <span>Ne</span> - Коз. 13:59:40 R
                    </div>
                    <div className="ThreeOne">
                      <span>Ur</span> - Коз. 00:16:57
                    </div>
                    <div className="ThreeTwo">
                      <span>Sa</span> - Вод. 00:16:57
                    </div>
                    <div className="ThreeThree">
                      <span>Sa</span> - Коз. 00:16:57
                    </div>
                    <div className="FourOne">
                      <span>Ur</span> - Коз. 00:16:57
                    </div>
                    <div className="FourTwo">
                      <span>Sa</span> - Вод. 00:16:57
                    </div>
                    <div className="FourThree">
                      <span>Sa</span> - Коз. 00:16:57
                    </div>
                    <div className="FiveOne">
                      <span>Ur</span> - Коз. 00:16:57
                    </div>
                    <div className="FiveTwo">
                      <span>Sa</span> - Вод. 00:16:57
                    </div>
                    <div className="FiveThree">
                      <span>Sa</span> - Коз. 00:16:57
                    </div>
                    <div className="SixOne">
                      <span>Ur</span> - Коз. 00:16:57
                    </div>
                    <div className="SixTwo">
                      <span>Sa</span> - Вод. 00:16:57
                    </div>
                    <div className="SixThree">
                      <span>Sa</span> - Коз. 00:16:57
                    </div>
                    <div className="SevenOne">
                      <span>Ur</span> - Коз. 00:16:57
                    </div>
                    <div className="SevenTwo">
                      <span>Sa</span> - Вод. 00:16:57
                    </div>
                    <div className="SevenThree">
                      <span>Sa</span> - Коз. 00:16:57
                    </div>
                    <div className="EightOne">
                      <span>Ur</span> - Коз. 00:16:57
                    </div>
                    <div className="EightTwo">
                      <span>Sa</span> - Вод. 00:16:57
                    </div>
                    <div className="EightThree">
                      <span>Sa</span> - Коз. 00:16:57
                    </div>
                    <div className="NineOne">
                      <span>Ur</span> - Коз. 00:16:57
                    </div>
                    <div className="NineTwo">
                      <span>Sa</span> - Вод. 00:16:57
                    </div>
                    <div className="NineThree">
                      <span>Sa</span> - Коз. 00:16:57
                    </div>
                    <div className="TenOne">
                      <span>Ur</span> - Коз. 00:16:57
                    </div>
                    <div className="TenTwo">
                      <span>Sa</span> - Вод. 00:16:57
                    </div>
                    <div className="TenThree">
                      <span>Sa</span> - Коз. 00:16:57
                    </div>
                    <div className="ElevenOne">
                      <span>Ur</span> - Коз. 00:16:57
                    </div>
                    <div className="ElevenTwo">
                      <span>Sa</span> - Вод. 00:16:57
                    </div>
                    <div className="ElevenThree">
                      <span>Sa</span> - Коз. 00:16:57
                    </div>
                    <div className="TwelveOne">
                      <span>Ur</span> - Коз. 00:16:57
                    </div>
                    <div className="TwelveTwo">
                      <span>Sa</span> - Вод. 00:16:57
                    </div>
                    <div className="TwelveThree">
                      <span>Sa</span> - Коз. 00:16:57
                    </div>
                  </div>
                </div>
                <div className="notalPersons_bottom">
                  <div className="table_planets">
                    <div className="header_table">
                      <div className="table_text table_text_small">Планета</div>
                      <div className="table_text">Asc</div>
                      <div className="table_text">Mo</div>
                      <div className="table_text">Солнце</div>
                      <div className="table_text">Меркурий</div>
                      <div className="table_text">Венера</div>
                      <div className="table_text">Марс</div>
                      <div className="table_text">Юпитер</div>
                      <div className="table_text">Сатурн</div>
                      <div className="table_text">Уран</div>
                      <div className="table_text">Нептун</div>
                      <div className="table_text">Плутон</div>
                    </div>
                    <div className="footer_table">
                      <div className="table_text table_text_small">
                        Эклиптика
                      </div>
                      <div className="table_text">
                        <div className="center_table">
                          <SvgLoader path="../img/Aquarius1.svg">
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                          <div className="table_text_time">2:22:10</div>
                        </div>
                      </div>
                      <div className="table_text">
                        <div className="center_table">
                          <SvgLoader path="../img/Aquarius1.svg">
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                          <div className="table_text_time">2:22:10</div>
                        </div>
                      </div>
                      <div className="table_text">
                        <div className="center_table">
                          <SvgLoader path="../img/Aquarius1.svg">
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                          <div className="table_text_time">2:22:10</div>
                        </div>
                      </div>
                      <div className="table_text">
                        <div className="center_table">
                          <SvgLoader path="../img/Aquarius1.svg">
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                          <div className="table_text_time">2:22:10</div>
                        </div>
                      </div>
                      <div className="table_text">
                        <div className="center_table">
                          <SvgLoader path="../img/Aquarius1.svg">
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                          <div className="table_text_time">2:22:10</div>
                        </div>
                      </div>
                      <div className="table_text">
                        <div className="center_table">
                          <SvgLoader path="../img/Aquarius1.svg">
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                          <div className="table_text_time">2:22:10</div>
                        </div>
                      </div>
                      <div className="table_text">
                        <div className="center_table">
                          <SvgLoader path="../img/Aquarius1.svg">
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                          <div className="table_text_time">2:22:10</div>
                        </div>
                      </div>
                      <div className="table_text">
                        <div className="center_table">
                          <SvgLoader path="../img/Aquarius1.svg">
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                          <div className="table_text_time">2:22:10</div>
                        </div>
                      </div>
                      <div className="table_text">
                        <div className="center_table">
                          <SvgLoader path="../img/Aquarius1.svg">
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                          <div className="table_text_time">2:22:10</div>
                        </div>
                      </div>
                      <div className="table_text">
                        <div className="center_table">
                          <SvgLoader path="../img/Aquarius1.svg">
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                          <div className="table_text_time">2:22:10</div>
                        </div>
                      </div>
                      <div className="table_text">
                        <div className="center_table">
                          <SvgLoader path="../img/Aquarius1.svg">
                            <SvgProxy selector="#co" />
                          </SvgLoader>
                          <div className="table_text_time">2:22:10</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="notalPersons_right">
                    <div className="container_info_persons_name">
                      Вимшотари Даша
                    </div>
                    <div className="table_persons_overflow">
                      <div className="table_persons">
                        <div className="table_persons_left">
                          <div className="table_persons_left_text">
                            Ke-Ke-Ke
                          </div>
                          <div className="table_persons_left_text">
                            Ke-Ke-Ve
                          </div>
                          <div className="table_persons_left_text">
                            Ke-Ke-Su
                          </div>
                          <div className="table_persons_left_text">
                            Ke-Ke-Mo
                          </div>
                          <div className="table_persons_left_text">
                            Ke-Ke-Ma
                          </div>
                          <div className="table_persons_left_text">
                            Ke-Ke-Ra
                          </div>
                          <div className="table_persons_left_text">
                            Ke-Ke-Ke
                          </div>
                          <div className="table_persons_left_text">
                            Ke-Ke-Ve
                          </div>
                          <div className="table_persons_left_text">
                            Ke-Ke-Su
                          </div>
                          <div className="table_persons_left_text">
                            Ke-Ke-Mo
                          </div>
                          <div className="table_persons_left_text">
                            Ke-Ke-Ma
                          </div>
                          <div className="table_persons_left_text">
                            Ke-Ke-Ra
                          </div>
                        </div>
                        <div className="table_persons_right">
                          <div className="table_persons_date">
                            Tue 31-05-1988 07:57
                          </div>
                          <div className="table_persons_date">
                            Thu 09-06-1988 00:45
                          </div>
                          <div className="table_persons_date">
                            Sun 03-07-1988 21:19
                          </div>
                          <div className="table_persons_date">
                            Mon 11-07-1988 08:18
                          </div>
                          <div className="table_persons_date">
                            Sat 23-07-1988 18:35
                          </div>
                          <div className="table_persons_date">
                            Mon 01-08-1988 11:23
                          </div>
                          <div className="table_persons_date">
                            Tue 31-05-1988 07:57
                          </div>
                          <div className="table_persons_date">
                            Thu 09-06-1988 00:45
                          </div>
                          <div className="table_persons_date">
                            Sun 03-07-1988 21:19
                          </div>
                          <div className="table_persons_date">
                            Mon 11-07-1988 08:18
                          </div>
                          <div className="table_persons_date">
                            Sat 23-07-1988 18:35
                          </div>
                          <div className="table_persons_date">
                            Mon 01-08-1988 11:23
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
export default NotalCommunity;
