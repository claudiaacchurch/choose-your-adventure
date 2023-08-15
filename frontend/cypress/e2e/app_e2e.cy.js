describe('App', () => {
    it('renders learn react link', () => {
      // Navigate to the page where your React app runs. 
      // Assuming it's running on localhost:3000. Modify the URL if needed.
      cy.visit('http://localhost:3000');
  
      // Check if the element containing text "learn react" is visible
      cy.contains(/learn react/i).should('be.visible');
    });
  });
  