import loc from "../support/locators";


describe('Testes Funcionais Ver Tarefas', () => {
    let tarefaId;
    let url_print_doc;
    let anotacao_teste;

    beforeEach(() => {
        cy.fixture('login.json').then((login) =>{
            cy.visit('/');
            cy.login(login.username, login.password);
        });
    });

    beforeEach(() =>{ 
        cy.fixture('verTarefa.json').then((verTarefa) =>{
           tarefaId = verTarefa.tarefaId;
           url_print_doc = verTarefa.url_print_doc
           anotacao_teste = verTarefa.anotacao_teste;
        })
    })

    it('Filtrar por uma tarefa criada', () => {
        cy.visit('view_all_bug_page.php');
        cy.filtrarTarefa(tarefaId);
        cy.xpath(loc.VIEW_ALL_BUG_PAGE.TABELA_BUGLIST.COLUNA_ID).should('contain.text', tarefaId);
    });

    it('Adicionar anotação com visibilidade pública', () => {
        const filePath = 'data_teste_small.jpg';

        cy.filtrarTarefa(tarefaId);
        cy.adicionarAnotacao(anotacao_teste);
        cy.xpath(loc.VIEW_DETALHES_TAREFA_PAGE.ENVIAR_ARQUIVOS_TAREFA).attachFile(filePath);
        cy.xpath(loc.VIEW_DETALHES_TAREFA_PAGE.BTN_ADICIONAR_ANOTACAO).click();
    });

    it('Adicionar anotação com visibilidade privada', () => {
        cy.filtrarTarefa(tarefaId);
        cy.adicionarAnotacao(anotacao_teste);
        cy.get(loc.VIEW_DETALHES_TAREFA_PAGE.CHECKBOX_VISIBILIDADE).check({force:true});
        cy.get(loc.VIEW_DETALHES_TAREFA_PAGE.CHECKBOX_VISIBILIDADE).should('have.attr', 'name', 'private')
        cy.xpath(loc.VIEW_DETALHES_TAREFA_PAGE.BTN_ADICIONAR_ANOTACAO).click();
    });

    it('Imprimir Tarefa .doc', () => {
        cy.filtrarTarefa(tarefaId);
        cy.xpath(loc.VIEW_ALL_BUG_PAGE.TABELA_BUGLIST.CKBOX_ID).check({force:true});
        cy.xpath(loc.VIEW_ALL_BUG_PAGE.TABELA_BUGLIST.BTN_IMPRIMIR_TAREFAS).click();
        cy.url().should('include', 'print_all_bug_page.php');
        cy.xpath(loc.PRINT_ALL_BUG_PAGE.LINK_PRINT_WORD).click()
        
        const downloadPath = 'cypress/support/download';
        const fileName = 'FELIPEOLIVEIRAProject.doc';

        cy.downloadFile(url_print_doc, downloadPath, fileName);
        cy.readFile(`${downloadPath}/${fileName}`).should('exist');
    });
    
    it('Exportar arquivo .csv', () => {
        cy.filtrarTarefa(tarefaId);
        cy.xpath(loc.VIEW_ALL_BUG_PAGE.TABELA_BUGLIST.CKBOX_ID).check({force:true});
        cy.xpath(loc.VIEW_ALL_BUG_PAGE.TABELA_BUGLIST.BTN_EXPORTAR_CSV).click();

        cy.downloadArquivo('csv');
    });

    it('Exportar arquivo .xml', () => {
        cy.filtrarTarefa(tarefaId);
        cy.xpath(loc.VIEW_ALL_BUG_PAGE.TABELA_BUGLIST.CKBOX_ID).check({force:true});
        cy.xpath(loc.VIEW_ALL_BUG_PAGE.TABELA_BUGLIST.BTN_EXPORTAR_EXCEL).click();

        cy.downloadArquivo('xml');
    });
});