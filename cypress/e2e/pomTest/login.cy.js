import { auth } from '../../support/pages/auth'
import { navigateTo } from '../../support/pages/navigation'

describe('Auth: Login user different ways', () => {
    // navigation to the test page
    beforeEach('navigate to login page', () => {
        cy.clearAllCookies();
        navigateTo.loginPage(); // called from POM
    })

    it('Happy Path scenario using POM function', () => {
        // auth.login('hardcoded variables') -- not a good way
        cy.fixture('user').then((user) => {
            auth.login(user.user2.username, user.user2.password);
        })
        // let's call custom command to verify the text
        cy.textExists('You logged into a secure area!');
        auth.logout();
    })
})