import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const ActionPage = ({ setScenario, setActions, actions, scenario }) => {
  const[selectedAction, setSelectedAction] = useState("");
  const [loading, setLoading] = useState(true);

  console.log("state0",selectedAction);

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

  const actionApirequest = async () => {
    fetch("http://localhost:8080/action", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: selectedAction }),
    }).then(async (response) => {
      let data = await response.json();
      setScenario(data.response.setting);
      setActions(data.response.actions);
      setLoading(false);
    });
  };

    return (
    <>
    {loading || selectedAction === "" ? 
    <div>
      <ClipLoader
      color="black"
      loading={loading}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader" />  
    </div> : 
      <div>
        <div className="scenario">
          <p>{scenario}</p>
        </div>
        <Button
          className="fantasy-btn"
          variant="text"
          color="primary"
          value={`${actions[0]}`}
          onClick={selectAction}
        >
          {actions[0]}
        </Button>
        <Button
          className="noir-btn"
          variant="text"
          color="primary"
          value={`${actions[1]}`}
          onClick={selectAction}
        >
          {actions[1]}
        </Button>
        <Button
          className="space-btn"
          variant="text"
          color="primary"
          value={`${actions[2]}`}
          onClick={selectAction}
        >
          {actions[2]}
        </Button> 
      </div>
    }
    </>
  )
};

export default ActionPage;
