/// <reference types="cypress"/>
import loc from "../support/locators";

describe('Testes Funcionais Minha Visao', () =>{
    let tarefaId;

    beforeEach(() => {
        cy.fixture('login.json').then((login) =>{
            cy.visit('/');
            cy.login(login.username, login.password);
        });

        cy.fixture('minhaVisao.json').then((minhaVisao) => {
            tarefaId = minhaVisao.tarefaId;
        });
    });

    it('Listagem na tabela "Monitadorados por mim"', () => {
        cy.filtrarTarefa(tarefaId);
        cy.xpath(loc.VIEW_ALL_BUG_PAGE.TABELA_BUGLIST.COLUNA_ID).click();
        cy.xpath(loc.VIEW_DETALHES_TAREFA_PAGE.BTN_MONITORAR).click().then(() => {
            cy.xpath(loc.MY_VIEW_PAGE.SIDEBAR.LINK_MINHA_VISAO).click();
            cy.url().should('include', '/my_view_page.php');
            cy.xpath(loc.MY_VIEW_PAGE.SIDEBAR.TABELAS_MINHA_VISAO.TABELA_MONITORADOS_POR_MIM).should('be.visible');
        });
        cy.pararDeMonitorarTarefa(tarefaId);
    });

    it('Verificar se são listadas até 10 tarefas na tabela "Não atribuidos"', () => {
        cy.visit('/my_view_page.php')
        cy.get(loc.MY_VIEW_PAGE.SIDEBAR.TABELAS_MINHA_VISAO.TABELA_NAO_ATRIBUIDOS).within(() => {
            cy.get('tbody tr').should('have.length', 10);
        });
    });
    
    it('Verificar se são listadas até 10 tarefas na tabela "Relatados por mim"', () => {
        cy.visit('/my_view_page.php')
        cy.get(loc.MY_VIEW_PAGE.SIDEBAR.TABELAS_MINHA_VISAO.TABELA_RELATADOS_POR_MIM).within(() => {
            cy.get('tbody tr').should('have.length', 10);
        });
    });

    it('Verificar se são listadas até 10 tarefas na tabela "Modificados recentemente(30 dias)"', () => {
        cy.visit('/my_view_page.php')
        cy.get(loc.MY_VIEW_PAGE.SIDEBAR.TABELAS_MINHA_VISAO.TABELA_MODIFICADOS_RECENTEMENTE).within(() => {
            cy.get('tbody tr').should('have.length', 10);
        });
    });

    it('Verificar redirecionamento do botão "Ver tarefas', () =>{
        cy.monitorarTarefa(tarefaId);
        cy.visit('/my_view_page.php');
        cy.xpath(loc.MY_VIEW_PAGE.SIDEBAR.TABELAS_MINHA_VISAO.BTN_VER_TAREFAS_MONITORADOS_POR_MIM).click();
        cy.url().should('include', '/view_all_bug_page.php?filter=')
        cy.pararDeMonitorarTarefa(tarefaId);
    });
});