import Homepage from "../homepage/Homepage"
const navigate = () => {}

describe("Genre", () => {
    it("Fantasy button mounts", () => {
        cy.mount(<Homepage navigate={navigate}/>);
        cy.get(".fantasy-btn").should("contain.text","Fantasy")
    });
});

describe("Picking up genre component and actions", () => {
    it('User can pick a genre Fantasy to progress', () => {
        cy.intercept({
            method: 'POST',
            url: '/genre'
        }).as('postGameStart');
        cy.mount(<Homepage navigate={navigate}/>);
        cy.get(".fantasy-btn").click();
        cy.wait('@postGameStart').its('request.body').should('deep.equal', {
            genre: "fantasy"
    });
});

    it('User can pick a genre Noir to progress', () => {
        cy.intercept({
            method: 'POST',
            url: '/genre'
        }).as('postGameStart');
        cy.mount(<Homepage navigate={navigate}/>);
        cy.get(".noir-btn").click();
        cy.wait('@postGameStart').its('request.body').should('deep.equal', {
            genre: "noir"
        });
    });

    it('User can pick a genre Space to progress', () => {
        cy.intercept({
            method: 'POST',
            url: '/genre'
        }).as('postGameStart');
        cy.mount(<Homepage navigate={navigate}/>);
        cy.get(".space-btn").click();
        cy.wait('@postGameStart').its('request.body').should('deep.equal', {
            genre: "space"
        });
    }
)});