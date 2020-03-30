import React, { useContext, useEffect, useState, useRef } from "react";
import { Input, Button, Dimmer, Loader } from "semantic-ui-react";
import { SelectWeeks } from "../addElement/SelectWeeks";
import { SelectNew } from "../addElement/SelectNew";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { TableList } from "../addElement/Table";
import { useForm, Controller } from "react-hook-form";
import { ShowContext } from "../context/show/showContext";
import { ReduceContext } from "../context/reducerContext";
import { Checkbox as AntCheckbox } from "antd";

//Форма натальной карты на главной странице
export const FormsPosition = () => {
  const [interval, setNumber] = useState(1);
  const [select, setSelect] = useState("0");
  const [int_d, setint_d] = useState(1);
  const [selectData, setselectData] = useState("hour");
  const { online_card, none,isLoading } = useContext(ReduceContext);
  const { hide, display, show } = useContext(ShowContext);
  const { handleSubmit, control } = useForm({
    reValidateMode: onSubmit
  });
  
  const [isPlay, setPlay] = useState(false);
  function onSubmit(values) {
    values["number"] = interval;
    values["type"] = selectData;
    values["int_d"] = int_d;
    online_card(values.int_d, values.type, values.number, 0);
  }
  function selectNew(event, data) {
    setSelect(data.value);
  }
  function onChangeSelect(event, data) {
    setselectData(data.value);
  }

  if (isPlay) {
    online_card(int_d, selectData, interval, 0);
  }
  useEffect(() => {
    online_card(int_d, selectData, interval, 1);
  }, []);

  return (
    <form className="planetary_position" onSubmit={handleSubmit(onSubmit)}>
      <div className="text_planetary text_all">
        Положение планет в реальном времени
        <span>{none.online_data && none.online_data.in_date + " GMT 0"}</span>
      </div>

      <Controller
        as={
          <AntCheckbox
            onClick={() => (isPlay ? setPlay(false) : setPlay(true))}
            className="planeta_сheckbox"
          >
            Непрерывное
          </AntCheckbox>
        }
        control={control}
        name="checkbox"
        defaultValue={false}
        rules={{
          required: false
        }}
      ></Controller>
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
          <button className="next_button" onClick={() => {setint_d(1)}}></button>
        </div>
        <div className="select_new">
          <SelectNew
            ChangeSelect={(event, data) => selectNew(event, data)}
          ></SelectNew>
        </div>
        <div
          className="button_reset"
          onClick={() => online_card(int_d, selectData, interval, 1)}
        >
          Сбросить
        </div>
      </div>

      <div className="image_container">
        <SvgLoader path="../../img/sagittarius.svg">
          <SvgProxy selector="#com" />
        </SvgLoader>

        {none.online_data === undefined ? (
          <Dimmer active={true} inverted>
            <Loader size="massive">Загрузка</Loader>
          </Dimmer>
        ) : select === "0" ? (
          <div className="none_aynamsha">
            {Object.keys(none.online_data.res_planet).map((key, i) => (
              <div
                className={`${key}`}
                key={i}
                style={{
                  transition: `.5s all`,
                  transform: `rotate(${none.online_data.res_planet[key].gradus *
                    -1}deg)`
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
                    .gradus_ay * -1}deg)`
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
