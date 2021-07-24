import React, { useContext, useState } from "react";
import { DELETE_READING, EDIT_READING } from "../actions";
import AppContext from "../contexts/AppContext";
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import MessageIcon from '@material-ui/icons/Message';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import Modal from "@material-ui/core/Modal";
import Tooltip from '@material-ui/core/Tooltip';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import styles from "../styles/Event.css";

const JSON_KEYWORD = "events";

const Event = ({reading}) => {
  const {state, dispatch} = useContext(AppContext);
  const id = reading.id;
  const [title, setTitle] = useState(reading.title);
  const [author, setAuthor] = useState(reading.author);
  const [comment, setComment] = useState(reading.comment);
  const [selectedDate, handleDateChange] = useState(reading.selectedDate);
  const [open, setOpen] = useState(false);
  const [editable, setEditable] = useState(false);

  const handleDelete = () => {
    dispatch({
      type: DELETE_READING,
      id
    });
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleEditable = () => {
    setEditable(true);
  }

  const handleEditClose = () => {
    setEditable(false);
  }

  const handleEdit = () => {
    dispatch({
      type: EDIT_READING,
      id,
      title,
      author,
      selectedDate,
      comment
    });

    setTitle(reading.title);
    setAuthor(reading.author);
    setComment(reading.comment);
    handleDateChange(reading.selectedDate);

    localStorage.setItem(JSON_KEYWORD, JSON.stringify(state));
    setEditable(false);
  }

  return (
    <React.Fragment>
      <tr>
        <td className={styles.id}>{reading.id}</td>
        <td className={styles.name}>{reading.title}</td>
        <td>{reading.author}</td>
        <td className={styles.date}>{reading.selectedDate}</td>
        <td className={styles.btns}>
          <div className={styles.btn}>
            <Button variant="contained" color="default" onClick={handleOpen}>
              詳細
            </Button>
          </div>
          <div className={styles.btn}>
            <Button variant="contained" color="default" onClick={handleEditable}>
              編集
            </Button>
          </div>
          <div className={styles.btn}>
            <Button variant="contained" color="secondary" onClick={handleDelete}>
              削除
            </Button>
          </div>
        </td>
      </tr>
      <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
        <div className={styles.modalBody}>
          <div className={styles.comment}>
            <label>感想：</label>
          </div>
          <div>
            {reading.comment}
          </div>
        </div>
      </Modal>
      <Modal open={editable} onClose={handleEditClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
        <div className={styles.modalBody}>
          <label>ID“{reading.id}”を編集する</label>
          <div className={styles.formContent}>
            <label>タイトル</label>
          </div>
          <div>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={styles.eventNameInput} />
          </div>
          <div className={styles.formContent}>
            <label>著者</label>
          </div>
          <div>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className={styles.eventNameInput} />
          </div>
          <div className={styles.formContent}>
            <label>感想</label>
          </div>
          <div>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} className={styles.commentInput} rows="5" />
          </div>
          <div className={styles.formContent}>
            <label>読んだ日</label>
          </div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker value={selectedDate} onChange={handleDateChange} />
          </MuiPickersUtilsProvider>
          <div>
            <div className={styles.btnsInModal}>
              <div className={styles.btnModal}>
                <Button variant="contained" color="primary" onClick={handleEdit}
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