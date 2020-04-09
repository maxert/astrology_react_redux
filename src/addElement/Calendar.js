import { Calendar, Badge } from "antd";
import React, { useContext } from "react";
import moment from "moment";

import { ReduceContext } from "../context/reducerContext";
import { EventContext } from "../context/eventReducer/eventContext";

//Блок большого календаря
function CalendarNew({ NewDefault, onAllChange, ValueSmall, DateSet }) {
  const { none } = useContext(ReduceContext);
  const { sort_data_events } = useContext(EventContext);
  function onPanelChange(date) {
    sort_data_events(
      none.pagination !== 1 ? none.pagination : 1,
      none.sorted,
      moment(date._d).format("YYYY-MM-DD")
    );
  }

  function getListData(value) {
    let listData;

    if (DateSet !== 0) {
      DateSet.map(item =>
        moment(value._d).format("DD.MM.YYYY") === item.event_date
          ? (listData = [
              {
                type: "events",
                content: moment(item.event_date, "DD.MM.YYYY").format("DD")
              }
            ])
          : false
      );
    }
    return listData || [];
  }

  function dateCellRender(value) {
    const listData = getListData(value);

    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <Calendar
      defaultValue={NewDefault}
      value={ValueSmall}
      fullscreen={false}
      dateCellRender={dateCellRender}
      onChange={date => {
        onPanelChange(date);
        onAllChange(date);
      }}
    />
  );
}
export default CalendarNew;
