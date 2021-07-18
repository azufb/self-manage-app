import React, { useState, useContext } from "react";
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
//import { format } from 'date-fns'
import DateFnsUtils from '@date-io/date-fns';
//import jaLocale from "date-fns/locale/ja";
//import { ja } from 'date-fns/locale'
import {ADD_READINGS} from "../actions";
import AppContext from "../contexts/AppContext";

/*const localemap = {
  ja: jaLocale
};*/

const ReadingForm = () => {
  //const [locale] = useState("ja");
  const { dispatch } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [selectedDate, handleDateChange] = useState(new Date());

  const handleAdd = (e) => {
    e.preventDefault();
    console.log(selectedDate);

    dispatch({
      type: ADD_READINGS,
      selectedDate,
      title
    });
  }

  return (
    <div>
      <h1>Form</h1>
      <form>
        <div>
          <label htmlFor="titleForm">タイトル</label>
        </div>
        <input type="text" id="titleForm" value={title} onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトルを入力してください。" />
        <div>
          <label htmlFor="dateForm">読んだ日</label>
        </div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker value={selectedDate} onChange={handleDateChange} />
        </MuiPickersUtilsProvider>
        <button onClick={handleAdd}>
          登録
        </button>
      </form>
    </div>

  )
}

export default ReadingForm;