import React from "react";
import EventForm from "./EventForm";
import EventList from "./EventList";
import styles from "../styles/Events.css";

const EventManage = () => {
  return (
    <div className={styles.contents}>
      <h1>Events</h1>
      <p>参加したイベントを管理できるページです。</p>
      <EventForm />
      <EventList />
    </div>
  )
}

export default EventManage;