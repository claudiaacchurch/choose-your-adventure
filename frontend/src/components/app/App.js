import Homepage from "../homepage/Homepage";
import Genre from "../genre/Genre";
import "./App.css";
import * as React from "react";
import { useState } from "react";
import ToggleHowToPlay from "../howToPlay/toggleHowTo";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const [scenario, setScenario] = useState("");
  const [actions, setActions] = useState([]);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Homepage setScenario={setScenario} setActions={setActions} />
          }
        />
      </Routes>
      <div className="App">
        <ToggleHowToPlay></ToggleHowToPlay>
      </div>
    </>
  );
};

export default App;
