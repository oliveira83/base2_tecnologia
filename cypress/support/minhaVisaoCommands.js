import loc from "../support/locators";

Cypress.Commands.add('pararDeMonitorarTarefa', (tarefaId) => {
    cy.filtrarTarefa(tarefaId);
        cy.xpath(loc.VIEW_ALL_BUG_PAGE.TABELA_BUGLIST.COLUNA_ID).click();
        cy.xpath(loc.VIEW_DETALHES_TAREFA_PAGE.BTN_PARAR_DE_MONITORAR).click().then(() => {
            cy.xpath(loc.MY_VIEW_PAGE.SIDEBAR.LINK_MINHA_VISAO).click();
            cy.url().should('include', '/my_view_page.php')
            cy.get('#monitored > .widget-body > .widget-main > .table-responsive > .table > tbody > tr > td').should('have.html', '&nbsp;')
        });
});

Cypress.Commands.add('monitorarTarefa', (tarefaId) =>{
    cy.filtrarTarefa(tarefaId);
    cy.xpath(loc.VIEW_ALL_BUG_PAGE.TABELA_BUGLIST.COLUNA_ID).click();
    cy.xpath(loc.VIEW_DETALHES_TAREFA_PAGE.BTN_MONITORAR).click();
});

Cypress.Commands.add('VerificarQuantidadeListagem',(tabela) => {

    switch(tabela){
        case 'nao_atribuidos': 
            cy.visit('/my_view_page.php');
            cy.get(loc.MY_VIEW_PAGE.SIDEBAR.TABELAS_MINHA_VISAO.TABELA_NAO_ATRIBUIDOS).within(() => {
                cy.get('tbody tr').should('have.length', 10);
            });
            break;
        case 'relatados_por_mim':
            cy.visit('/my_view_page.php');
            cy.get(loc.MY_VIEW_PAGE.SIDEBAR.TABELAS_MINHA_VISAO.TABELA_RELATADOS_POR_MIM).within(() => {
                cy.get('tbody tr').should('have.length', 10);
            });
            break;
        case 'modificados_recentementemodificados_recentemente':
            cy.visit('/my_view_page.php');
            cy.get(loc.MY_VIEW_PAGE.SIDEBAR.TABELAS_MINHA_VISAO.TABELA_MODIFICADOS_RECENTEMENTE).within(() => {
                cy.get('tbody tr').should('have.length', 10);
            });
            break;
        default:
            console.log('tabela invalida!');
    }
});