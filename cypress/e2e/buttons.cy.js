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
    })
})