it.only('verifica politica de privacidade separadamente', () => {
    /* visita a pagina e valida se existe */
    cy.visit('./src/privacy.html')
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
    cy.contains('p', 'Talking About Testing').should('be.visible')
})