import React,{useContext} from "react";
import { SvgLoader, SvgProxy } from "react-svgmt";
import {ReduceContext} from "../context/reducerContext"


//Блок с таблицами
export const TableList = () => {


  const { none } = useContext(ReduceContext);
  if (none.visible) {
    return null;
  }
 
  return (
    <div className="table_list">
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
            <SvgLoader path="./img/Aquarius1.svg">
              <SvgProxy selector="#co" />
            </SvgLoader>
            2:22:10
          </div>
          <div className="table_text table_row">
            <SvgLoader path="./img/Aquarius1.svg">
              <SvgProxy selector="#co" />
            </SvgLoader>
            2:22:10
          </div>
          <div className="table_text table_row">
            <SvgLoader path="./img/Aquarius1.svg">
              <SvgProxy selector="#co" />
            </SvgLoader>
            2:22:10
          </div>
          <div className="table_text table_row">
            <SvgLoader path="./img/Aquarius1.svg">
              <SvgProxy selector="#co" />
            </SvgLoader>
            2:22:10
          </div>
          <div className="table_text table_row">
            <SvgLoader path="./img/Aquarius1.svg">
              <SvgProxy selector="#co" />
            </SvgLoader>
            2:22:10
          </div>
          <div className="table_text table_row">
            <SvgLoader path="./img/Aquarius1.svg">
              <SvgProxy selector="#co" />
            </SvgLoader>
            2:22:10
          </div>
          <div className="table_text table_row">
            <SvgLoader path="./img/Aquarius1.svg">
              <SvgProxy selector="#co" />
            </SvgLoader>
            2:22:10
          </div>
          <div className="table_text table_row">
            <SvgLoader path="./img/Aquarius1.svg">
              <SvgProxy selector="#co" />
            </SvgLoader>
            2:22:10
          </div>
          <div className="table_text table_row">
            <SvgLoader path="./img/Aquarius1.svg">
              <SvgProxy selector="#co" />
            </SvgLoader>
            2:22:10
          </div>
          <div className="table_text table_row">
            <SvgLoader path="./img/Aquarius1.svg">
              <SvgProxy selector="#co" />
            </SvgLoader>
            2:22:10
          </div>
          <div className="table_text table_row">
            <SvgLoader path="./img/Aquarius1.svg">
              <SvgProxy selector="#co" />
            </SvgLoader>
            2:22:10
          </div>
          <div className="table_text table_row">
            <SvgLoader path="./img/Aquarius1.svg">
              <SvgProxy selector="#co" />
            </SvgLoader>
            2:22:10
          </div>
          <div className="table_text table_row">
            <SvgLoader path="./img/Aquarius1.svg">
              <SvgProxy selector="#co" />
            </SvgLoader>
            2:22:10
          </div>
        </div>
      </div>
    </div>
  );
};
