import React, { useReducer } from 'react';
import './App.css';
import Navi from "./components/Navi";
import reducer from "./reducers";
import AppContext from './contexts/AppContext';

const App = () => {
  const initialState = {
    events: []
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }} >
      <div className="App-header">
        <Navi />
      </div>
    </AppContext.Provider>
  );
}

export default App;