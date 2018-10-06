/// <reference types="cypress" />
/*
  Several tests that show how Cypress test runner looks with
  a custom color theme
*/
describe('Cypress themes', () => {
  // beforeEach(() => {
  //   // use devdocs.io in dark mode for demo
  //   cy.visit('https://devdocs.io/')
  //   cy.setCookie('dark', '1').setCookie('hideIntro', '1')
  //   // let the page load
  //   cy.contains('._list-text', 'JavaScript').should('be.visible')
  // })
  beforeEach(() => {
    cy.visit('http://www.halloween-website.com/').wait(300)
  })

  // it.skip('loads JavaScript docs', () => {
  //   cy.get('input[name=q]').type('JavaScript{enter}', {
  //     delay: 50
  //   })
  //   cy.url().should('contain', '/javascript/')
  //   cy.get('._content-loading').should('not.be.visible')
  //   cy.contains('._list-item', 'JavaScript').should('have.class', 'active')
  // })

  it('has failing test if needed', () => {
    // cy.wait(10000000)
    // expect(1).to.equal(1)
    expect(1).to.equal(2)
  })

  it('has passing test', () => {
    expect(1).to.equal(1)
  })

  it('has skipped test')
})
