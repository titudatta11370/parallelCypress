describe('The Dashboard Page', function () {
    // const username = 'support3@exiger.com'
    // const password = 'Admin1234$'


    beforeEach(function () {
        // seed a user in the DB that we can control from our tests
        // assuming it generates a random password for us
        const username = 'support3@exiger.com'
        const password = 'Admin1234$'

        cy.request('POST', '/Auth/UserAuthType', {username: username, password: password})
            .its('body')
            .as('currentUser')
    })


    it('sets auth cookie when logging in via form submission', function () {
        // destructuring assignment of the this.currentUser object
        const {username, password} = this.currentUser

        cy.visit('/Auth/Login')


        cy.get('#UserName').type('support3@exiger.com')
        cy.get('#auth-continue-button').click()
        cy.get('#Password').type('Admin1234$')
        cy.get('#auth-submit-button').click()


        // we should be redirected to /dashboard
        cy.url().should('include', '/')

        // our auth cookie should be present
        cy.getCookie('')

    })


    it('logs in programmatically without using the UI', function () {
        // destructuring assignment of the this.currentUser object
        const {username, password} = this.currentUser

        // programmatically log us in without needing the UI
        cy.request('POST', '/Auth/Login', {
            username,
            password
        })

        // now that we're logged in, we can visit
        // any kind of restricted route!
        cy.visit('/ThirdParty/Search')

        // our auth cookie should be present
        cy.getCookie('your-session-cookie').should('exist')

        // UI should reflect this user being logged in
        // cy.get('h1').should('contain', 'jane.lane')
    })
})
