import React, { useContext, useEffect, useState } from "react";
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { DELETE_EVENT, EDIT_EVENT } from "../actions";
import AppContext from "../contexts/AppContext";
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import MessageIcon from '@material-ui/icons/Message';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import Modal from "@material-ui/core/Modal";
import Tooltip from '@material-ui/core/Tooltip';
import styles from "../styles/Event.css";

const JSON_KEYWORD = "events";

const Event = ({event}) => {
  const {state, dispatch} = useContext(AppContext);
  const id = event.id;
  const [name, setName] = useState(event.name);
  const [tag1, setTag1] = useState(event.tag1);
  const [tag2, setTag2] = useState(event.tag2);
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
    setTag1(event.tag1);
    setTag2(event.tag2);
    setComment(event.comment);
    setUrl(event.url);
    setDate(event.date);
  }, [event.name, event.tag1, event.tag2, event.comment, event.url, event.date]);

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
      tag1,
      tag2,
      comment,
      url,
      date
    });

    setName(event.name);
    setTag1(event.tag1);
    setTag2(event.tag2);
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
        <td className={styles.tags}>
          <p className={styles.tagArea}>
            <span className={styles.tag}>{event.tag1}</span><br />
            <span className={styles.tag}>{event.tag2}</span>
          </p>
        </td>
        <td className={styles.date}>{event.date}</td>
        <td className={styles.btns}>
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
          <div className={styles.btn}>
            <Tooltip title="イベント削除" arrow placement="top">
              <Button variant="contained" color="secondary" onClick={handleDeleteEvent}>
                <DeleteIcon />
              </Button>
            </Tooltip>
          </div>
        </td>
      </tr>
      <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
        <div className={styles.modalBody}>
          <div className={styles.comment}>
            <label>コメント：</label>
          </div>
          <div>
            {event.comment}
          </div>
          <div className={styles.url}>
            <label>URL：</label>
          </div>
          <div>
            <a href={event.url} className={styles.link} target="_blank" rel="noopener noreferrer">
              {event.url}
            </a>
          </div>
          <div className={styles.btnsInModal}>
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
          <label>イベントID“{event.id}”を編集する</label>
          <div className={styles.formContent}>
            <label>イベント名</label>
          </div>
          <div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={styles.eventNameInput} />
          </div>
          <div className={styles.formContent}>
            <label>タグ1</label>
          </div>
          <div>
            <select value={tag1} onChange={(e) => setTag1(e.target.value)}>
              <option value={"#社内"}>#社内</option>
              <option value={"#社外"}>#社外</option>
            </select>
          </div>
          <div className={styles.formContent}>
            <label>タグ2</label>
          </div>
          <div>
            <select value={tag2} onChange={(e) => setTag2(e.target.value)}>
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
          {/*<input type="date" id="dateForm" value={date} onChange={(e)=> setDate(e.target.value)} />*/}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker value={date} onChange={setDate} />
          </MuiPickersUtilsProvider>
          <div>
            <div className={styles.btnsInModal}>
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