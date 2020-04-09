import React, { useReducer } from "react";
import {
  FETCH_NOTE,
  DELETE_NOTE,
  ADD_NOTE,
  UPDATE_NOTE,
  EDIT_NOTE
} from "../types";
import manifest from "../../manifest";
import Axios from "axios";
import { NoteContext } from "./noteContext";
import { NoteReducer } from "./noteReducer";
import { useAlert } from "react-alert";

export const NoteState = ({ children }) => {
  const initialState = {
    isEdit: true
  };
  const [state, dispatch] = useReducer(NoteReducer, initialState);
  const alert = useAlert();

  //Обновить заметку
  const update_note = async (id_node, name, description, obj_id, obj_type) => {
    await Axios.put(
      manifest.URL + `/api/notes/` + id_node,
      {
        name: name,
        description: description
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("users")}`
        }
      }
    ).then(res => {
      alert.info("Заметка обновленна");
      Fetch_note(obj_id, obj_type);
      dispatch({
        type: UPDATE_NOTE
      });
    });
  };

  //Добавить заметку
  const add_note = async values => {
    await Axios.post(
      manifest.URL + "/api/notes",
      {
        name: values.name,
        obj_id: values.obj_id,
        obj_type: values.obj_type,
        description: values.description
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("users")}`
        }
      }
    ).then(res => {
      Fetch_note(values.obj_type, values.obj_id);
      alert.success("Заметка созданна");
      dispatch({
        type: ADD_NOTE
      });
    });
  };

  //Удалить заметку
  const delete_note = async (id_note, dataItems) => {
    await Axios.delete(manifest.URL + `/api/notes/` + id_note, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("users")}`
      }
    }).then(res => {
      const payload = dataItems.filter(i => i.id !== id_note);
      alert.info("Заметка удаленна");
      dispatch({
        type: DELETE_NOTE,
        payload
      });
    });
  };

  //Отредактировать заметку переключение
  const edit_note = async (id, data) => {
    const dateEdit = data.map(Item => {
      Item.id === id && Item.isEdit === true
        ? (Item.isEdit = false)
        : (Item.isEdit = true);
      return Item;
    });

    dispatch({
      type: EDIT_NOTE,
      payload: dateEdit
    });
  };

  //Получить спиоск заметок
  const Fetch_note = (obj_type, obj_id) => {
    Axios.get(
      manifest.URL + `/api/notes?obj_type=${obj_type}&obj_id=${obj_id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("users")}`
        }
      }
    ).then(res => {
      const edit = Object.keys(res.data).map(key => {
        return {
          ...res.data[key],
          isEdit: true
        };
      });
      dispatch({
        type: FETCH_NOTE,
        payload: edit
      });
    });
  };
  return (
    <NoteContext.Provider
      value={{
        add_note,
        update_note,
        delete_note,
        Fetch_note,
        edit_note,
        state_note: state
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
