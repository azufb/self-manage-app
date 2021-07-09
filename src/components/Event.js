import React, { useContext, useEffect, useState } from "react";
import { DELETE_EVENT, EDIT_EVENT } from "../actions";
import AppContext from "../contexts/AppContext";
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import MessageIcon from '@material-ui/icons/Message';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import Modal from "@material-ui/core/Modal";
import styles from "../styles/Event.css";

const JSON_KEYWORD = "events";

const Event = ({event}) => {
  const {state, dispatch} = useContext(AppContext);
  const id = event.id;
  const [name, setName] = useState(event.name);
  const [tag, setTag] = useState(event.tag);
  const [comment, setComment] = useState(event.comment);
  const [url, setUrl] = useState(event.url);
  const [date, setDate] = useState(event.date);
  const [editable, setEditable] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDeleteEvent = () => {
    const confirmMessage = window.confirm("削除したイベントを復元することはできません。\r\nイベントを削除してもよいですか？");
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
    setTag(event.tag);
    setComment(event.comment);
    setUrl(event.url);
    setDate(event.date);
  }, [event.name, event.tag, event.comment, event.url, event.date]);

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
      tag,
      comment,
      url,
      date
    });

    setName(event.name);
    setTag(event.tag);
    setComment(event.comment);
    setUrl(event.url);
    setDate(event.date);

    window.alert("変更が適用されました。");

    localStorage.setItem(JSON_KEYWORD, JSON.stringify(state));
    setEditable(false);
  }

  return (
    <React.Fragment>
      <tr>
        <td className={styles.id}>{event.id}</td>
        <td>{event.name}</td>
        <td><a href={event.url} target="_blank" rel="noopener noreferrer">{event.url}</a></td>
        <td className={styles.date}>{event.date}</td>
        <td className={styles.btns}>
          <div className={styles.btn}>
            <Button variant="contained" color="secondary" onClick={handleDeleteEvent}>
              <DeleteIcon />
            </Button>
          </div>
          <div className={styles.btn}>
            <Button variant="contained" color="default" onClick={handleOpen}
              startIcon={<MessageIcon />}>
              <strong>詳細</strong>
            </Button>
          </div>
          <div className={styles.btn}>
            <Button variant="contained" color="default" onClick={handleEditable}
              startIcon={<EditIcon />}>
              <strong>編集</strong>
            </Button>
          </div>
        </td>
      </tr>
      <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
        <div className={styles.modalBody}>
          <label>タグ</label>
          <div className={styles.tag}>
            {event.tag}
          </div>
          <label>コメント</label>
          <div className={styles.comment}>
            {event.comment}
          </div>
          <div className={styles.btns}>
              <div className={styles.btnModal}>
                <Button variant="contained" color="default" onClick={handleClose}
                  startIcon={<CloseIcon />}>
                  <strong>とじる</strong>
                </Button>
              </div>
            </div>
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
            <label>タグ</label>
          </div>
          <div>
            <select value={tag} onChange={(e) => setTag(e.target.value)}>
              <option value={"#社内"}>#社内</option>
              <option value={"#社外"}>#社外</option>
              <option value={"#オンライン"}>#オンライン</option>
              <option value={"#オフライン"}>#オフライン</option>
            </select>
          </div>
          <div className={styles.formContent}>
            <label>コメント</label>
          </div>
          <div>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} className={styles.commentInput} rows="5" />
          </div>
          <div className={styles.formContent}>
            <label>URL</label>
          </div>
          <div>
            <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} className={styles.eventNameInput} placeholder="https://example.com" />
          </div>
          <div className={styles.formContent}>
            <label>参加日</label>
          </div>
          <input type="date" id="dateForm" value={date} onChange={(e)=> setDate(e.target.value)} />
          <div>
            <div className={styles.btns}>
              <div className={styles.btnModal}>
                <Button variant="contained" color="primary" onClick={handleEditEvent}
                  startIcon={<CheckIcon />}>
                  <strong>適用</strong>
                </Button>
              </div>
              <div className={styles.btnModal}>
                <Button variant="contained" color="default" onClick={handleEditClose}
                  startIcon={<CloseIcon />}>
                  <strong>とじる</strong>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  )
}

export default Event;