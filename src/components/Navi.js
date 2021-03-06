import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import Home from "./Home";
import EventManage from "./EventManage";
import ReadingRecord from './ReadingRecord';
import HomeIcon from '@material-ui/icons/Home';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import BookIcon from '@material-ui/icons/Book';
import styles from "../styles/Navi.css";

const Navi = () => {
  return (
    <div className={styles.total}>
      <Router>
        <div className={styles.sideNavi}>
          <div className={styles.side}>
            <div className={styles.navi}>
              <NavLink exact to="/" activeClassName={styles.activeNavi}>
                <span className={styles.naviTitle}><HomeIcon /><span>RecMe！</span></span>
              </NavLink>
            </div>
            <div className={styles.navi}>
              <NavLink to="/Events" activeClassName={styles.activeNavi}>
                <span className={styles.naviTitle}><EventAvailableIcon /><span>Events</span></span>
              </NavLink>
            </div>
            <div className={styles.navi}>
              <NavLink to="/Readings" activeClassName={styles.activeNavi}>
                <span className={styles.naviTitle}><BookIcon /><span>Readings</span></span>
              </NavLink>
            </div>
            <footer>&copy;2021 Azusa.</footer>
          </div>
          <Switch>
            <Route path="/Events">
              <EventManage />
            </Route>
            <Route path="/Readings">
              <ReadingRecord />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default Navi;