Cypress.Commands.add("login", () => {
    const baseURL = Cypress.env("stage").url;
    const userName = Cypress.env('user')
    const passWord = Cypress.env('pass')

    cy.visit(baseURL);
    // cy.wait(1000);
    cy.url().should('eq', baseURL)
    cy.get('#UserName').type(userName);
    cy.get('#auth-continue-button').click();
    cy.get('#Password').type(passWord);
    cy.get('#auth-submit-button').click()
})



