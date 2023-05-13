/// <reference types="cypress" />

describe('before each', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.visit('/login');
  });

  it('Check different strategies', () => {
    // by css selector
    cy.get('input[name="username"]').type('CydeoStudent');
    cy.get('[type="text"]').clear();

    // by tagname
    cy.get('input').each((item, index, list) => {
      // assert the length of the list is 2
      expect(list).to.have.length(2);
      expect(item).to.have.attr('type');
    });

    // by attribute name
    cy.get('[type]');

    // by className
    cy.get('.btn.btn-primary');

    // by id
    cy.get('#wooden_spoon');

    // what if I want to locate by text
    cy.get('button').should('contain', 'Login').click();
  });

  it('Check finding elements by traveling through DOM', () => {
    // travel to find the login button: locate username box - go to parent form then find button

    cy.get('input[name="username"]')
      .parents('form')
      .find('button')
      .should('contain', 'Login')
      .click();
  });

  it('Check different type of assertions', () => {
    // Cypress itself boundles assertions provided by Chai, Sinon and jQuery libraries

    // ASSERTIONS:

    // should
    cy.get('#wooden_spoon').should('contain', 'Login').and('have.class', 'btn btn-primary');

    // expect : explicit assetrtion
    cy.get('#wooden_spoon').then((buttonElement) => {
      expect(buttonElement).to.have.text('Login');
      expect(buttonElement).to.have.class('btn btn-primary');
    });
  });
});
