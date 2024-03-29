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
    const email = `test${Math.floor(100000 + Math.random() * 9000)}@somemail.com`;
    cy.get('input[name="email"]').type(email);
    const password = `test${Math.floor(100000 + Math.random() * 9000)}@somemail.com`;
    cy.get('input[name="password"]').type(password);
    const phone = `555-000-${Math.floor(1000 + Math.random() * 9000)}`;
    cy.get('input[name="phone"]').type(phone);
    cy.get('input[name="birthday"]').type('01/01/1999');
  });

  it('Check different radio button actions', () => {
    cy.get('.radio')
    .find('[type=radio]')
    .then((radio => {
        // get all the radio buttons, select fst one, verify it is checked
        cy.wrap(radio).first().check().should('be.checked');
        /**
         * radio: is a Jquery element, cy.wrap(radio) : turns it into Cypress Object so that we can use cypress functions
         * first() : selects first element
         * check() : checks is
         */

        // get all the radio buttons, select fst one, verify it is checked and confirmation label is visible
        cy.wrap(radio).eq(1).check().should('be.checked');
        cy.get('[data-bv-icon-for="gender"]').should('be.visible');

        // verify third one is not checked

        cy.wrap(radio).eq(2).should('not.be.checked');
    }))
  })

  it('Check different checkbox actions',() => {
    // get all checkboxes, select Java and verify
    cy.get('[type="checkbox"]').then((checkbox) => {
        cy.wrap(checkbox).eq(1).check().should('be.checked');
        // uncheck it
        cy.wrap(checkbox).eq(1).uncheck().should('not.be.checked');
        // verify third one has valiue Javascript and check and verify
        cy.wrap(checkbox).eq(2)
        .should('have.value', 'javascript')
        .check()
        .should('be.checked');
    })
  })

  it('Check selection of a single option from dropdown', () => {
    // select one element
    cy.get('select[name="job_title"]').select('SDET');
    // assert that dropdown has correct text after selecting
    cy.get('select[name="job_title"]').contains('SDET');
  })

  it('Check selection of all dropdown options', () => {
    // we will provide our test data through fixtures folder as JSON object, then use that data to verify select values
    cy.fixture('departments').then((departments) => {
        // get all options in the menu, iterate through these options one by one
        cy.get('select[name="department"] > option').each((option, index) => {
            // get each option text
            const optionText = option.text();
           // cy.log(optionText);
           // cy.log(index);
           // cy.log(departments[index]);
           cy.get('select[name="department"]').select(optionText)
           .should('have.value', option.val())
           .contains(departments[index]);
        })
    })
  })
});
