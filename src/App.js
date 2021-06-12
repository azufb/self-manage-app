import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {

  return (
    <div className="App-header">
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
            <Event />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}