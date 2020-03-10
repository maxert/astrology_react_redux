import React from "react";
import { Dropdown } from "semantic-ui-react";


//Функциональный Блок изменений карточки 

const friendOptions = [
  {
    key: "0",
    text: "В избранные",
    value: "В избранные",
    image: { avatar: true, src: "../img/favorites.svg" }
  },
  {
    key: "1",
    text: "Редактировать",
    value: "Редактировать",
    image: { avatar: true, src: "../img/Edit1.svg" }
  },
  {
    key: "2",
    text: "Удалить",
    value: "Удалить",
    image: { avatar: true, src: "../img/Delete1.svg" }
  },
  {
    key: "3",
    text: "Удалить из избранного",
    value: "Удалить из избранного",
    image: { avatar: true, src: "../img/Delete1.svg" }
  }
];

const DropdownExampleInline = () => (
  <span>
    <Dropdown
      className="edit_drop"
      inline
      options={friendOptions}
      defaultValue={0}
    />
  </span>
);

export default DropdownExampleInline;
