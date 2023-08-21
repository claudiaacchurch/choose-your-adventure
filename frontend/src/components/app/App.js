import Homepage from "../homepage/Homepage";
import ActionPage from "../actions/actionPage";
import "./App.css";
import * as React from "react";
import { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";

const App = () => {
  const [scenario, setScenario] = useState("");
  const [actions, setActions] = useState([]);
  const [status, setStatus] = useState("Continue");
  const [imgClass, setImgClass] = useState("");
  const navigate = useNavigate();

  return (

        <Routes>
          <Route
            path="/"
            element={<Homepage setScenario={setScenario} setActions={setActions} navigate={navigate} setImgClass={setImgClass}/>}
          />
          <Route
            path="/genre"
            element={<ActionPage scenario={scenario} actions={actions} setScenario={setScenario} setActions={setActions} setStatus={setStatus}  navigate={navigate} setImgClass={setImgClass}/>}
          />
          <Route
            path="/action"
            element={<ActionPage scenario={scenario} actions={actions} setScenario={setScenario} setActions={setActions} setStatus={setStatus} status={status} imgClass={imgClass} navigate={navigate} />}
          />
        </Routes>

  );
};

export default App;
