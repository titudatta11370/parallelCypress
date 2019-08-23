import Chance from 'chance';
// Instantiate Chance so it can be used
const chance = new Chance();
describe('Home page functionalities', function () {

    beforeEach(function () {
        cy.login()
        cy.visit("/ThirdParty/Search")
        // cy.get(':nth-child(1) > .secondary-navbar > [href="/ThirdParty/Search"]').click();
    });

    it('DDIQ iframe should be working fine', function(){
        cy.get('.loader25').should('not.be.visible')
        cy.get('.name').find('DDIQ').click
        cy.get('ul').children('.name').contains('DDIQ').click()
        cy.get('[title="DDIQ"]').first().click()
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