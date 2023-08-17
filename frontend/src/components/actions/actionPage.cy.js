import ActionPage from "./actionPage";


describe("Action Page", () => {
    it("Shows the Loading gif when there is no scenario", () => {
        cy.mount(<ActionPage scenario={""} actions={""} />);
        cy.get(".loader").should("exist")
    });
    it("hides the Loading gif when the scenario is set", () => {
        cy.mount(<ActionPage scenario={"Scenario"} actions={["action1", "action2"]} />);
        cy.get(".loader").should("not.exist")
    });
    it("can make a POST reqeust with the selected action", () => {
        cy.mount(<ActionPage scenario={"TEST SCENARIO"} actions={["DO THIS", "DO THAT", "DO THE OTHER THING"]} />);
        cy.intercept({
            method:'POST',
            url:'http://localhost:8080/action'
        }).as('postActionRequest')
        cy.get(".action2-btn").click()
        cy.wait('@postActionRequest')
            .its('request.body.action').should('equal',"DO THAT")
    });
})