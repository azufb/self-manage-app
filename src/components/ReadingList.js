import React, { useContext, useState } from "react";
import AppContext from "../contexts/AppContext";
import Reading from "./Reading";
import styles from "../styles/EventList.css";
import TablePagination from '@material-ui/core/TablePagination';

const ReadingList = () => {
  const { state } = useContext(AppContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);

  const handleChangePage = (e, newPage) => {
    e.preventDefault();
    setPage(newPage);
  };

  return (
      <table>
        <thead>
          <tr className={styles.tableHeader}>
            <th className={styles.tableHeaderID}>No.</th>
            <th className={styles.tableHeaderName}>タイトル</th>
            {/*<th className={styles.tableHeaderTag}>タグ</th>*/}
            <th className={styles.tableHeaderDate}>読んだ日</th>
            {/*<th className={styles.tableHeaderBtns}>詳細</th>*/}
          </tr>
        </thead>
        <tbody>
          {(rowsPerPage > 0
              ? state.readings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : state.readings
            ).map((reading, index) => (<Reading key={index} reading={reading} />)
          )}
        </tbody>
        <tfoot>
          <tr>
            <TablePagination
              rowsPerPageOptions={[5]}
              count={state.readings.length}
              page={page}
              onChangePage={handleChangePage}
              rowsPerPage={rowsPerPage}
            />
          </tr>
        </tfoot>
      </table>
  )
}

export default ReadingList;