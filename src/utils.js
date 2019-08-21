const { join } = require('path')
const postcss = require('postcss')
const cssVariables = require('postcss-css-variables')

/* global Cypress, cy */
/* eslint-env browser */
const getSourceFolder = () => {
  // if source folder starts with /../...
  // the the user package has installed it using relative "file:.." link
  const installedAsFile = Cypress._.startsWith(__dirname, '/..')
  const sourceFolder = installedAsFile
    ? join('node_modules/cypress-dark/src')
    : __dirname
  return sourceFolder.replace(/^\//, '')
}

/**
 * Converts CSS variables to plain CSS
 */
const convertCssVariables = mycss =>
  postcss([cssVariables()]).process(mycss).css

const knownThemes = ['dark', 'halloween']

const getHead = () => Cypress.$(parent.window.document.head)

const isStyleLoaded = $head => $head.find('#cypress-dark').length > 0

const getTheme = () => Cypress._.toLower(Cypress.config('theme') || 'dark')

const hasFailed = () => {
  const rootSuite = getRootTest(Cypress.state('ctx').currentTest)
  const failed = hasSuiteFailed(rootSuite)
  return failed
}

const getRootTest = test => {
  return test.parent ? getRootTest(test.parent) : test
}

const hasTestFailed = test => test.state === 'failed'

const hasSuiteFailed = suite => {
  return suite.tests.some(hasTestFailed) || suite.suites.some(hasSuiteFailed)
}

const isTheme = theme => getTheme() === theme

const shouldStubMediaQuery = () => Boolean(Cypress.config('darkMediaQuery'))

/**
 * returns a function that a `before` callback can call to load desired theme
 * @example before(toLoadTheme('halloween'))
 */
const loadTheme = theme => {
  return () => {
    // do we have style loaded already? if yes, nothing to do
    // const $head = Cypress.$(parent.window.document.head)
    const $head = getHead()
    if (isStyleLoaded($head)) {
      return
    }

    if (!theme) {
      theme = getTheme()
    }

    if (!knownThemes.includes(theme)) {
      console.error(
        'Unknown theme name "%s", only known themes are: %s',
        theme,
        knownThemes.join(', ')
      )
      theme = 'dark'
      console.error('using default theme "%s"', theme)
    }

    const themeFilename = join(getSourceFolder(), `${theme}.css`)

    cy.readFile(themeFilename, { log: false })
      .then(convertCssVariables)
      .then(css => {
        $head.append(
          `<style type="text/css" id="cypress-dark" theme="${theme}">\n${css}</style>`
        )
      })
  }
}

const stubMediaQuery = () => () => {
  if (!shouldStubMediaQuery()) {
    return
  }

  // if website supports loading dark theme styles via JavaScript
  // then tell it to. Website should ask like this
  // if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  //  load dark css
  // }
  Cypress.on('window:before:load', win => {
    cy.stub(win, 'matchMedia')
      .withArgs('(prefers-color-scheme: dark)')
      .returns({
        matches: true
      })
      .as('dark-media-query')
  })
}

module.exports = {
  getSourceFolder,
  hasFailed,
  loadTheme,
  isTheme,
  stubMediaQuery
}
