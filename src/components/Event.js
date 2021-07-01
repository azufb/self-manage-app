import React, { useContext, useEffect, useState } from "react";
import { DELETE_EVENT, EDIT_EVENT } from "../actions";
import AppContext from "../contexts/AppContext";
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import styles from "../styles/Event.css";
import Modal from "@material-ui/core/Modal";

const JSON_KEYWORD = "events";

const Event = ({event}) => {
  const {state, dispatch} = useContext(AppContext);
  const id = event.id;
  const [name, setName] = useState(event.name);
  const [comment, setComment] = useState(event.comment);
  const [url, setUrl] = useState(event.url);
  const [date, setDate] = useState(event.date);
  const [editable, setEditable] = useState(false);
  const [open, setOpen] = useState(false);

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
    setUrl(event.url);
  }, [event.name, event.comment]);

  // 詳細モーダルの開閉を管理
  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  // editableがtrueであれば、inputエリアを表示。
  const handleEditable = () => {
    setEditable(true);
  }

  const handleEditClose = () => {
    setEditable(false);
  }

  const handleEditEvent = () => {
    dispatch({
      type: EDIT_EVENT,
      id,
      name,
      comment,
      url,
      date
    });

    setName(event.name);
    setComment(event.comment);
    setUrl(event.url);

    window.alert("変更が適用されました。");

    localStorage.setItem(JSON_KEYWORD, JSON.stringify(state));
  }

  return (
    <React.Fragment>
      <tr>
        <td>{event.id}</td>
        <td>{event.name}</td>
        <td><a href={event.url} target="_blank" rel="noopener noreferrer">{event.url}</a></td>
        <td>{event.date}</td>
        <td className={styles.btns}>
          <div className={styles.btn}>
            <Button variant="contained" color="secondary" onClick={handleDeleteEvent}
              startIcon={<DeleteIcon />}>
              削除
            </Button>
          </div>
          <div className={styles.btn}>
            <Button variant="contained" color="secondary" onClick={handleOpen}>
              詳細
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
      <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
        <div className={styles.modalBody}>
          <h4>コメント：</h4>
          {event.comment}
        </div>
      </Modal>

      <Modal open={editable} onClose={handleEditClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
        <div className={styles.modalBody}>
          <h4>イベントID“{event.id}”を編集する</h4>
          <div>
            <label>イベント名</label>
          </div>
          <div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={styles.eventNameInput} />
          </div>
          <div>
            <label>コメント</label>
          </div>
          <div>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} className={styles.commentInput} />
          </div>
          <div>
            <label>URL</label>
          </div>
          <div>
            <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} className={styles.eventNameInput} />
          </div>
          <div>
            <label>参加日</label>
          </div>
          <input type="date" id="dateForm" value={date} onChange={(e)=> setDate(e.target.value)} />
          <div className={styles.btns}>
            <div className={styles.btn}>
              <Button variant="contained" color="primary" onClick={handleEditEvent}
                startIcon={<CheckIcon />}>
                適用
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  )
}

export default Event;