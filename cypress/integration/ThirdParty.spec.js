import Chance from 'chance';
// Instantiate Chance so it can be used
const chance = new Chance();
describe('Third Parties Page Spec', function () {

    beforeEach(function () {
        cy.login()
        cy.visit("/ThirdParty/Search")
    });

    it('Old DDIQ iframe should be working fine', function(){
        cy.visit("/Order/Details/118485")
        cy.get('#ddiqTab').click()
        cy.get('#ddiqFrame').should('be.visible')
    });

    it('NEW insight DDIQ should be working fine', function(){
        cy.visit("/Order/Details/123209")
        cy.get('#ddiqTab').click()
        cy.get('#insight-ddiq').should('be.visible')
    });
    
    it('user should be able to add affiliate', function(){
        cy.get('#jqGrid').contains('tr').first().click({force:true})
        cy.get('[data-bind="click: $parent.AffiliateUpdatePopup"] > .glyphicon').click()
        var name = chance.name()
        cy.get('#Name').clear().type(name)
        cy.get('#modalDialogConfirmButton').click()
        cy.get('.col-sm-8 > [data-bind="text: Name"]').contains(name)
    })

    it('DDIQ score should be the same in DDIQ profile', function(){
        cy.get('#aggregatecontainer').contains('DDIQ').click()
        cy.get('.loader25').should('not.be.visible')
        cy.get('#jqGrid_Q').click();
        cy.get('.loader25').should('not.be.visible')
        cy.get('#jqGrid_Q').click()
        cy.get('.loader25').should('not.be.visible')
        cy.get('.relevancy-score-high').first().click({force:true})
        cy.get('#ddiq-tab-link > a').click()
        cy.get('.overall-risk-banner > .risk-score-name').contains('High Risk')
    })

});