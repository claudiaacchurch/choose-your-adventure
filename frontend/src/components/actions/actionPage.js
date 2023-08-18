import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

const ActionPage = ({ setScenario, setActions, setStatus, actions, scenario, status, navigate, setGenre}) => {
  const[selectedAction, setSelectedAction] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("action",selectedAction);

  const selectAction = (e) => {
    e.preventDefault();
    setSelectedAction(e.target.value);
  };

  useEffect(() => {
    if (selectedAction !== "") {
      setLoading(true);
      actionApirequest();
    }
  }, [selectedAction]);

  useEffect(() => {
    if (scenario === "") {
      setLoading(true);
    }
    else {
      setLoading(false);
    }
  }, [scenario]);
  
  const actionApirequest = async () => {
    fetch("http://localhost:8080/action", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: selectedAction }),
    }).then(async (response) => {
      let data = await response.json();
      setScenario(data.response.setting);
      setActions(data.response.actions);
      setStatus(data.response.status);
      setLoading(false);
    });
  };

  const startAgain = () => {
    setStatus("Continue")
    setSelectedAction("")
    setScenario("")
    navigate("/")
  }

    return (
    <>
    {loading ? 
    <div>
      <PacmanLoader
      color="black"
      loading={loading}
      size={25} 
      speedMultiplier={2}
      aria-label="Pacman Spinner"
      className="loader" />  
    </div> : 
      <div>
        <div className="scenario">
          <p>{scenario}</p>
        </div>
        { status !== "Continue" ?
        <div>
          { status === "Game Over" ?
            <p>
              Game Over
            </p> :
            <p>
              Congratulations! You Won!
            </p>
          }
        </div> :
          <div>
            <Button
              className="action1-btn"
              variant="text"
              color="primary"
              value={`${actions[0]}`}
              onClick={selectAction}
            >
              {actions[0]}
            </Button>
            <Button
              className="action2-btn"
              variant="text"
              color="primary"
              value={`${actions[1]}`}
              onClick={selectAction}
            >
              {actions[1]}
            </Button>
            <Button
              className="action3-btn"
              variant="text"
              color="primary"
              value={`${actions[2]}`}
              onClick={selectAction}
            >
              {actions[2]}
            </Button> 
          </div> 
          }
          <div>
            <Button
              className="start-again-btn"
              variant="text"
              color="success"
              onClick={startAgain}
            >
              Start A New Game
            </Button> 
          </div>
      </div>
    }
    </>
  )
};

export default ActionPage;
