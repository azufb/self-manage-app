import React, { useContext, useEffect, useState } from "react";
import { DELETE_EVENT, EDIT_EVENT } from "../actions";
import AppContext from "../contexts/AppContext";

const JSON_KEYWORD = "events";

const Event = ({event}) => {
  const {state, dispatch} = useContext(AppContext);
  const id = event.id;
  const [name, setName] = useState(event.name);
  const [comment, setComment] = useState(event.comment);
  const [editable, setEditable] = useState(false);

  const handleDeleteEvent = () => {
    dispatch({
      type: DELETE_EVENT,
      id
    });
  }

  useEffect(() => {
    setName(event.name);
    setComment(event.comment);
  }, [event.name, event.comment]);

  // editableがtrueであれば、inputエリアを表示。
  const handleEditable = () => {
    setEditable(!editable);
  }

  const handleEditEvent = () => {
    dispatch({
      type: EDIT_EVENT,
      id,
      name,
      comment
    });

    setName(event.name);
    setComment(event.comment);

    localStorage.setItem(JSON_KEYWORD, JSON.stringify(state));
  }

  return (
    <React.Fragment>
    {editable ? 
      (
        <tr>
          <td>{event.id}</td>
          <td><input value={name} onChange={(e) => setName(e.target.value)} /></td>
          <td><input value={comment} onChange={(e) => setComment(e.target.value)} /></td>
          <td>
            <button type="button" onClick={handleEditEvent}>保存</button>
          </td>
          <td>
          <button type="button" onClick={handleEditable}>閉じる</button>
          </td>
        </tr>
      ):(
        <tr>
          <td>{event.id}</td>
          <td>{event.name}</td>
          <td>{event.comment}</td>
          <td>
            <button type="button" onClick={handleDeleteEvent}>削除</button>
          </td>
          <td>
            <button type="button" onClick={handleEditable}>編集</button>
          </td>
        </tr>
      )
    }
    </React.Fragment>
  )
}

export default Event;