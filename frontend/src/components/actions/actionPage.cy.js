import ActionPage from "./actionPage";
let selectedAction = "";
const setScenario = () => {};
const setActions = () => {};
const setStatus = () => {};

describe("Action Page", () => {
  it("Shows the Loading gif when there is no scenario", () => {
    cy.mount(<ActionPage scenario={""} actions={""} />);
    cy.get(".loader").should("exist");
  });
  it("hides the Loading gif when the scenario is set", () => {
    cy.mount(
      <ActionPage
        scenario={"Scenario"}
        actions={["action1", "action2"]}
        setScenario={setScenario}
        setActions={setActions}
      />
    );
    cy.get(".loader").should("not.exist");
  });
  it("can make a POST request with the selected action", () => {
    cy.mount(
      <ActionPage
        scenario={"TEST SCENARIO"}
        actions={["DO THIS", "DO THAT", "DO THE OTHER THING"]}
        status={"Continue"}
        setScenario={setScenario}
        setActions={setActions}
      />
    );
    cy.intercept({
      method: "POST",
      url: "**/action",
    }).as("postActionRequest");
    cy.get(".action2-btn").click();
    selectedAction = "DO THAT";
    cy.wait("@postActionRequest")
      .its("request.body.action")
      .should("equal", "DO THAT");
  });
  it("can make a POST request that returns the status", () => {
    cy.mount(
      <ActionPage
        scenario={"TEST SCENARIO"}
        actions={["DO THIS", "DO THAT", "DO THE OTHER THING"]}
        status={"Continue"}
        setScenario={setScenario}
        setActions={setActions}
      />
    );
    cy.intercept(
      {
        method: "POST",
        url: "**/action",
      },
      "{setting: 'This is the setting mock',actions: ['action1', 'action2', 'action3'],status: 'Continue'}"
    ).as("postActionRequest");
    cy.get(".action2-btn").click();
    selectedAction = "action 2";
    cy.wait("@postActionRequest")
      .its("response.body")
      .should("contain", "status");
  });
  it("shows the Start Again button when status is Game Over", () => {
    cy.mount(
      <ActionPage
        scenario={"TEST SCENARIO"}
        actions={["DO THIS", "DO THAT", "DO THE OTHER THING"]}
        status={"Continue"}
        setScenario={setScenario}
        setActions={setActions}
        setStatus={setStatus}
      />
    );
    cy.intercept("POST", "**/action", (req) => {
      req.body = { action: selectedAction };
      req.reply({
        body: {
          response: {
            setting: "This is the setting mock",
            actions: ["", "", ""],
            status: "Game Over",
          },
        },
      });
    }).as("postActionRequest");
    cy.get(".action2-btn").click();
    selectedAction = "DO THAT";
    cy.wait("@postActionRequest");
    cy.get(".start-again-btn").should("exist");
  });
});
