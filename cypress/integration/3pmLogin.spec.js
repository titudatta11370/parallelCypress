import Chance from 'chance';
// Instantiate Chance so it can be used
const chance = new Chance();

describe('Login test case', function () {


    // const baseURL = Cypress.env("prod").url;

    context('Unsuccessful login', function () {
        before(function () {
            cy.visit("")
            cy.wait(1000)
        });

        it('displays errors on login for incorrect username/password', function () {
            // incorrect username on purpose

            cy.get('#UserName').type('Test');
            cy.get('#auth-continue-button').click();
            cy.get('#Password').type('password123{enter}');
            cy.get('#auth-submit-button').click();
            // we should have visible errors now
            cy.contains('The username or password you entered is incorrect');

            // and still be on the same URL
            cy.url().should('include', '/Auth/Login')
        });
    });

    context('Successful login', function () {

        beforeEach(function () {
            cy.login()

        });

        it('redirects to /dashboard on success', function () {
            cy.document().contains('Dashboard')
        });

        it('should be able to sign off', function () {
            cy.contains('Log Off').click({force: true});
            cy.contains('Username').should('be.visible')

        });
    });
});