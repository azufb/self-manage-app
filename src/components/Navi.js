import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./Home";
import EventManage from "./EventManage";

const Navi = () => {
  return (
    <Router>
      <div>
        <h1>
          <Link to="/">Self-Manage</Link>
        </h1>
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/Event">Event</Link>
          </li>
        </ul>
      </div>
      <Switch>
        <Route path="/Event">
          <EventManage />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default Navi;