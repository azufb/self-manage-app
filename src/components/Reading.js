import React, { useContext, useState } from "react";
//import { DELETE_EVENT, EDIT_EVENT } from "../actions";
//import AppContext from "../contexts/AppContext";
/*import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import MessageIcon from '@material-ui/icons/Message';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import Modal from "@material-ui/core/Modal";
import Tooltip from '@material-ui/core/Tooltip';*/
import styles from "../styles/Event.css";

//const JSON_KEYWORD = "events";

const Event = ({reading}) => {
  //const {state, dispatch} = useContext(AppContext);
  //const id = reading.id;
  //const [name, setName] = useState(event.name);
  //const [tag1, setTag1] = useState(event.tag1);
  //const [tag2, setTag2] = useState(event.tag2);
  //const [comment, setComment] = useState(event.comment);
  //const [url, setUrl] = useState(event.url);
  //const [selectedDate, handleDateChange] = useState(reading.selectedDate);

  return (
    <React.Fragment>
      <tr>
        <td className={styles.id}>{reading.id}</td>
        <td className={styles.name}>{reading.title}</td>
        <td className={styles.date}>{reading.selectedDate}</td>
      </tr>
    </React.Fragment>
  )
}

export default Event;