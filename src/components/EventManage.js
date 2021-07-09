import React from "react";
import EventForm from "./EventForm";
import EventList from "./EventList";
import styles from "../styles/Events.css";

const EventManage = () => {
  return (
    <div className={styles.contents}>
      <h1>Events</h1>
      <p>
        参加したイベントを管理できるページです！<br />
        早速、下のボタンからイベント名と参加したコメント・感想などを登録し、記録を始めていきましょう！
      </p>
      <EventForm />
      <EventList />
    </div>
  )
}

export default EventManage;