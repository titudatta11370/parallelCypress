import Chance from 'chance';
// Instantiate Chance so it can be used
const chance = new Chance();

describe('Home page functionalities', function () {

    beforeEach(function () {
        cy.login()
        cy.visit('')
    });

    it('should have the dashboard section metrics', function () {
        cy.get(".dashboard-section-metrics").should('be.visible')

    }); 
    it('should have 16 language options', function(){
        cy.get('#languageSelection').find('li').should('have.length', 16)
    });

    it('should have six right navigation panel', function () {
        cy.get('#thirdPartyTilesContainer').find('li').should('have.length', 6)

    });
    it('should have batch upload functionalities', function(){
        cy.contains('Batch Upload').click({force: true});
        cy.get('#ClientAccountId').should('be.visible')
        cy.get('#File').should('be.visible')
        cy.get('#submitButton').should('be.visible')
        cy.get('#RecipientEmail').should('be.visible')
        cy.get('#jqGridBatchLog').should('be.visible')

    });

    it('should have Change Password functionalities', function(){
        cy.contains('Change Password').click({force: true});
        cy.get('#OriginalPassword').should('be.visible')
        cy.get('#NewPassword').should('be.visible')
        cy.get('#PasswordConfirmation').should('be.visible')
        cy.get('#submit-button').should('be.visible')
        cy.get('.btn-secondary').should('be.visible')
        cy.get('.col-sm-7 > .btn-secondary').click()        
        cy.document().contains('Dashboard')

    });

    it('clicking on monitoring alert should take user to monitor page and should be available ', function () {
        cy.get("#thirdPartyTilesContainer").contains("Unread Monitoring Alerts").click();
        cy.get('#monitoring-ddiq-frame').should('be.visible')
    });

    it('Clicking and closing right nav panel', function () {

        cy.get("#thirdPartyTilesContainer").contains("Questionnaires Outstanding").click();
        cy.contains("Questionnaire Sent");
        cy.get('#thirdPartyTilesDrawer').contains('Close').click({force: true});
        cy.get('#gview_jqDrawerGrid').should('not.be.visible')

    })

    it('clicking on a donut will open up its correspondent right nav panel', function(){
        cy.get('#third-party-donut-1').
        find('.c3-arc-No-Due-Diligence').
        click({force : true}).
        get('#thirdPartyTilesDrawer').
        should('be.visible')
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

});
