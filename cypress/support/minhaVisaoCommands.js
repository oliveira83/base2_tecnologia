import loc from "../support/locators";

Cypress.Commands.add('pararDeMonitorarTarefa', (tarefaId) => {
    cy.filtrarTarefa(tarefaId);
        cy.xpath(loc.VIEW_ALL_BUG_PAGE.TABELA_BUGLIST.COLUNA_ID).click();
        cy.xpath(loc.VIEW_DETALHES_TAREFA_PAGE.BTN_PARAR_DE_MONITORAR).click().then(() => {
            cy.xpath(loc.MY_VIEW_PAGE.SIDEBAR.LINK_MINHA_VISAO).click();
            cy.url().should('include', '/my_view_page.php')
            cy.get('#monitored > .widget-body > .widget-main > .table-responsive > .table > tbody > tr > td').should('have.html', '&nbsp;')
        });

})