/// <reference types="cypress" />

describe('before each', () => {
    beforeEach(() => {
      cy.clearCookies();
      cy.visit('/registration_form');
    });

    it('Check different input box fields', () => {
        cy.get('input[name="firstname"]').type('Alena');
        cy.get('input[name="lastname"]').type('Ohoho');
        cy.get('input[name="username"]').type('Owlie');
        let email = `test${Math.floor(100000+Math.random()*9000)}@somemail.com`;
        cy.get('input[name="email"]').type(email);
    })
})