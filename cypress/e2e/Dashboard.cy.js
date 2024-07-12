import loc from '../support/locators';

describe('Mantis', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.login('Felipe_Oliveira', 'gdlp088');
    });

    // it('Criar tarefa', () => {
    //     cy.xpath(loc.MY_VIEW_PAGE.SIDEBAR.LINK_CRIAR_TAREFA).click();
    //     cy.get(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.CRIAR_TAREFA_LISTA).select('2');
    //     cy.get(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.FREQUENCIA_LISTA).select('10');
    //     cy.get(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.GRAVIDADE_LISTA).select('10');
    //     cy.get(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.PRIORIDADE_LISTA).select('40');
    //     cy.get(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.RESUMO).type('Teste');
    //     cy.get(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.DESCRICAO).type('Teste');

    //     const filePath = 'teste.txt';

    //     cy.xpath(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.ENVIAR_ARQUIVOS).attachFile(filePath);
    //     cy.xpath(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.BTN_CRIAR_TAREFA).click()

    //     cy.url().should('include', 'bug_report.php?posted=1')
    //     cy.get(loc.BUG_REPORT_PAGE.ALERT_OPERACAO_REALIZADA_SUCESSO).should('be.visible').and('contain', 'Operação realizada com sucesso.');
    //     cy.url().should('include', 'view.php?id=')
    // });

    it('Criar uma tarefa sem preencher campos do tipo required', () => {
        cy.xpath(loc.MY_VIEW_PAGE.SIDEBAR.LINK_CRIAR_TAREFA).click();
        cy.xpath(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.BTN_CRIAR_TAREFA).click()
        cy.get(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.RESUMO).then(($input) => {
            const validationMessage = $input[0].validationMessage;
            expect(validationMessage).to.equal('Preencha este campo.');
        });
        
        cy.get(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.RESUMO).type('Teste');
        cy.xpath(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.BTN_CRIAR_TAREFA).click()
        cy.get(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.DESCRICAO).then(($input) => {
            const validationMessage = $input[0].validationMessage;
            expect(validationMessage).to.equal('Preencha este campo.');
        });
        cy.get(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.RESUMO).type('Teste');
        cy.get(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.DESCRICAO).type('Teste');
        cy.xpath(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.BTN_CRIAR_TAREFA).click()
        cy.url().should('include', 'bug_report.php?posted=1')
        cy.xpath(loc.BUG_REPORT_PAGE.ALERT_APPLICATION_ERROR).should('be.visible')
    });

    it('Filtrar uma tarefa criada', () => {
        cy.visit('view_all_bug_page.php')
        cy.xpath(loc.VIEW_ALL_BUG_PAGE.FILTROS.BTN_REDEFINIR).click()
        cy.get(loc.VIEW_ALL_BUG_PAGE.FILTROS.INPUT_PROCURAR).type('0001095')
        cy.xpath(loc.VIEW_ALL_BUG_PAGE.FILTROS.BTN_APLICAR_FILTRO).click()
        cy.xpath(loc.VIEW_ALL_BUG_PAGE.TABELA_BUGLIST.COLUNA_ID).should('contain.text','0001095');
    });

    it('Adicionar anotação em uma tarefa criada', () => {
        cy.filtrarTarefa();
    });
});