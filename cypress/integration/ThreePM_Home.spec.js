describe('Login test case', function () {

    const baseURL = Cypress.env("stage").url;


    // context('Unsuccessful login', function () {
    //     beforeEach(function () {
    //         cy.visit(baseURL);
    //         cy.wait(1000)
    //     });
    //
    //     it('displays errors on login for incorrect username/password', function () {
    //         // incorrect username on purpose
    //
    //         cy.get('#UserName').type('Test');
    //         cy.get('#auth-continue-button').click();
    //         cy.get('#Password').type('password123{enter}');
    //         cy.get('#auth-submit-button').click();
    //         // we should have visible errors now
    //         cy.contains('The username or password you entered is incorrect');
    //
    //         // and still be on the same URL
    //         cy.url().should('include', '/Auth/Login')
    //     });
    // });
    //
    // context('Successful login', function () {
    //
    //
    //     beforeEach(function () {
    //         cy.visit(baseURL);
    //         cy.wait(1000);
    //
    //         cy.get('#UserName').type(Cypress.env('user'));
    //         cy.get('#auth-continue-button').click();
    //         cy.get('#Password').type(Cypress.env('pass'));
    //         cy.get('#auth-submit-button').click()
    //
    //     });
    //
    //
    //     it('redirects to /dashboard on success', function () {
    //
    //         cy.document().contains('Dashboard')
    //     });
    //
    //     it('Clicking and closing right nav panel', function () {
    //
    //         cy.get("#thirdPartyTilesContainer").contains("Questionnaires Outstanding").click();
    //         cy.document().contains("Order Status");
    //         cy.get('#thirdPartyTilesDrawer').contains('Close').click({force: true});
    //         cy.document().contains("Order Status").should('not.be.visible')
    //     });
    //
    //     it('should have six right navigation panel', function () {
    //
    //         cy.get('#thirdPartyTilesContainer').
    //         find('li').
    //         should('have.length', 6)
    //
    //     });
    //     it('should be able to sign off', function () {
    //         cy.contains('Log Off').click({force: true});
    //         cy.contains('Username').should('be.visible')
    //
    //     });
    //     it('should have the dashboard section metrics', function () {
    //         cy.get(".dashboard-section-metrics").should('be.visible')
    //
    //     });
    // });
    context('Home page functionalities', function () {

        beforeEach(function () {
            cy.visit(baseURL);
            cy.wait(1000);

            cy.get('#UserName').type(Cypress.env('user'));
            cy.get('#auth-continue-button').click();
            cy.get('#Password').type(Cypress.env('pass'));
            cy.get('#auth-submit-button').click()

        });

        it('user should be able to click on quesitonnaires outstanding ' +
            'and go to 3pm details page', function () {
            cy.get("#thirdPartyTilesContainer").contains("Questionnaires Outstanding").click();
            cy.contains('Questionnaire Sent').click({force: true})
            cy.contains('At a Glance').should('be.visible')

        });
    })
});