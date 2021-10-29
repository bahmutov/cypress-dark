/// <reference types="cypress" />

// usually we load theme from "cypress/support/index.js"
// but since we are checking multiple themes, each spec file
// loads its own
require('../../src')

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
      .find('.cameraContent.cameracurrent').should('be.visible')
    cy.get('.banner1').should('be.visible')
    cy.contains('.banner2', 'Trick or Treat').should('be.visible')
      .wait(2000)
  })

  it('has failing test if needed', () => {
    // cy.wait(10000000)
    expect(1).to.equal(1)
    // expect(1).to.equal(2)
  })

  it('has passing test', () => {
    expect(1).to.equal(1)
    cy.screenshot('dark-theme', { capture: 'runner' })
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
