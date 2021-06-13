import React from 'react';
import './App.css';
import Navi from "./components/Navi";

export default function App() {
  const initialState = {
    events: []
  }

  return (
    <div className="App-header">
      <Navi />
    </div>
  );
}