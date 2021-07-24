import React, { useState, useContext } from "react";
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { ADD_READINGS } from "../actions";
import AppContext from "../contexts/AppContext";
import Button from '@material-ui/core/Button';
import Modal from "@material-ui/core/Modal";
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import styles from "../styles/EventForm.css";

const ReadingForm = () => {
  const { dispatch } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [selectedDate, handleDateChange] = useState(new Date());
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleAdd = (e) => {
    e.preventDefault();
    console.log(selectedDate);

    dispatch({
      type: ADD_READINGS,
      title,
      author,
      selectedDate,
      comment
    });

    window.alert(`「${title}」という本を登録しました。`);

    setTitle("");
    setAuthor("");
    handleDateChange(new Date());
    setComment("");

    setOpen(false);
  }

  const handleCancel = () => {
    const confirmMessage = window.confirm("入力途中の情報は保存できません。\r\nイベントの登録をキャンセルしますか？");

    if (confirmMessage) {
      setTitle("");
      setAuthor("");
      handleDateChange(new Date());
      setComment("");

      setOpen(false);
    }
  }

  const disableResister = title === "" || comment === "" || selectedDate === "" || author === "";

  return (
    <div>
      <div className={styles.btn}>
        <Button variant="contained" color="primary" onClick={handleOpen} startIcon={<AddIcon />}>
          <strong>本の登録はこちらから</strong>
        </Button>
      </div>
      
      <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
        <form className={styles.modalBody}>
          <div>
            <label htmlFor="titleForm">タイトル<span className={styles.requiredMark}>＊</span></label>
          </div>
          <input type="text" id="titleForm" value={title} onChange={(e) => setTitle(e.target.value)}
            placeholder="タイトルを入力してください。" className={styles.eventNameInput} />
          <div className={styles.formContent}>
            <label htmlFor="authorForm">著者<span className={styles.requiredMark}>＊</span></label>
          </div>
          <input type="text" id="authorForm" value={author} onChange={(e) => setAuthor(e.target.value)}
            placeholder="著者名を入力してください。" className={styles.eventNameInput} />
          <div className={styles.formContent}>
            <label htmlFor="dateForm">読んだ日<span className={styles.requiredMark}>＊</span></label>
          </div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker value={selectedDate} onChange={handleDateChange} />
          </MuiPickersUtilsProvider>
          <div className={styles.formContent}>
            <label htmlFor="commentForm">感想<span className={styles.requiredMark}>＊</span></label>
          </div>
          <textarea id="commentForm" value={comment} onChange={(e) => setComment(e.target.value)}
            placeholder="感想を入力してください。" className={styles.commentInput} rows="10" />
          <div className={styles.btnModal}>
            <Button variant="contained" color="primary" onClick={handleAdd}
              className={styles.registerBtn} disabled={disableResister}
              startIcon={<AddIcon />}>
              <strong>登録</strong>
            </Button>
          </div>
          <div className={styles.btnModal}>
            <Button variant="contained" color="default" onClick={handleCancel}
              className={styles.registerBtn} startIcon={<CloseIcon />}>
              <strong>キャンセル</strong>
            </Button>
          </div>
        </form>
      </Modal>
    </div>

  )
}

export default ReadingForm;