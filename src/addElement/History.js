import React, { useState, useEffect } from "react";
import { List } from "semantic-ui-react";
import Axios from "axios";
import moment from "moment";
import { NavLink } from "react-router-dom";

//Блок историй
function History() {
  const [dateHistory, setHistory] = useState();

  useEffect(() => {
    Axios.get("http://1690550.masgroup.web.hosting-test.net/api/history", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("users")}`
      }
    }).then(res => {setHistory(res.data);console.log(res.data)});
  },[]);

  return (
    <div className="histotry_container">
      <div className="text_planetary text_all">История</div>
      <div className="history_list">
        <List divided relaxed>
          {dateHistory!==undefined &&
            dateHistory.history.map(items => 
              <List.Item key={items.id}>
                <div className="icon_image">
                  <img
                    className="icon_image_size"
                    src={items.image!==null?"http://1690550.masgroup.web.hosting-test.net/"+items.image:"/img/Ellipse 11.png"}
                    alt=""
                  />
                </div>
                <List.Content>
                  <List.Description as="div" >
                  {moment(items.created_at).format("DD.MM.YYYY")} , {moment(items.created_at).format("HH:MM")}
                  </List.Description>
                  <List.Header as="div">
                    {items.description+" "}
                     {items.description==="Персона удалена"?
                     <span> {items.name}</span>:
                     <NavLink to={`/${items.obj_type}/id/${items.obj_id}`}> {items.name}</NavLink>
                     }
                    
                    
                  </List.Header>
                </List.Content>
              </List.Item>
          )}
        </List>
      </div>
    </div>
  );
}
export default History;
