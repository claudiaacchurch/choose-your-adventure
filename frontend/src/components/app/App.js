import Homepage from "../homepage/Homepage";
import ActionPage from "../actions/actionPage";
import "./App.css";
import * as React from "react";
import { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const App = () => {
  const [scenario, setScenario] = useState("");
  const [actions, setActions] = useState([]);
  const navigate = useNavigate();

  return (
        <body>
        <Routes>
          <Route
            path="/"
            element={<Homepage setScenario={setScenario} setActions={setActions} navigate={navigate} />}
          />
          <Route
            path="/genre"
            element={<ActionPage scenario={scenario} actions={actions} setScenario={setScenario} setActions={setActions} navigate={navigate} />}
          />
          <Route
            path="/action"
            element={<ActionPage scenario={scenario} actions={actions} setScenario={setScenario} setActions={setActions} navigate={navigate} />}
          />
        </Routes>
        </body>
  );
};

export default App;
