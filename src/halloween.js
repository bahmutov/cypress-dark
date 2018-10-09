/// <reference types="cypress" />
const { join } = require('path')
const { getSourceFolder, hasFailed, loadTheme } = require('./utils')

/* eslint-env mocha, browser */
/* global cy */
before(loadTheme('halloween'))

const witchLaughs = () => {
  const filename = join(getSourceFolder(), 'halloween-laugh.mp3')
  cy.readFile(filename, 'base64', { log: false }).then(mp3 => {
    const uri = 'data:audio/mp3;base64,' + mp3
    const audio = new Audio(uri)
    audio.play()
  })
}

after(() => {
  if (hasFailed()) {
    witchLaughs()
  }
})
