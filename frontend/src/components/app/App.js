import Homepage from '../homepage/Homepage'
import "./App.css";
import * as React from "react";
import { useState } from "react";
import ToggleHowToPlay from "../howToPlay.js/toggleHowto";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <div className="App">
        <ToggleHowToPlay></ToggleHowToPlay>
      </div>
    </Routes>
  );
};

export default App;
