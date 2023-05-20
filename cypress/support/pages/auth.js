class Auth{
    // class name doesn't have to be the same as file name
    // we can put multiple classes in the file and none of them have any superity over each other

    login(user_name, password){
        cy.get('[name="username"]').type(user_name);
        cy.get('[name="password"]').type(password);
        cy.get('#wooden_spoon').click();
    }

    logout(){
        cy.contains('Logout').should('be.visible').click();
    }
}

const auth = new Auth(); // object of the class

module.exports = {
    auth
}