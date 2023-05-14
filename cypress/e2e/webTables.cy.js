/// <reference types="cypress" />

describe('Cypress WebTable Tests', {baseUrl: 'https://demoqa.com'}, () => {
    
     beforeEach('Navigate to upload page', () => {
       cy.clearCookies();
       cy.visit('/webtables');
     });
    
     it('Check finding and editing a record', () => {
       // locate table body, then navigate through this element to find Alden, then update info with another person
       cy.get('.rt-tbody')               // 1. get table body
       .contains('.rt-tr-group','Alden') // 2. get me the row that contains Alden
        .then((row) => {                 // 3. store into jquery element:
            cy.wrap(row).find('[title="Edit"]').click();
                                        // 4. fill the box with new person:
            cy.get('#firstName').clear().type('Alena');
            cy.get('#lastName').clear().type('Wonderwoman');
            cy.get('#submit').click();
                                        // 5. assert:
            cy.wrap(row).find('.rt-td').eq(0).should('contain','Alena')

        })
      })       
      
     });
       
    