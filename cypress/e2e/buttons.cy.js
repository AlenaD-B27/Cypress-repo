/// <reference types="cypress" />

describe('before each',() => {
    beforeEach(() => {
        cy.clearCookies(); 
        cy.visit('/multiple_buttons');
    })

    it('Check different button actions', () => {
        // select a button with text
        cy.contains('Button 2').should('be.visible').click();
        cy.contains('Clicked on button two!').should('be.visible');

        // find element with class attribute and create a list and select the third element from the list
        cy.get('.btn.btn-primary').then(($buttons) => {
            cy.wrap($buttons).eq(2).click(); // index of the third element is 2
            // assert the text
            cy.contains('Clicked on button three!').should('be.visible');
        })
    })
})