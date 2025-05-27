describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach (() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    /* should() para verificar se pagina contem o item
     usar com: be.equal, not.be.equal, be.visible, have.value,etc
    */
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche campos obrigatórios enviar formulário', () => {
    /* get para pegar elementos, type para digitar
      usar de forma encadeada
    */
    cy.get('#firstName').type('Thiago')
    cy.get('#lastName').type('Fernandes')
    cy.get('#email').type('thiago@gmail.com')
    cy.get('#phone').type('99990000')
    cy.get('#open-text-area').type('Criando primeira suite de testes Cypress.')
    
    cy.get('#firstName').should('have.value', 'Thiago')
    cy.get('#lastName').should('have.value', 'Fernandes')
    cy.get('#email').should('have.value', 'thiago@gmail.com')
    cy.get('#phone').should('have.value', '99990000')

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
    cy.get('#phone')
      .type('abc')
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
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
 })
})