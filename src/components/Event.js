import React, { useContext } from "react";
import { DELETE_EVENT } from "../actions";
import AppContext from "../contexts/AppContext";

const Event = ({event}) => {
  const {dispatch} = useContext(AppContext);
  //const [title, setTitle] = useState(event.title);
  const id = event.id;

  const handleDeleteEvent = () => {
    dispatch({
      type: DELETE_EVENT,
      id
    });
  }

  return (
    <tr>
      <td>{event.id}</td>
      <td>{event.name}</td>
      <td>{event.comment}</td>
      <td>
        <button type="button" onClick={handleDeleteEvent}>削除</button>
      </td>
    </tr>
  )
}

export default Event;