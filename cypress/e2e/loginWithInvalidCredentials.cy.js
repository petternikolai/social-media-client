describe('login function', () => {
  it('Does not allow login with invalid credentials and shows an error message', () => {
    cy.visit('/')
    cy.wait(1000)
    cy.get(
      '#registerForm > div.modal-footer > button.btn-outline-success',
    ).click()
    cy.get('#loginEmail').type('wronguser@example.com', { force: true })
    cy.get('#loginPassword').type('wrongpassword', { force: true })
    cy.get('#loginForm button').contains('Login').click()
    cy.on('window:alert', (alert) => {
      expect(alert).to.contains(
        'Only Noroff student or teacher emails are valid.',
      )
    })
  })
})
