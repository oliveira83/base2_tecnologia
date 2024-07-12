// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

import loc from './locators';

Cypress.Commands.add('login', (email, password) => {
    cy.get(loc.LOGIN_PAGE.USERNAME).type(email);
    cy.xpath(loc.LOGIN_PAGE.BTN_ENTRAR).click();
    cy.url().should('include', 'login_password_page.php');
    
    cy.get(loc.LOGIN_PAGE_PASSWORD.PASSWORD).type(password);
    cy.xpath(loc.LOGIN_PAGE_PASSWORD.BTN_ENTRAR).click().then(() => {
        cy.url().should('include', 'index.php');
    });
    // cy.xpath(loc.MY_VIEW_PAGE.NAVBAR.LOGO_MANTIS).should('be.visible');
});

Cypress.Commands.add('filtrarTarefa', () => {
    cy.visit('view_all_bug_page.php')
    cy.xpath(loc.VIEW_ALL_BUG_PAGE.FILTROS.BTN_REDEFINIR).click()
    cy.get(loc.VIEW_ALL_BUG_PAGE.FILTROS.INPUT_PROCURAR).type('0001095')
    cy.xpath(loc.VIEW_ALL_BUG_PAGE.FILTROS.BTN_APLICAR_FILTRO).click()
});