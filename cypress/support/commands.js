
Cypress.Commands.add("loginByToken", function (token, login, password) {
    cy.request({
      method: "POST",
      url: '/Auth/Login',
      failOnStatusCode: false,
      form: true,
      body: {
        UserName: login,
        Password: password,
        __RequestVerificationToken: token,
        RememberLogin: false
      }
    })
  })




Cypress.Commands.add("login", () => {
    cy.request('/')
    .its("body")
    .then((body) => {
      const $html = Cypress.$(body)
      const token = $html.find("input[name=__RequestVerificationToken]").val()
      cy.loginByToken(token, "manager@brightlineqa.com", "Admin1234$")
        .then((resp) => {
          expect(resp.status).to.eq(200)
        })
    })
})

Cypress.Commands.add("MonitoringLogin", () => {
  cy.request('/')
  .its("body")
  .then((body) => {
    const $html = Cypress.$(body)
    const token = $html.find("input[name=__RequestVerificationToken]").val()
    cy.loginByToken(token, "exuserone@exiger.com", "Admin123!")
      .then((resp) => {
        expect(resp.status).to.eq(200)
      })
  })
})



Cypress.Commands.add("createThirdparty", (DDProduct)=>{
        const exp = new RegExp(`^(${DDProduct})`, "g")
        cy.contains('Create Third-Party').click();
        cy.get('#ClientAccountId').should('be.visible');
        cy.selectFirstItem('#ClientAccountId');
        cy.contains(' Company Third-Party').click();
        cy.get('input[typeaheadname="CompanyName"]').type(chance.company());
        cy.contains("Continue").click();
        cy.get('.btn-next-step').click();
        // cy.get(".product-types-container").contains(DDProduct).should('eq', DDProduct).click()
        cy.get(".product-types-container").contains(exp).click()
        // cy.contains("DDIQ").click();
        cy.get('#nextStepButton').click();
        cy.get('#nextStepButton').click();
        cy.get('#submitOrderButton').click();
        cy.get('#coreDetailsForm').should('be.visible')
})

Cypress.Commands.add("selectFirstItem", (selector) => {
    cy.get(selector).then(($select) => {
        const opt = $select.find('option')
        $select.val(opt.attr('value'))
        return $select
    }).trigger('change')

    });
Cypress.Commands.add("waitUntilLoadingIsNotVisible",() => {
    cy.get('.loading > img').should('not.be.visible')

})



