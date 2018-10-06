/// <reference types="cypress" />
const { join } = require('path')
const postcss = require('postcss')
const cssVariables = require('postcss-css-variables')

/**
 * Converts CSS variables to plain CSS
 */
const convertCssVariables = mycss =>
  postcss([cssVariables()]).process(mycss).css

const knownThemes = ['dark', 'halloween']

const isStyleLoaded = $head => $head.find('#cypress-dark').length > 0

const getTheme = () => Cypress._.toLower(Cypress.config('theme') || 'dark')

const getSourceFolder = () => {
  // if source folder starts with /../...
  // the the user package has installed it using relative "file:.." link
  const installedAsFile = Cypress._.startsWith(__dirname, '/..')
  const sourceFolder = installedAsFile
    ? join('node_modules/cypress-dark/src')
    : __dirname
  return sourceFolder
}

/* eslint-env mocha, browser */
/* global Cypress, cy */
before(() => {
  // do we have style loaded already? if yes, nothing to do
  const $head = Cypress.$(parent.window.document.head)
  if (isStyleLoaded($head)) {
    return
  }

  let theme = getTheme()

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

  cy
    .readFile(themeFilename, { log: false })
    .then(convertCssVariables)
    .then(css => {
      const $head = Cypress.$(parent.window.document.head)
      $head.append(
        `<style type="text/css" id="cypress-dark" theme="${theme}">\n${css}</style>`
      )
    })
})

const hasFailed = () => {
  const rootSuite = getRootTest(Cypress.state('ctx').currentTest)
  const failed = hasSuiteFailed(rootSuite)
  return failed
}

const isHalloween = () => getTheme() === 'halloween'

const witchLaughs = () => {
  const filename = join(getSourceFolder(), 'halloween-laugh.mp3')
  cy.readFile(filename, 'base64', { log: false }).then(mp3 => {
    const uri = 'data:audio/mp3;base64,' + mp3
    const audio = new Audio(uri)
    audio.play()
  })
}

const getRootTest = test => {
  return test.parent ? getRootTest(test.parent) : test
}

const hasTestFailed = test => test.state === 'failed'

const hasSuiteFailed = suite => {
  return suite.tests.some(hasTestFailed) || suite.suites.some(hasSuiteFailed)
}

after(() => {
  if (hasFailed() && isHalloween()) {
    witchLaughs()
  }
})
