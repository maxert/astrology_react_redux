import React, { useState, useEffect } from "react";
import { List } from "semantic-ui-react";
import Axios from "axios";
import moment from "moment";
import { NavLink, useLocation } from "react-router-dom";
import manifest from "../manifest"
//Блок историй
function History() {
  const [dateHistory, setHistory] = useState();
  const location = useLocation();
  useEffect(() => {
    //Получение списка историй
    Axios.get(manifest.URL+"/api/history", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("users")}`
      }
    }).then(res => {
      setHistory(res.data);
 
    });
  }, []);

  return (
    <div className="histotry_container">
      <div className="text_planetary text_all">История</div>
      <div className="history_list">
        <List divided relaxed>
          {dateHistory !== undefined &&
            dateHistory.history.map(items => (
              <List.Item key={items.id}>
                <div className="icon_image">
                  {items.image !== null ? (
                    <img
                      className="icon_image_size"
                      src={
                        manifest.URL +
                        items.image
                      }
                      alt=""
                    />
                  ) : (
                    <div className="text_image">{items.name[0]}</div>
                  )}
                </div>
                <List.Content>
                  <List.Description as="div">
                    {moment(items.created_at).format("DD.MM.YYYY")} ,{" "}
                    {moment(items.created_at).format("HH:mm")}
                  </List.Description>
                  <List.Header as="div">
                    {items.description + " "}
                    {items.description.indexOf("удалена") !== -1 ||
                    items.description.indexOf("удалено") !== -1 ? (
                      <span> {items.name}</span>
                    ) : (
                      <NavLink
                        to={{
                          pathname: `/${items.obj_type}/id/${items.obj_id}`,
                          state: location.pathname
                        }}
                      >
                        {" "}
                        {items.name}
                      </NavLink>
                    )}
                  </List.Header>
                </List.Content>
              </List.Item>
            ))}
        </List>
      </div>
    </div>
  );
}
export default History;
