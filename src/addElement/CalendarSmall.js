import { Calendar, Badge } from "antd";
import React from "react";
import moment from "moment";

//Блок маленьких календарей
function CalendarSmall({ NewDefault, ValueSet, onPanelChangeSmall, DateSet }) {
  function getListData(value) {
    let listData;

    if (DateSet !== 0) {
      DateSet.map((item) =>
        moment(value._d).format("DD.MM.YYYY") === item.event_date
          ? (listData = [
              {
                type: "events",
                content: moment(item.event_date, "DD.MM.YYYY").format("DD"),
              },
            ])
          : false,
      );
    }
    return listData || [];
  }

  function dateCellRender(value) {
    const listData = getListData(value);

    return (
      <ul className="events">
        {listData.map((item) => (
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
      value={ValueSet}
      fullscreen={false}
      dateCellRender={dateCellRender}
      showToday={false}
      onChange={(date) => {
        onPanelChangeSmall(date);
      }}
    />
  );
}
export default CalendarSmall;
