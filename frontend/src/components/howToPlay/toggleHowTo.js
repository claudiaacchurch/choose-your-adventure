import "./toggle.css";
import * as React from "react";
import { useState } from "react";

const ToggleHowToPlay = () => {
  const [isContentOpen, setContentOpen] = useState(false);
  const toggleContent = () => {
    setContentOpen(!isContentOpen);
  };
  return (
    <div className="ToggleHowToPlay">
      <button className="toggleButton" onClick={toggleContent}>
        {isContentOpen ? "Close" : "How to Play"}
      </button>
      {isContentOpen && (
        <div className="content">
          <h4>
            {" "}
            To begin please click one of the three genres to decide what type of
            adventure you want to begin! Then you will have three options to
            choose for your character to take, click on the one that seems best.
            Be sure to choose wisely as any mistake could end in disaster for
            you and end your game.... Enjoy!
          </h4>
        </div>
      )}
    </div>
  );
};

export default ToggleHowToPlay;