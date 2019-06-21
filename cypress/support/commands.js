Cypress.Commands.add("login", () => {
    cy.visit("")
    cy.get('#UserName').type(Cypress.env('stageUser'));
    cy.get('#auth-continue-button').click();
    cy.get('#Password').type(Cypress.env('stagePass'));
    cy.get('#auth-submit-button').click()
})

Cypress.Commands.add("selectFirstItem", (selector) => {
    cy.get(selector).then(($select) => {
        const opt = $select.find('option')
        $select.val(opt.attr('value'))
        return $select
    }).trigger('change')
})



