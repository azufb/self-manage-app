import React, { useContext } from "react";
import AppContext from "../contexts/AppContext";
import Event from "./Event";

const EventList = () => {
  const { state } = useContext(AppContext);

  return (
    <div>
      <table>
        <tbody>
          { state.events.map((event, index) => (<Event key={index} event={event} />))}
        </tbody>
      </table>
    </div>
  )
}

export default EventList;