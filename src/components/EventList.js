import React, { useContext } from "react";
import AppContext from "../contexts/AppContext";
import Event from "./Event";
import styles from "../styles/EventList.css";

const EventList = () => {
  const { state } = useContext(AppContext);

  return (
    <div>
      <table>
        <thead>
          <tr className={styles.tableHeader}>
            <th className={styles.tableHeaderID}>ID</th>
            <th>イベント名</th>
            <th>URL</th>
            <th className={styles.tableHeaderBtns}></th>
          </tr>
        </thead>
        <tbody>
          { state.events.map((event, index) => (<Event key={index} event={event} />))}
        </tbody>
      </table>
    </div>
  )
}

export default EventList;