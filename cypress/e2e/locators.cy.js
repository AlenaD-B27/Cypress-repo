/// <reference types="cypress" />

describe('before each',() => {
    beforeEach(() => {
        cy.clearCookies(); 
        cy.visit('/login');
    })

    it('different strategies', () => {
        cy.get('input[name="username"]').type('CydeoStudent');
        cy.get('[type="text"]').clear();

        
        cy.get('input').each((item, index, list) => {
            // assert the length of the list is 2
            expect(list).to.have.length(2);
            expect(item).to.have.attr('type');
        })
    })


})