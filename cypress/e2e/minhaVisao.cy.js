/// <reference types="cypress"/>
import loc from "../support/locators";

describe('Testes Funcionais Minha Visao', () =>{
    let tarefaId;
    let log_usuario;

    beforeEach(() => {
        cy.fixture('login.json').then((login) =>{
            cy.visit('/');
            cy.login(login.username, login.password);
        });

        cy.fixture('minhaVisao.json').then((minhaVisao) => {
            tarefaId = minhaVisao.tarefaId;
            log_usuario = minhaVisao.log_usuario
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
        cy.VerificarQuantidadeListagem('nao_atribuidos')
    });
    
    it('Verificar se são listadas até 10 tarefas na tabela "Relatados por mim"', () => {
        cy.VerificarQuantidadeListagem('relatados_por_mim')
    });

    it('Verificar se são listadas até 10 tarefas na tabela "Modificados recentemente(30 dias)"', () => {
        cy.VerificarQuantidadeListagem('modificados_recentemente')
    });

    it('Verificar redirecionamento do botão "Ver tarefas', () =>{
        cy.monitorarTarefa(tarefaId);
        cy.visit('/my_view_page.php');
        cy.xpath(loc.MY_VIEW_PAGE.SIDEBAR.TABELAS_MINHA_VISAO.BTN_VER_TAREFAS_MONITORADOS_POR_MIM).click();
        cy.url().should('include', '/view_all_bug_page.php?filter=')
        cy.pararDeMonitorarTarefa(tarefaId);
    });

    it('Gravação de log na tabela "Linha do tempo"', () => {
        cy.visit('/my_view_page.php');
        cy.get(loc.MY_VIEW_PAGE.SIDEBAR.TABELAS_MINHA_VISAO.LINHAS_TABELA_LINHA_DO_TEMPO).then(initialEntries =>{
            const initialEntryCount = initialEntries.length;
            cy.criarTarefa();
            cy.get(loc.MY_VIEW_PAGE.SIDEBAR.TABELAS_MINHA_VISAO.LINHAS_TABELA_LINHA_DO_TEMPO).should('have.length', initialEntryCount + 1);
            
            cy.get(loc.MY_VIEW_PAGE.SIDEBAR.TABELAS_MINHA_VISAO.LINHAS_TABELA_LINHA_DO_TEMPO).eq(initialEntryCount).within(() => {
                cy.get('.action').should('contain', log_usuario);
              });
        })
    });
});