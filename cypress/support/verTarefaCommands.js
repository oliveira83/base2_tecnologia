import loc from './locators';

Cypress.Commands.add('filtrarTarefa', (tarefaId) => {
    cy.visit('view_all_bug_page.php');
    cy.xpath(loc.VIEW_ALL_BUG_PAGE.FILTROS.BTN_REDEFINIR).click();
    cy.get(loc.VIEW_ALL_BUG_PAGE.FILTROS.INPUT_PROCURAR).type(tarefaId);
    cy.xpath(loc.VIEW_ALL_BUG_PAGE.FILTROS.BTN_APLICAR_FILTRO).click();
});

Cypress.Commands.add('downloadArquivo', (extensionFile) => {
    const downloadPath = 'cypress/support/download';

    if(extensionFile === 'csv'){
         const fileName = 'FELIPEOLIVEIRAProject.csv';

        cy.downloadFile('https://mantis-prova.base2.com.br/csv_export.php', downloadPath, fileName);
        cy.readFile(`${downloadPath}/${fileName}`).should('exist');
    }else{
        const fileName = 'FELIPEOLIVEIRAProject.xml';

        cy.downloadFile('https://mantis-prova.base2.com.br/excel_xml_export.php', downloadPath, fileName);
        cy.readFile(`${downloadPath}/${fileName}`).should('exist');
    }
});

Cypress.Commands.add('adicionarAnotacao', (anotacao) => {
    cy.xpath(loc.VIEW_ALL_BUG_PAGE.TABELA_BUGLIST.COLUNA_ID).click();
    cy.xpath(loc.VIEW_DETALHES_TAREFA_PAGE.BTN_IR_PARA_ANOTACOES).click();
    cy.xpath(loc.VIEW_DETALHES_TAREFA_PAGE.TXT_AREA_ANOTACOES).type(anotacao);
});