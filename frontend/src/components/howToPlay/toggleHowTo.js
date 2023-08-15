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

/*
import App from "../App";
import react from "react";

describe("Centered Content Test", () => {
  beforeEach(() => {
    cy.visit("/"); // Adjust this URL to match your application's URL
  });

  it("should display default content when not toggled", () => {
    cy.get(".content").should("not.be.visible");
  });

  it("should display expanded content when toggled", () => {
    cy.get(".toggleButton").click();
    cy.get(".content").should("be.visible");
    cy.get(".content").contains(
      "To begin please click one of the three genres to decide what type of adventure you want to begin! Then you will have three options to choose for your character to take, click on the one that seems best. Be sure to choose wisely as any mistake could end in disaster for you and end your game.... Enjoy!"
    );
  });
});

*/

export default ToggleHowToPlay;
