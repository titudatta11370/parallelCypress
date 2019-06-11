// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************


// -- This is a parent command --
Cypress.Commands.add("login", (email, password) => {
    const baseURL = Cypress.env("stage").url;

    cy.visit(baseURL);
    cy.wait(1000);

    cy.get('#UserName').type(email);
    cy.get('#auth-continue-button').click();
    cy.get('#Password').type(password);
    cy.get('#auth-submit-button').click()
     })


// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
