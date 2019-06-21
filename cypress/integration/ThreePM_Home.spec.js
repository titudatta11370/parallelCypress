import Chance from 'chance';
// Instantiate Chance so it can be used
const chance = new Chance();

describe('Home page functionalities', function () {

    beforeEach(function () {
        cy.login()

    });

    it('user should be able to click on quesitonnaires outstanding ' +
        'and go to 3pm details page', function () {
        cy.get("#thirdPartyTilesContainer").contains("Questionnaires Outstanding").click();
        cy.contains('Questionnaire Sent').click({force: true});
        cy.contains('At a Glance').should('be.visible')

    });
    it('should be able to create a thirdParty for Exiger Express', function () {

        cy.contains('Create Third-Party').click();
        cy.get('#ClientAccountId').should('be.visible');
        cy.selectFirstItem('#ClientAccountId');
        cy.contains(' Company Third-Party').click();
        cy.get('input[typeaheadname="CompanyName"]').type(chance.company());
        cy.contains("Continue").click();
        if (window.top.Cypress) {
        }
        // cy.contains("Continue").click()
        cy.get('.btn-next-step').click();
        cy.contains('Exiger Express').click();
        cy.get('#SurveyRecipientFirstName-0').type(chance.name({first: true}));
        cy.get('#SurveyRecipientLastName-0').type(chance.name({last: true}));
        cy.get('#SurveyRecipientEmailAddress-0').type(chance.email());
        cy.get('.btn-next-step').click();
        cy.get('#submitOrderButton').click();
        cy.get('#coreDetailsForm').should('be.visible')
    });

    it('clicking on monitoring alert should take user to monitor page and should be available ', function () {
        cy.get("#thirdPartyTilesContainer").contains("Unread Monitoring Alerts").click();
        cy.get('.event-row').should('be.visible')

    });

});