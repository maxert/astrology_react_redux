import { Calendar, Badge } from "antd";
import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import Axios from "axios";
import { ReduceContext } from "../context/reducerContext";
import { EventContext } from "../context/eventReducer/eventContext";

function CalendarNew({NewDefault,onAllChange,ValueSmall}) {
  const { none } = useContext(ReduceContext);
  const { sort_data_events } = useContext(EventContext);
  function onPanelChange(date) {
    sort_data_events(
      none.pagination !== 1 ? none.pagination : 1,
      none.sorted,
      moment(date._d).format("YYYY-MM-DD")
    );
  }
  const [date, setDate] = useState(0);
  useEffect(() => {
    Axios.get("http://1690550.masgroup.web.hosting-test.net/api/eventdates", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("users")}`
      }
    }).then(res => {
      setDate(res.data);
    });

    ;
  }, []);
  function getListData(value) {
    let listData;

    if (date !== 0) {
      ;
      date.map(item => {
        if (moment(value._d).format("DD.MM.YYYY") === item.event_date) {
          listData = [
            {
              type: "events",
              content: moment(item.event_date, "DD.MM.YYYY").format("DD")
            }
          ];
        }
      });
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
      onChange={(date)=>{onPanelChange(date);onAllChange(date)}}
    />
  );
}
export default CalendarNew;
