// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Third-party Commands
import "@testing-library/cypress/add-commands";

// Custom Commands
Cypress.Commands.add("login", (email = "michael@example.com") => {
  cy.window().then(() => {
    cy.request({
      method: "POST",
      url: "https://myfakesite.com",
      body: {
        user: "scott",
        email,
      },
    }).then((res) => {
      Cypress.log({
        name: "Logged In",
      });

      // Do something with response, such as add user to local storage
    });
  });
});
