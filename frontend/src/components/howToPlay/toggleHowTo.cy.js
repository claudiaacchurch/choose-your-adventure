import ToggleHowToPlay from "./toggleHowTo";

describe("Centered Content Test", () => {
  it("should display default content when not toggled", () => {
    cy.mount(<ToggleHowToPlay/>)
    cy.get(".content").should("not.exist");
  });

  it("should display expanded content when toggled", () => {
    cy.mount(<ToggleHowToPlay/>)
    cy.get(".toggleButton").click();
    cy.get(".content").should("be.visible");
    cy.get(".content").contains(
      "To begin please click one of the three genres to decide what type of adventure you want to begin! Then you will have three options to choose for your character to take, click on the one that seems best. Be sure to choose wisely as any mistake could end in disaster for you and end your game.... Enjoy!"
    );
  });
});



