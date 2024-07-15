import loc from './locators';

Cypress.Commands.add('criarArquivoJpg', (sizeInKB, filePath) => {
    cy.task('fileExists', { filePath }).then((exists) => {
        if (exists) {
          cy.log(`Arquivo já existe: ${filePath}`);
          return;
        }
    
    const base64Content = 'A'.repeat(sizeInKB * 1024); // Gera conteúdo base64 com o tamanho especificado em KB
    const base64Image = `data:image/jpeg;base64,${base64Content}`;
  
    cy.task('saveFile', { filePath, content: base64Image.split(',')[1] });
  });
})

Cypress.Commands.add('setarCamposDaTarefa', () => {
    cy.xpath(loc.MY_VIEW_PAGE.SIDEBAR.LINK_CRIAR_TAREFA, {timeout: 30000}).should('be.visible').click()
    cy.get(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.CRIAR_TAREFA_LISTA).select('2');
    cy.get(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.FREQUENCIA_LISTA).select('10');
    cy.get(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.GRAVIDADE_LISTA).select('10');
    cy.get(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.PRIORIDADE_LISTA).select('40');
    cy.get(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.RESUMO).type('Teste');
    cy.get(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.DESCRICAO).type('Teste');
});

Cypress.Commands.add('criarTarefa', () => {
  cy.xpath(loc.MY_VIEW_PAGE.SIDEBAR.LINK_CRIAR_TAREFA, {timeout: 10000}).should('be.visible').click()
  cy.setarCamposDaTarefa();
  cy.xpath(loc.MY_VIEW_PAGE.SIDEBAR.FORM_CRIAR_TAREFA.BTN_CRIAR_TAREFA).click();
});