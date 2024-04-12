describe('login function', () => {
  it('Visit the page, log in with valid user credentials and log out', () => {
    cy.visit('https://petternikolai.github.io/social-media-client/')
    cy.wait(1000)
    cy.get(
      '#registerForm > div.modal-footer > button.btn-outline-success',
    ).click()
    cy.get('#loginEmail').type('thisisafakeuser@noroff.no', { force: true })
    cy.get('#loginPassword').should('be.visible').type('securepassword')
    cy.get('#loginForm button').contains('Login').click()
    cy.wait(1000)
    cy.get('button.btn-outline-warning').contains('Logout').click()
    cy.get('#registerForm > div.modal-footer > button.btn-outline-success')
      .contains('Login')
      .should('exist')
  })
})
