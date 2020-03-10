import React, { useContext } from "react";
import { Input, Button } from "semantic-ui-react";
import { SelectWeeks } from "../addElement/SelectWeeks";
import { SelectNew } from "../addElement/SelectNew";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { TableList } from "../addElement/Table";
import { ReduceContext } from "../context/reducerContext";


//Форма натальной карты на главной странице
export const FormsPosition = () => {
  const { hide, none, show } = useContext(ReduceContext);

  return (
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
      <div className="hide_table" onClick={none.visible ? show : hide}>
        <SvgLoader path="./img/spreadsheet.svg">
          <SvgProxy selector="#co" />
        </SvgLoader>
        {none.visible ? (
          <div>Показать таблицу с данными</div>
        ) : (
          <div>Скрыть таблицу с данными</div>
        )}
      </div>
      <TableList />
    </form>
  );
};
