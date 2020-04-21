import React, { useContext, useEffect, useState } from "react";
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
  const { online_card, none } = useContext(ReduceContext);
  const { hide, display, show } = useContext(ShowContext);
  const { handleSubmit, control, setValue } = useForm({
    reValidateMode: onSubmit,
  });

  const [isPlay, setPlay] = useState(false);
  const [isLoadButton, setLoading] = useState(true);
  var widthNone = 0;
  var heightNone = 0;
  var widthAynam = 0;
  var heightAynam = 0;
  function onSubmit(values) {
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    }, 2000);
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

  function RefreshClick() {
    online_card(int_d, selectData, interval, 1);
    setselectData("hour");
    setSelect("0");
    setPlay(false);
    setNumber(1);
    setValue("checkbox", false);
  }
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
            className="planeta_сheckbox">
            Непрерывное
          </AntCheckbox>
        }
        control={control}
        name="checkbox"
        defaultValue={false}
        rules={{
          required: false,
        }}></Controller>
      <div className="header_card">
        <div className="select_submit">
          <Button
            className="prev_button"
            disabled={isLoadButton === true ? false : true}
            onClick={() => {
              setint_d(-1);
            }}></Button>
          <Input
            className="numbers"
            name="text"
            type="number"
            value={interval}
            onChange={(e, data) =>
              data.value < 0 ? "" : setNumber(data.value)
            }
          />
          <SelectWeeks
            ValueWeeeks={selectData}
            DefaultWeeks={"hour"}
            SelectSubmite={(event, data) =>
              onChangeSelect(event, data)
            }></SelectWeeks>
          <Button
            className="next_button"
            disabled={isLoadButton === true ? false : true}
            onClick={() => setint_d(1)}></Button>
        </div>
        <div className="select_new">
          <SelectNew
            ValueNew={select}
            ChangeSelect={(event, data) => selectNew(event, data)}></SelectNew>
        </div>
        <div className="button_reset" onClick={() => RefreshClick()}>
          Сбросить
        </div>
      </div>
      <div className="image_size_container">
        <div className="image_container">
          <SvgLoader path="../../img/sagittarius.svg">
            <SvgProxy selector="#com" />
          </SvgLoader>

          {none.online_data === undefined ? (
            <Dimmer active={true} inverted>
              <Loader size="massive">Загрузка</Loader>
            </Dimmer>
          ) : select === "0" ? (
            <div className="elipse_all">
              <div className="none_aynamsha">
                {Object.keys(none.online_data.res_planet).map((key, i) => (
                  <div
                    className={`${key}`}
                    key={i}
                    style={{
                      width: `${widthNone+=6.1}%`,
                      height: `${heightNone+=6.1}%`,
                      transition: `.5s all`,
                      transform: `rotate(${
                        none.online_data.res_planet[key].gradus * -1
                      }deg)`,
                    }}>
                    <div>{key}</div>
                  </div>
                ))}
              </div>
              <div className="aynamsha">
                {Object.keys(none.online_data.res_planet).map((key, i) => (
                  <div
                    className={`${key}`}
                    key={i}
                    style={{
                      width: `${widthAynam+=6.1}%`,
                      height: `${heightAynam+=6.1}%`,
                      transform: `rotate(${
                        none.online_data.res_planet[key].gradus_ay * -1
                      }deg)`,
                    }}>
                    <div>{key}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : select === "1" ? (
            <div className="none_aynamsha">
              {Object.keys(none.online_data.res_planet).map((key, i) => (
                <div
                  className={`${key}`}
                  key={i}
                  style={{
                    width: `${widthNone+=6.1}%`,
                    height: `${heightNone+=6.1}%`,
                    transition: `.5s all`,
                    transform: `rotate(${
                      none.online_data.res_planet[key].gradus * -1
                    }deg)`,
                  }}>
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
                    width: `${widthAynam+=6.1}%`,
                    height: `${heightAynam+=6.1}%`,
                    transform: `rotate(${
                      none.online_data.res_planet[key].gradus_ay * -1
                    }deg)`,
                  }}>
                  <div>{key}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
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
