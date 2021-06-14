import React from "react";
import EventForm from "./EventForm";
import EventList from "./EventList";

const EventManage = () => {
  return (
    <div>
      <p>参加したイベントを管理できるページです。</p>
      <EventForm />
      <EventList />
    </div>
  )
}

export default EventManage;