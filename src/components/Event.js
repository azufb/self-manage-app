import React, { useContext, useEffect, useState } from "react";
import { DELETE_EVENT, EDIT_EVENT } from "../actions";
import AppContext from "../contexts/AppContext";
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import styles from "../styles/Event.css";

const JSON_KEYWORD = "events";

const Event = ({event}) => {
  const {state, dispatch} = useContext(AppContext);
  const id = event.id;
  const [name, setName] = useState(event.name);
  const [comment, setComment] = useState(event.comment);
  const [editable, setEditable] = useState(false);

  const handleDeleteEvent = () => {
    const confirmMessage = window.confirm("イベントを削除してもよいですか？");
    if (confirmMessage) {
      dispatch({
        type: DELETE_EVENT,
        id
      });

      window.alert("イベントを削除しました。");
    }
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

    window.alert("変更が適用されました。");

    localStorage.setItem(JSON_KEYWORD, JSON.stringify(state));
  }

  return (
    <React.Fragment>
    {editable ? 
      (
        <tr>
          <td>{event.id}</td>
          <td><input value={name} onChange={(e) => setName(e.target.value)} className={styles.eventNameInput} /></td>
          <td><textarea value={comment} onChange={(e) => setComment(e.target.value)} className={styles.commentInput} /></td>
          <td className={styles.btns}>
            <div className={styles.btn}>
              <Button variant="contained" color="primary" onClick={handleEditEvent}
                startIcon={<CheckIcon />}>
                適用
              </Button>
            </div>
            <div className={styles.btn}>
              <Button variant="contained" color="default" onClick={handleEditable}
                startIcon={<CloseIcon />}>
                閉じる
              </Button>
            </div>
          </td>
        </tr>
      ):(
        <tr>
          <td>{event.id}</td>
          <td>{event.name}</td>
          <td>{event.comment}</td>
          <td className={styles.btns}>
            <div className={styles.btn}>
              <Button variant="contained" color="secondary" onClick={handleDeleteEvent}
                startIcon={<DeleteIcon />}>
                削除
              </Button>
            </div>
            <div className={styles.btn}>
              <Button variant="contained" color="default" onClick={handleEditable}
                startIcon={<EditIcon />}>
                編集
              </Button>
            </div>
          </td>
        </tr>
      )
    }
    </React.Fragment>
  )
}

export default Event;