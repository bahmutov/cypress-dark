/// <reference types="cypress" />

// usually we load theme from "cypress/support/index.js"
// but since we are checking multiple themes, each spec file
// loads its own
require('../../src/halloween')

/*
  Several tests that show how Cypress test runner looks with
  a custom color theme
*/
describe('Cypress themes', { baseUrl: 'http://www.halloween-website.com/' }, () => {
  beforeEach(() => {
    // do not let the site load any ads
    cy.intercept('GET', 'https://pagead2.googlesyndication.com', {
      body: ''
    }).as('ads')
  })

  before(() => {
    cy.visit('/')
    cy.get('#camera_wrap').should('be.visible')
      .wait(2000)
  })

  it('has failing test if needed', () => {
    expect(1).to.equal(1)
    // expect(1).to.equal(2)
  })

  it('has passing test', () => {
    expect(1).to.equal(1)
  })

  it('has skipped test')
})
describe('passing suite', () => {
  it('has 1 passing test', () => {})
})
describe('skipped suite', () => {
  it('is empty')
  it('is also empty')
})
