import Chance from 'chance';
// Instantiate Chance so it can be used
const chance = new Chance();

describe('Login test case', function () {


    const baseURL = Cypress.env("stage").url;

    context('Unsuccessful login', function () {
        before(function () {
            cy.visit(baseURL);
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


        it('should have six right navigation panel', function () {
            cy.get('#thirdPartyTilesContainer').find('li').should('have.length', 6)

        });
        it('should be able to sign off', function () {
            cy.contains('Log Off').click({force: true});
            cy.contains('Username').should('be.visible')

        });
        it('should have the dashboard section metrics', function () {
            cy.get(".dashboard-section-metrics").should('be.visible')

        });

        it('Clicking and closing right nav panel', function () {

            cy.get("#thirdPartyTilesContainer").contains("Questionnaires Outstanding").click();
            cy.contains("Questionnaire Sent");
            cy.get('#thirdPartyTilesDrawer').contains('Close').click({force: true});
            cy.get('#gview_jqDrawerGrid').should('not.be.visible')

        })
    });
});