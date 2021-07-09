import React, { useState, useContext } from "react";
import { ADD_EVENT } from "../actions";
import AppContext from "../contexts/AppContext";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Modal from "@material-ui/core/Modal";
import styles from "../styles/EventForm.css";

const EventForm = () => {
  const { dispatch } = useContext(AppContext); // contextから、dispatchを受け取る。
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [url, setUrl] = useState("");
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);

  const handleAddEvent = (e) => {
    e.preventDefault();

    dispatch({
      type: ADD_EVENT,
      name,
      comment,
      url,
      date
    });

    window.alert(`「${name}」というイベントを登録しました。`);

    setName("");
    setComment("");
    setUrl("");
    setDate("");

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
      setComment("");
      setUrl("");
      setDate("");

      // モーダルとじる
      setOpen(false);
    }
  }

  const disableResister = name === "" || comment === "" || date === "";


  return (
    <div className={styles.contents}>
      <div className={styles.btn}>
        <Button variant="contained" color="primary" onClick={handleOpen}
          startIcon={<AddIcon />}>
          <strong>イベントの登録</strong>
        </Button>
      </div>
      <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
        <form className={styles.modalBody}>
          <div>
            <label htmlFor="titleForm">イベント名<span className={styles.requiredMark}>＊</span></label>
          </div>
          <input type="text" id="titleForm" value={name} onChange={(e) => setName(e.target.value)}
            placeholder="イベント名を入力してください。" className={styles.eventNameInput} />
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
          <input type="date" id="dateForm" value={date} onChange={(e)=> setDate(e.target.value)} />
          <div className={styles.btnArea}>
            <div className={styles.btn}>
              <Button onClick={handleAddEvent} variant="contained" size="medium" color="primary"
                className={styles.registerBtn} disabled={disableResister}
                startIcon={<AddIcon />}>
                <strong>登録</strong>
              </Button>
            </div>
            <div className={styles.btn}>
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