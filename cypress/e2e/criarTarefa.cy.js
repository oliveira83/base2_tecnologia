/// <reference types="cypress"/>
import loc from '../support/locators';


describe('Testes Funcionais Criar Tarefa', () => {
    
    before(() =>{
        cy.criarArquivoJpg(2, 'cypress/fixtures/data_teste_small.jpg')//Cria arquivo < 2,097 kB
        cy.criarArquivoJpg(3900, 'cypress/fixtures/data_teste_biggest.jpg')//Cria arquivo > 2,097 kB
    });
    
    beforeEach(() => {
        cy.fixture('login.json').then((login) =>{
            cy.visit('/');
            cy.login(login.username, login.password);
        });
    });

    it('Criar tarefa com upload de arquivo abaixo de 2,097 kB', () => {
        const filePath = 'data_teste_small.jpg';

        cy.setarCamposDaTarefa();
        cy.xpath(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.ENVIAR_ARQUIVOS).attachFile(filePath,{subjectType: 'drag-n-drop'});
        cy.xpath(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.BTN_CRIAR_TAREFA).click();
        cy.get(loc.BUG_REPORT_PAGE.ALERT_OPERACAO_REALIZADA_SUCESSO).should('be.visible').and('contain', 'Operação realizada com sucesso.');
        cy.url().should('include', 'view.php?id=')
    });

    it('Criar uma tarefa sem preencher campos do tipo required', () => {
        cy.xpath(loc.MY_VIEW_PAGE.SIDEBAR.LINK_CRIAR_TAREFA, {timeout: 10000}).should('be.visible').click()
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
        cy.xpath(loc.BUG_REPORT_PAGE.ALERT_APPLICATION_ERROR).should('be.visible')
    });

    it('Criar tarefa com upload de arquivo acima de 2,097 kB', () => {
        const filePath = 'data_teste_biggest.jpg';

        cy.setarCamposDaTarefa();

        const alertStub = cy.stub();
        cy.on('window:alert', alertStub);

        cy.xpath(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.ENVIAR_ARQUIVOS).attachFile(filePath, { subjectType: 'drag-n-drop' });
        cy.get('.dz-error-message').should('include.text', 'O arquivo é muito pesado (2.86MiB). Tamanho máximo de arquivo: 2MiB.')
        cy.get(loc.BUG_REPORT_PAGE.REMOVER_ARQUIVO).click();
    });
});
