import React from "react";
import ReadingForm from "./ReadingForm";
import styles from "../styles/Events.css";
import ReadingList from "./ReadingList";

const ReadingRecord = () => {
  return (
    <div className={styles.contents}>
      <h1>Readings</h1>
      <p>
        読んだ本を管理できるページです！<br />
        早速、下のボタンから、本と読んだあとのコメント・感想などを登録し、記録を始めていきましょう！
      </p>
      <ReadingForm />
      <ReadingList />
    </div>
  )
}

export default ReadingRecord;