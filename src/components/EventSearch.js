import React, { useContext, useState } from "react";
import AppContext from "../contexts/AppContext";
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import Modal from "@material-ui/core/Modal";
import TablePagination from '@material-ui/core/TablePagination';
import styles from "../styles/EventSearch.css";

const EventSearch = () => {

  const { state } = useContext(AppContext);
  const [searchName, setSearchName] = useState("");
  const [searchedList, setSearchedList] = useState([]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);

  const handleChangePage = (e, newPage) => {
    e.preventDefault();
    setPage(newPage);
  };

  const handleSearch = () => {
    //const regExp = new RegExp(`${searchName}`, "g");
  
    setSearchedList(state.events.filter(item => {
      //const result = item.name.match(regExp);
      return item.name === searchName;
      //return result;
    }));

    setSearchName("");
    setOpen(true);
  }

  const handleClear = () => {
    setSearchName("");
    setSearchedList([]);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const disableSearch = searchName === "";

  return (
    <div className={styles.contents}>
      <form className={styles.formContent}>
        <div>
          <label htmlFor="searchForm">検索</label>
        </div>
        <input type="text" id="searchForm" value={searchName} onChange={(e) => setSearchName(e.target.value)}
          placeholder="検索したいイベント名の一部または全てをこちらに入力してください。" className={styles.searchInput} />
        <div className={styles.btns}>
          <span className={styles.searchBtn}>
            <Button onClick={handleSearch} variant="contained" size="medium" color="default"
              startIcon={<SearchIcon />} disabled={disableSearch}>
              <strong>検索</strong>
            </Button>
          </span>
          <span className={styles.searchBtn}>
            <Button onClick={handleClear} variant="contained" size="medium" color="default">
              <strong>クリア</strong>
            </Button>
          </span>
        </div>
      </form>
      <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
        <div className={styles.modalBody}>
          <table>
            <thead>
              <tr className={styles.tableHeader}>
                <th className={styles.tableHeaderID}>No.</th>
                <th className={styles.tableHeaderName}>イベント名</th>
                <th className={styles.tableHeaderTag}>タグ</th>
                <th className={styles.tableHeaderDate}>参加日</th>
                <th className={styles.tableHeaderComment}>コメント</th>
                <th className={styles.tableHeaderURL}>URL</th>
              </tr>
            </thead>
            <tbody>
              {searchedList.length === 0 ? (
                <tr>
                  <td colSpan={6}>表示する検索結果はありません。</td>
                </tr>
              ):(
                <React.Fragment>
                  {(rowsPerPage > 0
                    ? searchedList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : searchedList)
                    .map((searchedItem, index) => (
                      <React.Fragment key={index}>
                        <tr key={index}>
                          <td className={styles.id}>{searchedItem.id}</td>
                          <td>{searchedItem.name}</td>
                          <td className={styles.tags}>
                            <p className={styles.tagArea}>
                              <span className={styles.tag}>{searchedItem.tag1}</span><br />
                              <span className={styles.tag}>{searchedItem.tag2}</span>
                            </p>
                          </td>
                          <td className={styles.date}>{searchedItem.date}</td> 
                          <td>
                            { (searchedItem.comment).length > 10 ? ((searchedItem.comment).substr(0, 10) + "...")
                              :(searchedItem.comment)
                            }
                          </td>
                          <td>
                            <a href={searchedItem.url} className={styles.link} target="_blank" rel="noopener noreferrer">
                              {
                                (searchedItem.url).length > 30 ? ((searchedItem.url).substr(0, 30) + "...")
                                :(searchedItem.url)
                              }
                            </a>
                          </td>
                        </tr>
                      </React.Fragment>
                    )
                  )}
                </React.Fragment>
                )}
            </tbody>
            <tfoot>
              <tr>
                <TablePagination
                  rowsPerPageOptions={[5]}
                  count={searchedList.length}
                  page={page}
                  onChangePage={handleChangePage}
                  rowsPerPage={rowsPerPage}
                />
              </tr>
              <tr>
                <td colSpan={6}>
                  <div className={styles.btnsInModal}>
                    <div className={styles.btnModal}>
                      <Button variant="contained" color="default" onClick={handleClose}
                        startIcon={<CloseIcon />}>
                        <strong>とじる</strong>
                      </Button>
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Modal>
    </div>
  )
}

export default EventSearch;