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

    it('a task can be completed from my pending task', function () {
        cy.get("#thirdPartyTilesContainer").contains("My Pending Tasks").click();
        // cy.contains('Task Description').should('be.visible')
        cy.get('[aria-describedby="jqDrawerGrid_TaskDescription"]').first().click({force:true})
        cy.get('.basic-content > .checkbox').first().click()
        cy.get('[data-bind="textInput: Notes"]').type('Test')
        cy.get('#modalDialogConfirmButton').click();
        cy.get('.checkbox > .fa').should('be.visible');

        cy.get('.banner-text').then($element => {
            if ($element.is(':visible')) {
                // cy.wrap($element).click()
                cy.get('#tasks-banner > .btn-submit').click()
            }
          });

    });

    it('should be able to create a thirdParty', function () {
        cy.contains('Create Third-Party').click();
        cy.get('#ClientAccountId').should('be.visible');
        cy.selectFirstItem('#ClientAccountId');
        cy.contains(' Company Third-Party').click();
        cy.get('input[typeaheadname="CompanyName"]').type(chance.company());
        cy.contains("Continue").click();
        cy.get('.btn-next-step').click();
        cy.contains('ScreenIQ').click();
        cy.get('#nextStepButton').click();
        cy.get('#nextStepButton').click();
        cy.get('#submitOrderButton').click();
        cy.get('#coreDetailsForm').should('be.visible')
    });
    it('clicking on monitoring alert should take user to monitor page and should be available ', function () {
        cy.get("#thirdPartyTilesContainer").contains("Unread Monitoring Alerts").click();
        cy.get('.event-row').should('be.visible')

    });




});