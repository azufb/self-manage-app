import React, { useEffect, useReducer } from 'react';
import Navi from "./components/Navi";
import reducer from "./reducers";
import AppContext from './contexts/AppContext';
import styles from "./styles/App.css";

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
      <div className={styles.header}>
        <Navi />
        <footer>&copy;2021 Azusa Okamoto.</footer>
      </div>
    </AppContext.Provider>
  );
}

export default App;