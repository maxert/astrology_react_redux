import React, { useContext } from "react";
import { ShowContext } from "../context/show/showContext";

//Блок с таблицами
export const TableList = ({ TableData, SelectOptions, DateValue }) => {
  const { display } = useContext(ShowContext);
  if (display.visible) {
    return null;
  }

  return (
    <div className="table_list">
      <div className="text_small">{DateValue}</div>
      {SelectOptions === "0" ? (
        <div className="table_grid table_grid_all">
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
            {Object.keys(TableData).map((key, i) => (
              <div
                className="table_text table_row"
                key={i}
                dangerouslySetInnerHTML={{
                  __html: TableData[key].text,
                }}></div>
            ))}
          </div>

          <div className="table_right">
            <div className="table_head">C айнамши</div>
            {Object.keys(TableData).map((key, i) => (
              <div
                className="table_text table_row"
                key={i}
                dangerouslySetInnerHTML={{
                  __html: TableData[key].text_ay,
                }}></div>
            ))}
          </div>
        </div>
      ) : (
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

          {SelectOptions === "1" ? (
            <div className="table_right">
              <div className="table_head">Без айнамши</div>
              {Object.keys(TableData).map((key, i) => (
                <div
                  className="table_text table_row"
                  key={i}
                  dangerouslySetInnerHTML={{
                    __html: TableData[key].text,
                  }}></div>
              ))}
            </div>
          ) : SelectOptions === "2" ? (
            <div className="table_right">
              <div className="table_head">C айнамши</div>
              {Object.keys(TableData).map((key, i) => (
                <div
                  className="table_text table_row"
                  key={i}
                  dangerouslySetInnerHTML={{
                    __html: TableData[key].text_ay,
                  }}></div>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
