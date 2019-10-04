import Chance from 'chance';
// Instantiate Chance so it can be used
const chance = new Chance();

describe('Home page functionalities', function () {

    beforeEach(function () {
        cy.MonitoringLogin()
    });
    it('User should be able to perform different actions in Monitoring report', function () {
        // cy.visit('/ThirdParty/Search')
        // cy.get('#ThirdPartyName').type('Verizon')
        // cy.get('td').should('contain', 'Verizon')
        // cy.get('[aria-describedby="jqGrid_F"]').first().click({force:true})
        // cy.get('#third-party-details-tabs-container').contains('Monitoring').click()
        // cy.get('.loading > img').should('not.be.visible')

        cy.visit('/ThirdParty/Details/373046')
        cy.get('#third-party-details-tabs-container').contains('Monitoring').click()
        cy.get('.loading > img').should('not.be.visible')


        cy.log("making sure user can confirm/unconfirm");
        // making sure user can confirm/unconfirm
        cy.get(':nth-child(1) > .event-row > .event-row-cell > .confirm').click({force:true})
        cy.get('#action-comment').type('Test')
        cy.get('#modalDialogConfirmButton').click()
        cy.wait(2000)
        cy.get(':nth-child(1) > .event-row > .event-row-cell > .confirm').click({force:true})
        cy.get('#action-comment').type('Test')
        cy.get('#modalDialogConfirmButton').click()
        

        cy.log("making sure user can escalate/descalate");
        cy.wait(2000)
        cy.get(':nth-child(1) > .event-row > .event-row-cell > .escalate').click({force:true})
        cy.get('#action-comment').type('Test')
        cy.get('#modalDialogConfirmButton').click()

        cy.wait(2000)
        cy.get(':nth-child(1) > .event-row > .event-row-cell > .escalate').click({force:true})
        cy.get('#action-comment').type('Test')
        cy.get('#modalDialogConfirmButton').click()


        //making sure user can Remove/Add
        cy.log("making sure user can Remove/Add");
        cy.wait(2000)
        cy.get(':nth-child(1) > .event-row > .event-row-cell > .adjudicate').click({force:true})
        cy.get('#SelectedDDIQAdjudicationReasonCode').select('Duplicate')
        cy.get('#action-comment').type('Test')
        cy.get('#modalDialogConfirmButton').click()

        cy.wait(2000)
        cy.get(':nth-child(1) > .event-row > .event-row-cell > .adjudicate').click({force:true})
        cy.get('#action-comment').type('Test')
        cy.get('#modalDialogConfirmButton').click()


        //making sure user can add messages
        cy.log("making sure user can add messages");
        cy.wait(2000)
        cy.get(':nth-child(1) > .event-row > .event-row-cell > .comment').click({force:true})
        cy.get('#action-comment').type('Test')
        cy.get('#modalDialogConfirmButton').click()
        cy.get('#modalDialogConfirmButton').should('not.be.visible')     
    });
})