import React, { useContext, useEffect, useState,  } from "react";
import {
  Input,
  Button,

  Dimmer,
  Loader
} from "semantic-ui-react";
import { SelectWeeks } from "../addElement/SelectWeeks";
import { SelectNew } from "../addElement/SelectNew";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { TableList } from "../addElement/Table";
import { useForm } from "react-hook-form";
import { ShowContext } from "../context/show/showContext";
import { ReduceContext } from "../context/reducerContext";
import { Checkbox as AntCheckbox } from "antd";


//Форма натальной карты на главной странице
export const FormsPosition = () => {
  const [interval, setNumber] = useState(1);
  const [select, setSelect] = useState("0");
  const [int_d, setint_d] = useState(1);
  const [selectData, setselectData] = useState("hour");
  const [refresh, setRefresh] = useState(1);

  const { online_card, none } = useContext(ReduceContext);
  const { hide, display, show } = useContext(ShowContext);
  const { handleSubmit } = useForm();
  const [isPlay, setPlay] = useState(false);
  function onSubmit(values) {
    values["number"] = interval;
    values["type"] = selectData;
    values["int_d"] = int_d;
    values["refresh"] = 0;
    online_card(values.int_d, selectData, interval, values.refresh);
  }
  function selectNew(event, data) {
    setSelect(data.value);
    debugger;
  }
  if (isPlay) {
    online_card(int_d, selectData, interval, refresh);
    debugger;
  }
  function onChangeSelect(event, data) {
    setselectData(data.value);
    debugger;
  }
  useEffect(() => {
    online_card(int_d, selectData, interval, refresh);
  }, [refresh]);
  return (
    <form className="planetary_position" onSubmit={handleSubmit(onSubmit)}>
      <div className="text_planetary text_all">
        Положение планет в реальном времени{" "}
        <span>{none.online_data && none.online_data.in_date}</span>
      </div>

      
      <AntCheckbox
        type="checkbox"
        name="new"
        className="planeta_сheckbox"
        onClick={() =>
          isPlay
            ? (setPlay(false), setRefresh(0))
            : (setPlay(true), setRefresh(0))
        }
      >Непрерывное</AntCheckbox>
      <div className="header_card">
        <div className="select_submit">
          <button className="prev_button" onClick={() => setint_d(-1)}></button>
          <Input
            className="numbers"
            name="text"
            type="number"
            defaultValue={interval}
            onChange={(e, data) =>
              data.value < 0 ? "" : setNumber(data.value)
            }
          />
          <SelectWeeks
            SelectSubmite={(event, data) => onChangeSelect(event, data)}
          ></SelectWeeks>
          <button className="next_button" onClick={() => setint_d(1)}></button>
        </div>
        <div className="select_new">
          <SelectNew
            ChangeSelect={(event, data) => selectNew(event, data)}
          ></SelectNew>
        </div>
        <Button className="button_reset" onClick={() => setRefresh(1)}>
          Сбросить
        </Button>
      </div>

      <div className="image_container">
        <SvgLoader path="../../img/sagittarius.svg">
          <SvgProxy selector="#com" />
        </SvgLoader>

        {none.online_data === undefined ? (
          <Dimmer active={true} inverted>
            <Loader size="massive">Loading</Loader>
          </Dimmer>
        ) : select === "0" ? (
          <div className="none_aynamsha">
            {Object.keys(none.online_data.res_planet).map((key, i) => (
              <div
                className={`${key}`}
                key={i}
                style={{
                  transform: `rotate(${none.online_data.res_planet[key].gradus *
                    -1 +
                    90}deg)`
                }}
              >
                <div>{key}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="aynamsha">
            {Object.keys(none.online_data.res_planet).map((key, i) => (
              <div
                className={`${key}`}
                key={i}
                style={{
                  transform: `rotate(${none.online_data.res_planet[key]
                    .gradus_ay *
                    -1 +
                    90}deg)`
                }}
              >
                <div>{key}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      {console.log(2)}
      <div className="hide_table" onClick={display.visible ? show : hide}>
        <SvgLoader path="./img/spreadsheet.svg">
          <SvgProxy selector="#co" />
        </SvgLoader>
        {display.visible ? (
          <div>Показать таблицу с данными</div>
        ) : (
          <div>Скрыть таблицу с данными</div>
        )}
      </div>
      {none.online_data !== undefined && (
        <TableList
          TableData={none.online_data.res_planet}
          SelectOptions={select}
          DateValue={none.online_data.in_date}
        />
      )}
    </form>
  );
};
