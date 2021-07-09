import React, { useContext, useState } from "react";
import AppContext from "../contexts/AppContext";
import Event from "./Event";
import styles from "../styles/EventList.css";
import TablePagination from '@material-ui/core/TablePagination';

const EventList = () => {
  const { state } = useContext(AppContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  return (
      <table>
        <thead>
          <tr className={styles.tableHeader}>
            <th className={styles.tableHeaderID}>ID</th>
            <th className={styles.tableHeaderName}>イベント名</th>
            <th className={styles.tableHeaderURL}>URL</th>
            <th className={styles.tableHeaderDate}>参加日</th>
            <th className={styles.tableHeaderBtns}></th>
          </tr>
        </thead>
        <tbody>
          {(rowsPerPage > 0
              ? state.events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : state.events
            ).map((event, index) => (<Event key={index} event={event} />))}
        </tbody>
        <tfoot>
        <TablePagination
          rowsPerPageOptions={[5]}
          count={state.events.length}
          page={page}
          onChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
        />
        </tfoot>
      </table>
  )
}

export default EventList;