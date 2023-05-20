/// <reference types="cypress" />

describe('Alerts', {baseUrl: 'https://demoqa.com'}, () => {
    
     beforeEach('Navigate to upload page', () => {
       cy.clearCookies();
       cy.visit('/alerts');
     });

     it('Check alert confirmation', () => {
        /**
         * Browser commands: window:alert, window:confirm, window:on etc...
         * 
         */
        const stub = cy.stub(); // created the stub function
        cy.on('window:confirm', stub); // when the confirmation command initiated store and give the control to stub function
        cy.get('#confirmButton').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Do you confirm action?');
        })
        cy.on('window:confirm', () => true); // confirm the alert
        cy.contains('You selected Ok').should('be.visible');
     });

     it('Check alert cancelation', () => {
        /**
         * Browser commands: window:alert, window:confirm, window:on etc...
         * 
         */
        const stub = cy.stub(); // created the stub function
        cy.on('window:confirm', stub); // when the confirmation command initiated store and give the control to stub function
        cy.get('#confirmButton').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Do you confirm action?');
        })
        cy.on('window:confirm', () => false); // CANCEL the alert
        cy.contains('You selected Cancel').should('be.visible');
     });


    })