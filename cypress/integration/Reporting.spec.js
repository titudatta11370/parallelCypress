import Chance from 'chance';
const chance = new Chance();
var moment = require('moment');




describe('Reporting Page Functionalities', function () {

    beforeEach(function () {
        cy.login()
        cy.visit("/Reporting")
    });

    // it('user should be able to filter third parties by date created', function(){
    //     let lastWeek = moment().subtract(10, 'days').calendar();
    //     let today = moment().format('DD-MM-YYYY');
    //     cy.waitUntilLoadingIsNotVisible()
    //     cy.get('#startCreateDateContainer > .input-group-addon').click()
    //     cy.get('[data-day="16/07/2019"]').click()
    //     cy.get('#EndCreateDate').clear()
    //     cy.get('#EndCreateDate').type(today)
    //     cy.get('#SearchButton').click();
    //     cy.get('#gview_jqGrid').should('be.visible')
    // })

    it('Should be able to filter 3p by Relationship Status', function(){
        cy.get('.row > :nth-child(2) > .select2 > .selection > .select2-selection > .select2-selection__rendered').click()
        cy
        .get('ul>li')
        .each(($el, index, $list) => {
            if ($el.text() === 'Accepted') {
             cy.wrap($el).click()
            } else {
                console.log("Nothing available")
            }
        })
        cy.get('#SearchButton').click({force:true});
        cy.get('#load_jqGrid').should('not.be.visible')
        cy.get('[title="Accepted"]').should("be.visible")
    })

    it('Should be able to filter 3p by insight score', function(){
        cy.get('[data-bind="if: InsightScoreEnabled"] > .select2 > .selection > .select2-selection > .select2-selection__rendered').click()        
        cy
        .get('ul>li')
        .each(($el, index, $list) => {
            if ($el.text() === 'High') {
             cy.wrap($el).click()
            } else {
                console.log("Nothing available")
            }
        })
        cy.get('#SearchButton').click({force:true});
        cy.get('#load_jqGrid').should('not.be.visible')
        cy.get('[title="H"]').should("be.visible")
    })

    it('Should be able to filter 3p by DDIQ score', function(){
        cy.get('.row > :nth-child(8) > .select2 > .selection > .select2-selection > .select2-selection__rendered').click()        
        cy
        .get('ul>li')
        .each(($el, index, $list) => {
            if ($el.text() === 'High') {
             cy.wrap($el).click()
            } else {
                console.log("Nothing available")
            }
        })
        cy.get('#SearchButton').click({force:true});
        cy.get('#load_jqGrid').should('not.be.visible')
        cy.get('[aria-describedby="jqGrid_DDIQScore"]').contains("H")
    })
});