describe('full e2e test', () => {
  
    it('Starts on Homepage, Chooses Genre, Chooses Character, Renders Actions then Starts a new game', () => {
       cy.visit("http://localhost:3000/")
       cy.contains('Infinity Trails'); 
        cy.contains("Fantasy").click()
        cy.contains("Wizard").click()
        cy.wait(7000)
          cy.contains("you").should("be.visible")
        cy.contains("Start").click()
        cy.contains("Choose Genre").should("be.visible")
    });
  });