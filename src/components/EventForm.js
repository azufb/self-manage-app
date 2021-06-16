import React, { useState, useContext } from "react";
import { ADD_EVENT } from "../actions";
import AppContext from "../contexts/AppContext";

const EventForm = () => {
  const { dispatch } = useContext(AppContext); // contextから、dispatchを受け取る。
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleAddEvent = (e) => {
    e.preventDefault();

    dispatch({
      type: ADD_EVENT,
      name,
      comment
    });

    setName("");
    setComment("");
  }
  return (
    <div>
      <form>
        <label htmlFor="titleForm">イベントタイトル</label>
        <input type="text" id="titleForm" value={name} onChange={(e) => setName(e.target.value)} placeholder="イベント名を入力してください。" />
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="コメントを入力してください。" />
        <button onClick={handleAddEvent}>追加</button>
      </form>
    </div>
  )
}

export default EventForm;