import React, { useState, useContext } from "react";
import { ADD_EVENT } from "../actions";
import AppContext from "../contexts/AppContext";
import Button from '@material-ui/core/Button';
import styles from "../styles/EventForm.css";

const EventForm = () => {
  const { dispatch } = useContext(AppContext); // contextから、dispatchを受け取る。
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [url, setUrl] = useState("");

  const handleAddEvent = (e) => {
    e.preventDefault();

    dispatch({
      type: ADD_EVENT,
      name,
      comment,
      url
    });

    window.alert(`「${name}」というイベントを登録しました。`);

    setName("");
    setComment("");
    setUrl("");
  }

  const disableResister = name === "" || comment === "";

  return (
    <div className={styles.contents}>
      <form>
        <div>
          <label htmlFor="titleForm">イベント名</label>
        </div>
        <input type="text" id="titleForm" value={name} onChange={(e) => setName(e.target.value)}
          placeholder="イベント名を入力してください。" className={styles.eventNameInput} />
        <div className={styles.formContent}>
          <label htmlFor="commentForm">コメント</label>
        </div>
        <textarea id="commentForm" value={comment} onChange={(e) => setComment(e.target.value)}
          placeholder="コメントを入力してください。" className={styles.commentInput} rows="10" />
        <div className={styles.formContent}>
          <label htmlFor="urlForm">URL</label>
        </div>
        <input type="url" id="urlForm" value={url} onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com" className={styles.eventNameInput} />
        <div className={styles.btnArea}>
          <Button onClick={handleAddEvent} variant="contained" size="medium" color="primary"
            fontWeight="fontWeightBold" className={styles.registerBtn} disabled={disableResister}>
            登録
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EventForm;