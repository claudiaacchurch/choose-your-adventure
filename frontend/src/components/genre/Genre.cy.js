import Homepage from "../homepage/Homepage"
const navigate = () => {}

describe("Genre", () => {
    it("Fantasy button mounts", () => {
        cy.mount(<Homepage navigate={navigate}/>);
        cy.get(".Fantasy-btn").should("contain.text","Fantasy")
    });
});

describe("Picking up genre component and actions", () => {
    it('User can pick a genre Fantasy to progress', () => {
        cy.intercept({
            method: 'POST',
            url: '/genre'
        }).as('postGameStart');
        cy.mount(<Homepage navigate={navigate}/>);
        cy.get(".Fantasy-btn").click();
        cy.wait('@postGameStart').its('request.body').should('deep.equal', {
            genre: "Fantasy"
    });
});

    it('User can pick a genre Noir to progress', () => {
        cy.intercept({
            method: 'POST',
            url: '/genre'
        }).as('postGameStart');
        cy.mount(<Homepage navigate={navigate}/>);
        cy.get(".Noir-btn").click();
        cy.wait('@postGameStart').its('request.body').should('deep.equal', {
            genre: "Noir"
        });
    });

    it('User can pick a genre Space to progress', () => {
        cy.intercept({
            method: 'POST',
            url: '/genre'
        }).as('postGameStart');
        cy.mount(<Homepage navigate={navigate}/>);
        cy.get(".Space-btn").click();
        cy.wait('@postGameStart').its('request.body').should('deep.equal', {
            genre: "Space"
        });
    }
)});