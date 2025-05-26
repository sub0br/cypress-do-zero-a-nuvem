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

  it('preenche campos obrigatórios', () => {
    /* get para pegar elementos, type para digitar
      usar de forma encadeada
    */
    cy.get('#firstName').type('Thiago')
    cy.get('#lastName').type('Fernandes')
    cy.get('#email').type('thiago@gmail.com')
    cy.get('#phone').type('99990000')
    
    cy.get('#firstName').should('have.value', 'Thiago')
    cy.get('#lastName').should('have.value', 'Fernandes')
    cy.get('#email').should('have.value', 'thiago@gmail.com')
    cy.get('#phone').should('have.value', '99990000')
  })
})