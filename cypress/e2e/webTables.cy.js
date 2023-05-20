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

      it('Check finding and deleting record', () => {
        cy.get('.rt-tbody')               // 1. get table body
       .contains('.rt-tr-group','Alden') // 2. get me the row that contains Alden
       .then((row) => {
        cy.wrap(row).find('[title="Delete"]').click();
       })
       cy.get('.rt-tbody').should('not.contain', 'Alden');
       cy.get('#searchBox').type('Alden');
       cy.get('.rt-noData').should('contain', 'No rows found').should('be.visible');
      })

      it('Check search for different age records', () => {
        // define age groups
        const ageGroup = [29, 39, 45, 77];
        // for each age group perform same test scenario
        cy.wrap(ageGroup).each((age) => {
            // type age into search box
            cy.get('#searchBox').clear().type(age);
            // verify if that age exist
            // verify number of records
            if(age  === 77){
                cy.get('.rt-tbody').find('.rt-tr-group').first().should('not.contain', age);
                cy.get('.rt-noData').should('contain', 'No rows found').should('be.visible');
            } else {
                cy.get('.rt-tbody').find('.rt-tr-group').first().should('contain', age);
                cy.get('.rt-tbody').contains('.rt-tr-group', age).should('have.length', 1);
            }
        })
      })

      it('Check adding new record -> BAD PRACTICE',() => {
        cy.get('#addNewRecordButton').click();
        cy.get('#firstName').type('Alena');
        cy.get('#lastName').type('Wonderwoman');
        cy.get('#userEmail').type('alenaWonder@mail.com');
        cy.get('#age').type('40');
        cy.get('#salary').type('200000');
        cy.get('#department').type('legal');
        cy.get('#submit').click();

        cy.get('.rt-tbody').contains('.rt-tr-group', 'Alena').then((row) => {
            cy.wrap(row).find('.rt-td').eq(0).should('contain','Alena');
            cy.wrap(row).find('.rt-td').eq(1).should('contain','Wonderwoman');
            cy.wrap(row).find('.rt-td').eq(2).should('contain','40');
        })

      })

      it('Check adding new record -> GOOD PRACTICE', () => {
        cy.get('#addNewRecordButton').click();
        cy.fixture('user').then((user) => {
            const columnNames = Object.keys(user.user1); // goes to fixtures folder, gets user1 object keys and stores into columnsNames array
            const userData = Object.values(user.user1);
            cy.wrap(columnNames).each((columnName, index) => {
                // cy.log(columnName);
                // cy.log(userData[index]);
                cy.get(`#${columnName}`).type(`${userData[index]}`);
            })
            cy.get('#submit').click();

            cy.get('.rt-tbody').contains('.rt-tr-group', userData[0])
            .then((row) => {
                cy.wrap(userData).each((value, index) => {
                    cy.wrap(row).find('.rt-td').eq(index).should('contain',value);
                })
            
            })

        })
      })
      
     });
       
    