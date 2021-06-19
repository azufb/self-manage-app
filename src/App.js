import React, { useEffect, useReducer } from 'react';
//import './App.css';
import Navi from "./components/Navi";
import reducer from "./reducers";
import AppContext from './contexts/AppContext';

const JSON_KEYWORD = "events";

const App = () => {
  const appState = localStorage.getItem(JSON_KEYWORD); // 何もなければ、nullが返ってくる。
  const initialState = appState ? JSON.parse(appState) : {
    events: []
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem(JSON_KEYWORD, JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }} >
      <div className="App-header">
        <Navi />
      </div>
    </AppContext.Provider>
  );
}

export default App;