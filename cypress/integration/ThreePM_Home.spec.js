describe('Login test case', function () {

    const username = 'support3@exiger.com'
    const password = 'Admin1234$'


    context('Unsuccessful login', function () {
        beforeEach(function () {
            cy.visit(Cypress.config().baseUrl)
            cy.wait(1000)
        })

        it('displays errors on login for incorrect username/password', function () {
            // incorrect username on purpose

            cy.server()
            cy.route({
                method : 'POST',
                url : '/Auth/Login',
                response : '',
                status : 302
            })

            cy.get('#UserName').type('Test')
            cy.get('#auth-continue-button').click()
            cy.get('#Password').type('password123{enter}')
            cy.get('#auth-submit-button').click()
            // we should have visible errors now
            cy.contains('The username or password you entered is incorrect')

            // and still be on the same URL
            cy.url().should('include', '/Auth/Login')
        });
    })

    context('Successful login', function () {
        beforeEach(function () {
            cy.visit(Cypress.config().baseUrl)
            cy.wait(1000)

            cy.get('#UserName').type(username)
            cy.get('#auth-continue-button').click()
            cy.get('#Password').type(password)
            cy.get('#auth-submit-button').click()
        })

        it('redirects to /dashboard on success', function () {

            cy.document().contains('Dashboard')
        })

        it('Clicking and closing right nav panel', function () {

            cy.get("#thirdPartyTilesContainer").contains("Questionnaires Outstanding").click()
            cy.document().contains("Order Status")
            cy.get('#thirdPartyTilesDrawer').contains('Close').click({force: true})
            cy.document().contains("Order Status").should('not.be.visible')
        })

        it('should have six right navigation panel', function () {
            cy.get('#thirdPartyTilesContainer').find('li').should('have.length', 6)

        })
        it('should be able to sign off', function () {
            cy.contains('Log Off').click({force : true})
            cy.contains('Username').should('be.visible')

        });
    })
})