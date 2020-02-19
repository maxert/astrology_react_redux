import React from "react";
import { Input, Button } from "semantic-ui-react";
import SelectWeeks from "../addElement/SelectWeeks";
import SelectNew from "../addElement/SelectNew";
import { SvgLoader, SvgProxy } from "react-svgmt";
const formsPosition = () => (
  <form className="planetary_position">
    <div className="text_planetary text_all">
      Положение планет в реальном времени <span>(14.02.2020 16:21:32)</span>
    </div>
    <div className="header_card">
      <div className="select_submit">
        <button className="prev_button"></button>
        <Input className="number" value={1}></Input>
        <SelectWeeks></SelectWeeks>
        <button className="next_button"></button>
      </div>
      <div className="select_new">
        <SelectNew></SelectNew>
      </div>
      <Button className="button_reset">Сбросить</Button>
    </div>
    <div className="image_container">
      <SvgLoader path="./img/sagittarius.svg">
        <SvgProxy selector="#co" />
      </SvgLoader>
    </div>
    <div className="hide_table">
      <SvgLoader path="./img/spreadsheet.svg">
        <SvgProxy selector="#co" />
      </SvgLoader>
      Скрыть таблицу с данными
    </div>
    <div className="table_list active">
      <div className="text_small">Mon 17-02-2020 09:32:44</div>
      <div className="table_grid">
        <div className="table_left">
          <div className="table_head">Планета</div>
          <div className="table_text">Asc</div>
          <div className="table_text">Moon</div>
          <div className="table_text">Rahu</div>
          <div className="table_text">Ketu</div>
          <div className="table_text">Sun</div>
          <div className="table_text">Mercury</div>
          <div className="table_text">Venus</div>
          <div className="table_text">Mars</div>
          <div className="table_text">Jupiter</div>
          <div className="table_text">Saturn</div>
          <div className="table_text">Uranus</div>
          <div className="table_text">Neptune</div>
          <div className="table_text">Pluto</div>
        </div>
        <div className="table_right">
          <div className="table_head">Без айнамши</div>
          <div className="table_text table_row">
            <SvgLoader path="./img/Aquarius 1.svg">
              <SvgProxy selector="#co" />
            </SvgLoader>
            2:22:10
          </div>
          <div className="table_text table_row">
            <SvgLoader path="./img/Aquarius 1.svg">
              <SvgProxy selector="#co" />
            </SvgLoader>
            2:22:10
          </div>
          <div className="table_text table_row">
            <SvgLoader path="./img/Aquarius 1.svg">
              <SvgProxy selector="#co" />
            </SvgLoader>
            2:22:10
          </div>
          <div className="table_text table_row">
            <SvgLoader path="./img/Aquarius 1.svg">
              <SvgProxy selector="#co" />
            </SvgLoader>
            2:22:10
          </div>
          <div className="table_text table_row">
            <SvgLoader path="./img/Aquarius 1.svg">
              <SvgProxy selector="#co" />
            </SvgLoader>
            2:22:10
          </div>
          <div className="table_text table_row">
            <SvgLoader path="./img/Aquarius 1.svg">
              <SvgProxy selector="#co" />
            </SvgLoader>
            2:22:10
          </div>
          <div className="table_text table_row">
            <SvgLoader path="./img/Aquarius 1.svg">
              <SvgProxy selector="#co" />
            </SvgLoader>
            2:22:10
          </div>
          <div className="table_text table_row">
            <SvgLoader path="./img/Aquarius 1.svg">
              <SvgProxy selector="#co" />
            </SvgLoader>
            2:22:10
          </div>
          <div className="table_text table_row">
            <SvgLoader path="./img/Aquarius 1.svg">
              <SvgProxy selector="#co" />
            </SvgLoader>
            2:22:10
          </div>
          <div className="table_text table_row">
            <SvgLoader path="./img/Aquarius 1.svg">
              <SvgProxy selector="#co" />
            </SvgLoader>
            2:22:10
          </div>
          <div className="table_text table_row">
            <SvgLoader path="./img/Aquarius 1.svg">
              <SvgProxy selector="#co" />
            </SvgLoader>
            2:22:10
          </div>
          <div className="table_text table_row">
            <SvgLoader path="./img/Aquarius 1.svg">
              <SvgProxy selector="#co" />
            </SvgLoader>
            2:22:10
          </div>
          <div className="table_text table_row">
            <SvgLoader path="./img/Aquarius 1.svg">
              <SvgProxy selector="#co" />
            </SvgLoader>
            2:22:10
          </div>
        </div>
      </div>
    </div>
  </form>
);

export default formsPosition;
