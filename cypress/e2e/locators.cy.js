/// <reference types="cypress" />

describe('before each',() => {
    beforeEach(() => {
        cy.clearCookies(); 
        cy.visit('/login');
    })

    it('different strategies', () => {

        // by css selector
        cy.get('input[name="username"]').type('CydeoStudent');
        cy.get('[type="text"]').clear();

        // by tagname
        cy.get('input').each((item, index, list) => {
            // assert the length of the list is 2
            expect(list).to.have.length(2);
            expect(item).to.have.attr('type');
        })

        // by attribute name
        cy.get('[type]');

        // by className
        cy.get('.btn.btn-primary');

        // by id
        cy.get('#wooden_spoon');

        // what if I want to locate by text
        cy.get('button').should('contain','Login').click();
    })


})