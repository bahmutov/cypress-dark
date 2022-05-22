require('../../src/dark')

describe('custom dark theme', () => {
  it('loads page with dark theme', () => {
    cy.visit('cypress/fixtures/custom-dark.html')
    cy
      .get('body')
      .should('have.css', 'color', 'rgb(221, 221, 221)')
      .and('have.css', 'background-color', 'rgb(34, 34, 34)')
    cy.get('@dark-media-query').should('have.been.calledOnce')
  })

  it('works again', () => {
    cy.visit('cypress/fixtures/custom-dark.html')
    cy.get('@dark-media-query').should('have.been.calledOnce')
  })
})
