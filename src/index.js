const { join } = require('path')
const postcss = require('postcss')
const cssVariables = require('postcss-css-variables')

/**
 * Converts CSS variables to plain CSS
 */
const convertCssVariables = mycss =>
  postcss([cssVariables()]).process(mycss).css

/**
 * Converts CSS variables to plain CSS
 */
const convertCssVariables = mycss =>
  postcss([cssVariables()]).process(mycss).css

const knownThemes = ['dark', 'halloween']

/* eslint-env mocha, browser */
/* global Cypress, cy */
before(() => {
  let theme = Cypress._.toLower(Cypress.config('theme') || 'dark')

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

  cy
    .readFile(themeFilename)
    .then(convertCssVariables)
    .then(css => {
      const $head = Cypress.$(parent.window.document.head)
      if (!$head.find('#cypress-dark').length) {
        $head.append(
          `<style type="text/css" id="cypress-dark" theme="${theme}">\n${css}</style>`
        )
      }
    })
})
