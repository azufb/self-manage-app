import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import Home from "./Home";
import EventManage from "./EventManage";
import styles from "../styles/Navi.css";

const Navi = () => {
  return (
    <div className={styles.total}>
      <Router>
        <div className={styles.sideNavi}>
          <div className={styles.side}>
            <div className={styles.navi}>
              <NavLink exact to="/" activeClassName={styles.activeNavi}>Self Manage</NavLink>
            </div>
            <div className={styles.navi}>
              <NavLink to="/Events" activeClassName={styles.activeNavi}>Events</NavLink>
            </div>
            <footer>&copy;2021 Azusa.</footer>
          </div>
          <Switch>
            <Route path="/Events">
              <EventManage />
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