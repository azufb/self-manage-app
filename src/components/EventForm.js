import React, { useState, useContext } from "react";
import { ADD_EVENT } from "../actions";
import AppContext from "../contexts/AppContext";

const EventForm = () => {
  const { dispatch } = useContext(AppContext); // contextから、dispatchを受け取る。
  const [title, setTitle] = useState("");

  const handleAddEvent = (e) => {
    e.preventDefault();

    dispatch({
      type: ADD_EVENT,
      title
    });

    setTitle("")
  }
  return (
    <div>
      <form>
        <label htmlFor="titleForm">イベントタイトル</label>
        <input type="text" id="titleForm" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="イベントのタイトルを入力してください。" />
        <button onClick={handleAddEvent}>追加</button>
      </form>
    </div>
  )
}

export default EventForm;