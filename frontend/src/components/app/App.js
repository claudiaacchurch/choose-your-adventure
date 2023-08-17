import Homepage from "../homepage/Homepage";
import ActionPage from "../actions/actionPage";
import "./App.css";
import * as React from "react";
import { useState } from "react";
import ToggleHowToPlay from "../howToPlay/toggleHowTo";
import { useNavigate, Routes, Route } from "react-router-dom";

const App = () => {
  const [scenario, setScenario] = useState("");
  const [actions, setActions] = useState([]);
  const [status, setStatus] = useState("Continue");
  // const [genre, setGenre] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              setScenario={setScenario}
              setActions={setActions}
              navigate={navigate}
            />
          }
        />
        <Route
          path="/genre"
          element={
            <ActionPage
              // genre={genre}
              // setGenre={setGenre}
              scenario={scenario}
              actions={actions}
              setScenario={setScenario}
              setActions={setActions}
              setStatus={setStatus}
              navigate={navigate}
            />
          }
        />
        <Route
          path="/action"
          element={
            <ActionPage
              // setGenre={setGenre}
              scenario={scenario}
              actions={actions}
              setScenario={setScenario}
              setActions={setActions}
              setStatus={setStatus}
              status={status}
              navigate={navigate}
            />
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
