/// <reference types="cypress"/>
import loc from '../support/locators';


describe('Testes Funcionais Criar Tarefa', () => {
    let msg_operacao_com_sucesso;
    let msg_preencha_o_campo;
    let msg_arquivo_pesado;
    let resumo;
    let descricao;

    before(() =>{
        cy.criarArquivoJpg(2, 'cypress/fixtures/data_teste_small.jpg');//Cria arquivo < 2,097 kB
        cy.criarArquivoJpg(3900, 'cypress/fixtures/data_teste_biggest.jpg');//Cria arquivo > 2,097 kB
    });
    
    beforeEach(() => {
        cy.fixture('login.json').then((login) =>{
            cy.visit('/');
            cy.login(login.username, login.password);
        });

        cy.fixture('criarTarefa').then((criarTarefa) => {
            msg_operacao_com_sucesso = criarTarefa.msg_operacao_com_sucesso;
            msg_preencha_o_campo = criarTarefa.msg_preencha_o_campo;
            msg_arquivo_pesado = criarTarefa.msg_arquivo_pesado;
            resumo = criarTarefa.resumo;
            descricao = criarTarefa.descricao;
        });
    });

    it('Criar tarefa com upload de arquivo abaixo de 2,097 kB', () => {
        const filePath = 'data_teste_small.jpg';

        cy.setarCamposDaTarefa();
        cy.xpath(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.ENVIAR_ARQUIVOS).attachFile(filePath,{subjectType: 'drag-n-drop'});
        cy.xpath(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.BTN_CRIAR_TAREFA).click();
        cy.get(loc.BUG_REPORT_PAGE.ALERT_OPERACAO_REALIZADA_SUCESSO).should('be.visible').and('contain', msg_operacao_com_sucesso);
        cy.url().should('include', 'view.php?id=');
    });

    it('Criar uma tarefa sem preencher campos do tipo required', () => {
        cy.xpath(loc.MY_VIEW_PAGE.SIDEBAR.LINK_CRIAR_TAREFA, {timeout: 10000}).should('be.visible').click();
        cy.xpath(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.BTN_CRIAR_TAREFA).click();
        cy.get(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.RESUMO).then(($input) => {
            const validationMessage = $input[0].validationMessage;
            expect(validationMessage).to.equal(msg_preencha_o_campo);
        });
        
        cy.get(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.RESUMO).type(resumo);
        cy.xpath(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.BTN_CRIAR_TAREFA).click();
        cy.get(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.DESCRICAO).then(($input) => {
            const validationMessage = $input[0].validationMessage;
            expect(validationMessage).to.equal(msg_preencha_o_campo);
        });
        cy.get(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.RESUMO).type(resumo);
        cy.get(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.DESCRICAO).type(descricao);
        cy.xpath(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.BTN_CRIAR_TAREFA).click();
        cy.xpath(loc.BUG_REPORT_PAGE.ALERT_APPLICATION_ERROR).should('be.visible');
    });

    it('Criar tarefa com upload de arquivo acima de 2,097 kB', () => {
        const filePath = 'data_teste_biggest.jpg';

        cy.setarCamposDaTarefa();

        cy.xpath(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.ENVIAR_ARQUIVOS).attachFile(filePath, { subjectType: 'drag-n-drop' });
        cy.get(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.ALERT_ARQUIVO_PESADO).should('include.text', msg_arquivo_pesado);
        cy.get(loc.BUG_REPORT_PAGE.REMOVER_ARQUIVO).click();
    });
});
