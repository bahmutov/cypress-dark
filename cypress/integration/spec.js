/// <reference types="cypress" />
describe('something', () => {
  context('with tests', () => {
    it('works', () => {
      cy.wait(100)
    })
    it('works again', () => {
      cy.wait(100)
    })
    it('and again', () => {
      cy.wait(100)
    })
  })
})
