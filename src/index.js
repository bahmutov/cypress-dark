const { join } = require('path')

const knownThemes = ['dark']

/* eslint-env mocha, browser */
/* global Cypress, cy */
before(() => {
  let theme = Cypress.config('theme') || 'dark'

  if (!knownThemes.includes(theme)) {
    console.error(
      'Unknown theme name "%s", only known themes are: %s',
      theme,
      knownThemes.join(', ')
    )
    theme = 'dark'
    console.error('using default theme "%s"', theme)
  }

  const themeFilename = join(__dirname, `${theme}.css`)

  cy.readFile(themeFilename).then(css => {
    const $head = Cypress.$(parent.window.document.head)
    if (!$head.find('#cypress-dark').length) {
      $head.append(
        `<style type="text/css" id="cypress-dark" theme="${theme}">\n${css}</style>`
      )
    }
  })
})
