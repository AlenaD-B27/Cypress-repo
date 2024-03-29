/// <reference types="cypress" />

describe('before each', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.visit('/multiple_buttons');
  });

  it('Check different button actions', () => {
    // select a button with text
    cy.contains('Button 2').should('be.visible').click();
    cy.contains('Clicked on button two!').should('be.visible');

    // find element with class attribute and create a list and select the third element from the list
    cy.get('.btn.btn-primary').then(($buttons) => {
      cy.wrap($buttons).eq(2).click(); // index of the third element is 2
      // assert the text
      cy.contains('Clicked on button three!').should('be.visible');
    });

    // all buttons on the page // EACH FUNCTION --> creates the loop and verifies in loop each element's length (6 times)
    cy.get('button').each((item, index, list) => {
      // verify number of buttons
      expect(list).to.have.length(6);

      // verify attribute
      expect(list).to.have.attr('onclick');
    });

    // creates the loop, fins the element -> verifies ONCE, just for this element
    cy.get('button').each((item) => {
      if (item.text() == 'Button 4') {
        cy.log(item.text());
        item.click(); // doesn't work inside jQuery element
        cy.wrap(item).click();
        cy.contains('Clicked on button four!').should('be.visible');
      }
    });
  });
});
