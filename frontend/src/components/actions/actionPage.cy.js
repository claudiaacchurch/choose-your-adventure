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
    it("can make a POST request with the selected action", () => {
        cy.mount(<ActionPage scenario={"TEST SCENARIO"} actions={["DO THIS", "DO THAT", "DO THE OTHER THING"]} status={"Continue"}/>);
        cy.intercept({
            method:'POST',
            url:'http://localhost:8080/action'
        }).as('postActionRequest')
        cy.get(".action2-btn").click()
        cy.wait('@postActionRequest')
            .its('request.body.action').should('equal',"DO THAT")
    });
    it("can make a POST request that returns the status", () => {
        cy.mount(<ActionPage scenario={"TEST SCENARIO"} actions={["DO THIS", "DO THAT", "DO THE OTHER THING"]} status={"Continue"} />);
        cy.intercept({
            method:'POST',
            url:'http://localhost:8080/action'
            }, "{setting: 'This is the setting mock',actions: ['action1', 'action2', 'action3'],status: 'Continue'}"
        ).as('postActionRequest')
        cy.get(".action2-btn").click()
        cy.wait('@postActionRequest')
            .its('response.body').should('contain',"status")
    });
    it("shows the Start Again button when status is Game Over", () => {
        cy.mount(<ActionPage scenario={"TEST SCENARIO"} actions={["DO THIS", "DO THAT", "DO THE OTHER THING"]} status={"Continue"} />);
        cy.intercept('POST','/action',(req) => {
            req.body = { action: "DO THAT" }
            req.reply({
                body: {
                response: {
                    setting: 'This is the setting mock',
                    actions: ['','',''],
                    status: 'Game Over'
                }}
            })
        }).as('postActionRequest')
        cy.get(".action2-btn").click()
        cy.wait('@postActionRequest')
        cy.get("start-again-btn").should('exist')
    });
})
