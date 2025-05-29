describe('Central de Atendimento ao Cliente TAT', () => {
  /*------------------- Seção 3 --------------------*/
  beforeEach (() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    /* should() para verificar se atende a condição
     usar com: be.equal, not.be.equal, be.visible, have.value,etc
    */
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche campos obrigatórios enviar formulário', () => {
    /* get para pegar elementos, type para digitar
      usar de forma encadeada
    */
    cy.get('#firstName').type('Thiago')
    .should('have.value', 'Thiago')
    cy.get('#lastName').type('Fernandes')
    .should('have.value', 'Fernandes')
    cy.get('#email').type('thiago@gmail.com')
    .should('have.value', 'thiago@gmail.com')
    cy.get('#phone').type('99990000')
    .should('have.value', '99990000')
    cy.get('#open-text-area').type('Criando primeira suite de testes Cypress.')

    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')

  })

  it('validar mensagem de erro para campos em branco', () => {
    /* validando mensagem de erro */
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('validar se telefone aceita apenas números', () => {
     /* usar have.value para determinar se campo texto esta vazio */
     cy.get('#phone').type('abc')
       .should('have.value', '')

   })

  it('validar se envio falha caso não preencher telefone como obrigatório', () => {
     /* usar have.value para determinar se campo texto esta vazio */
     cy.get('#firstName').type('Thiago')
     cy.get('#lastName').type('Fernandes')
     cy.get('#email').type('thiago@gmail.com')

     cy.get('#phone-checkbox').click()
     // cy.get('#phone').type('99990000')
     
     cy.get('#open-text-area').type('Criando primeira suite de testes Cypress.')

     cy.get('button[type="submit"]').click()
     cy.get('.error').should('be.visible')

   })

  it('envia formulário com sucesso usando comando customizado', () => {
     /* criar comando customizado em /support e utilizar para preencher formulário
       usar para casos de testes redundantes
     */
     cy.fillMandatoryFieldsAndSubmit()
     /* contains no lugar de get para identificar elemento */
     cy.contains('button', 'Enviar').click()
     cy.get('.success').should('be.visible')
   })
  /*------------------- END Seção 3 --------------------*/

  /*------------------- Seção 4 --------------------*/

  it('seleciona produto Youtube por seu value', () => {
    /* seleciona item de combo box com select */
    cy.get('#product').select('youtube')
    .should('have.value', 'youtube')
  })

  it('seleciona produto Blog por seu índice', () => {
    /* seleciona item de combo box com select */
    cy.get('#product').select(1)
    .should('have.value', 'blog')
  })
  /*------------------- END Seção 4 --------------------*/

  /*------------------- Seção 5 --------------------*/

  it('marcar o tipo de atendimento como Feedback', () => {
    /* seleciona item tipo radio button e verifica se esta marcado */
    cy.get('input[type="radio"][value="feedback"]').check()
    .should('be.checked')
  })

  it('seleciona todos os tipos de atendimento', () => {
    /* seleciona item tipo radio button e verifica se esta marcado */
    cy.get('input[type="radio"]').each(typeOfService => {
        cy.wrap(typeOfService)
        .check()
        .should('be.checked')
      })
  })
  /*------------------- END Seção 5 --------------------*/

  /*------------------- Seção 6 --------------------*/
  it('Marca todos os check boxes', () => {
    /* Marca todos checkboxes da página e desmarca o ultimo */
    cy.get('input[type="checkbox"]').check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')
    
  })

  it('Marca o checkbox do telefone com check', () => {
    /* seleciona checkbox com check, mais seguro que click */
    cy.get('#phone-checkbox').check()
    .should('be.checked')
  })
  /*------------------- END Seção 6 --------------------*/

  /*------------------- Seção 7 --------------------*/
 it('seleciona um arquivo da pasta fixtures', () => {
  /* faz upload de arquivo de uma pasta, usando expect para verificar se o arquivo foi selelcionado */
    cy.get('#file-upload').selectFile('cypress/fixtures/example.json')
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
  })

 })

 it('seleciona um arquivo com drag-drop', () => {
  /* faz upload usando drag-drop */
    cy.get('#file-upload').selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
    .should(input => {
    expect(input[0].files[0].name).to.equal('example.json')
  })

 })

 it('seleciona um arquivo com alias', () => {
  /* definir alias para arquivo antes de chama-lo como argumento */
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload').selectFile('@sampleFile')
    .should(input => {
    expect(input[0].files[0].name).to.equal('example.json')
    })
  })
  /*------------------- END Seção 7 --------------------*/

  /*------------------- Seção 8 --------------------*/
  it('verifica politica de privacidade em nova aba sem necessidade de abrir', () => {
    /* verifica se a página existe com contains 'a' e valida se tem os atributos */
    cy.contains('a', 'Política de Privacidade')
    .should('have.attr', 'href', 'privacy.html').and('have.attr', 'target', '_blank')
  })

  it('acessa a página removendo target e clicando no link', () => {
    /* usa o invoke para remover atributo antes de clicar e confirma que é a página em seguida */
    cy.contains('a', 'Política de Privacidade').invoke('removeAttr', 'target')
    .click()
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })
  /*------------------- END Seção 8 --------------------*/

  /*------------------- Seção 9 --------------------*/
  /* alterações no arquivo package.json e cypress.config.js para rodar no tamanho mobile e rodar no formato headless, gerando videos da execução */
  /*------------------- END Seção 9 --------------------*/

  /*------------------- Seção 11 --------------------*/
  /* criação de dir github para criar workflow de integração continua */
  /*------------------- END Seção 11 --------------------*/

  /*------------------- Seção 12 --------------------*/
  /* forçar erro na aplicação */

})