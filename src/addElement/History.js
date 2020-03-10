import React from "react";
import { List } from "semantic-ui-react";


//Блок историй
export const History = () => {
  return (
    <div className="histotry_container">
      <div className="text_planetary text_all">История</div>
      <div className="history_list">
        <List divided relaxed>
          <List.Item>
            <div className="icon_image">
              <img
                className="icon_image_size"
                src="/img/Ellipse 11.png"
                alt=""
              />
            </div>
            <List.Content>
              <List.Description as="a">12 января 2020, 12:43</List.Description>
              <List.Header as="a">
                Добавлена натальная карта <span>Сенкевич Альберт Иванович</span>
              </List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <div className="icon_image">
              <div className="text_color">T</div>
            </div>
            <List.Content>
              <List.Description as="a">12 января 2020, 12:43</List.Description>
              <List.Header as="a">
                Добавлена натальная карта <span>Сенкевич Альберт Иванович</span>
              </List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <div className="icon_image">
              <div className="text_color">T</div>
            </div>
            <List.Content>
              <List.Description as="a">12 января 2020, 12:43</List.Description>
              <List.Header as="a">
                Добавлена натальная карта <span>Сенкевич Альберт Иванович</span>
              </List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <div className="icon_image">
              <div className="text_color">T</div>
            </div>
            <List.Content>
              <List.Description as="a">12 января 2020, 12:43</List.Description>
              <List.Header as="a">
                Создано событие{" "}
                <span>
                  Компания Facebook 24 декабря представила финансовый отчёт за
                  2019 год для всех инвесторов
                </span>
              </List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <div className="icon_image">
              <div className="text_color">T</div>
            </div>
            <List.Content>
              <List.Description as="a">12 января 2020, 12:43</List.Description>
              <List.Header as="a">
                Добавлена натальная карта <span>Сенкевич Альберт Иванович</span>
              </List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <div className="icon_image">
              <div className="text_color">T</div>
            </div>
            <List.Content>
              <List.Description as="a">12 января 2020, 12:43</List.Description>
              <List.Header as="a">
                Добавлена натальная карта <span>Сенкевич Альберт Иванович</span>
              </List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <div className="icon_image">
              <div className="text_color">T</div>
            </div>
            <List.Content>
              <List.Description as="a">12 января 2020, 12:43</List.Description>
              <List.Header as="a">
                Добавлена натальная карта <span>Сенкевич Альберт Иванович</span>
              </List.Header>
            </List.Content>
          </List.Item>
        </List>
      </div>
    </div>
  );
};
