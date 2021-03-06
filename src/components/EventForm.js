import React, { useState, useContext } from "react";
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { ADD_EVENT } from "../actions";
import AppContext from "../contexts/AppContext";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Modal from "@material-ui/core/Modal";
import Tooltip from '@material-ui/core/Tooltip';
import styles from "../styles/EventForm.css";

const EventForm = () => {
  const { dispatch } = useContext(AppContext); // contextから、dispatchを受け取る。
  const [name, setName] = useState("");
  const [tag1, setTag1] = useState("");
  const [tag2, setTag2] = useState("");
  const [comment, setComment] = useState("");
  const [url, setUrl] = useState("");
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const handleAddEvent = (e) => {
    e.preventDefault();

    dispatch({
      type: ADD_EVENT,
      name,
      tag1,
      tag2,
      comment,
      url,
      date
    });

    window.alert(`「${name}」というイベントを登録しました。`);

    setName("");
    setTag1("");
    setTag2("");
    setComment("");
    setUrl("");
    setDate(new Date());

    setOpen(false);
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  // 間違えてキャンセル押してしまったときのための確認。
  const handleCanceled = () => {
    const confirmMessage = window.confirm("入力途中の情報は保存できません。\r\nイベントの登録をキャンセルしますか？");

    if (confirmMessage) {
      // 前の入力情報を残さない。
      setName("");
      setTag1("");
      setTag2("");
      setComment("");
      setUrl("");
      setDate(new Date());

      // モーダルとじる
      setOpen(false);
    }
  }

  const disableResister = name === "" || comment === "" || date === "" || tag1 === "" || tag2 === "";


  return (
    <div className={styles.contents}>
      <div className={styles.btn}>
        <Tooltip title="ここから登録できます！" arrow placement="right">
          <Button variant="contained" color="primary" onClick={handleOpen}
            startIcon={<AddIcon />}>
            <strong>イベントの登録</strong>
          </Button>
        </Tooltip>
      </div>
      <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
        <form className={styles.modalBody}>
          <div>
            <label htmlFor="titleForm">イベント名<span className={styles.requiredMark}>＊</span></label>
          </div>
          <input type="text" id="titleForm" value={name} onChange={(e) => setName(e.target.value)}
            placeholder="イベント名を入力してください。" className={styles.eventNameInput} />
          <div className={styles.formContent}>
            <label htmlFor="tagForm">タグ1<span className={styles.requiredMark}>＊</span></label>
          </div>
          <select id="tagForm" value={tag1} onChange={(e) => setTag1(e.target.value)}>
            <option value={""}>タグを選択してください</option>
            <option value={"#社内"}>#社内</option>
            <option value={"#社外"}>#社外</option>
          </select>
          <div className={styles.formContent}>
            <label htmlFor="tagForm">タグ2<span className={styles.requiredMark}>＊</span></label>
          </div>
          <select id="tagForm" value={tag2} onChange={(e) => setTag2(e.target.value)}>
            <option value={""}>タグを選択してください</option>
            <option value={"#オンライン"}>#オンライン</option>
            <option value={"#オフライン"}>#オフライン</option>
          </select>
          <div className={styles.formContent}>
            <label htmlFor="commentForm">コメント<span className={styles.requiredMark}>＊</span></label>
          </div>
          <textarea id="commentForm" value={comment} onChange={(e) => setComment(e.target.value)}
            placeholder="コメントを入力してください。" className={styles.commentInput} rows="10" />
          <div className={styles.formContent}>
            <label htmlFor="urlForm">URL</label>
          </div>
          <input type="url" id="urlForm" value={url} onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com" className={styles.eventNameInput} />
          <div className={styles.formContent}>
            <label htmlFor="dateForm">参加日<span className={styles.requiredMark}>＊</span></label>
          </div>
          {/*<input type="date" id="dateForm" value={date} onChange={(e)=> setDate(e.target.value)} />*/}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker value={date} onChange={setDate} />
          </MuiPickersUtilsProvider>
          <div className={styles.btnArea}>
            <div className={styles.btnModal}>
              <Button onClick={handleAddEvent} variant="contained" size="medium" color="primary"
                className={styles.registerBtn} disabled={disableResister}
                startIcon={<AddIcon />}>
                <strong>登録</strong>
              </Button>
            </div>
            <div className={styles.btnModal}>
              <Button onClick={handleCanceled} variant="contained" size="medium" color="default"
                className={styles.registerBtn}
                startIcon={<CloseIcon />}>
                <strong>キャンセル</strong>
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default EventForm;