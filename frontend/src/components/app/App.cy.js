import App from './App';
import React from 'react';

describe('App Component', () => {
  it('renders learn react link', () => {
    // Intercept and mock an API call
    cy.intercept('GET', '/api-endpoint-that-app-uses', {
      body: { /* the mock data that will make App render "learn react" */ },
      headers: { 'access-control-allow-origin': '*' },
      statusCode: 200
    });

    // Mount the component
    cy.mount(<App />);

    // Assert that the text is displayed in the component
    cy.contains(/learn react/i).should('be.visible');
  });
});
