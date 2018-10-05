const { join } = require('path')

/* eslint-env mocha, browser */
/* global Cypress, cy */
before(() => {
  cy.readFile(join(__dirname, 'dark.css')).then(css => {
    const $head = Cypress.$(parent.window.document.head)
    if (!$head.find('#cypress-dark').length) {
      $head.append(`<style type="text/css" id="cypress-dark">\n${css}</style>`)
    }
  })
})
