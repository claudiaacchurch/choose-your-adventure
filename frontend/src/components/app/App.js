import Homepage from '../homepage/Homepage'
import "./App.css";
import * as React from "react";
import { useState } from "react";
import ToggleHowToPlay from "../howToPlay/toggleHowTo";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
      </Routes>
      <div className="App">
        <ToggleHowToPlay></ToggleHowToPlay>
      </div>
    </>
  );
};

export default App;
