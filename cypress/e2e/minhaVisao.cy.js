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

    it('Listagem em "Monitadorados por mim"', () => {
        cy.filtrarTarefa(tarefaId);
        cy.xpath(loc.VIEW_ALL_BUG_PAGE.TABELA_BUGLIST.COLUNA_ID).click();
        cy.xpath(loc.VIEW_DETALHES_TAREFA_PAGE.BTN_MONITORAR).click().then(() => {
            cy.xpath(loc.MY_VIEW_PAGE.SIDEBAR.LINK_MINHA_VISAO).click();
            cy.url().should('include', '/my_view_page.php');
            cy.xpath(loc.MY_VIEW_PAGE.SIDEBAR.TABELAS_MINHA_VISAO.MONITORADOS_POR_MIM).should('be.visible');
        });
        cy.pararDeMonitorarTarefa(tarefaId);
    });
});