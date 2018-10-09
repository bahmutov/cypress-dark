const { join } = require('path')
const isStyleLoaded = $head => $head.find('#cypress-dark').length > 0
before(() => {
  console.log('parent.window.document.body is', parent.window.document.body)
  // Cypress includes jQuery
  const $head = Cypress.$(parent.window.document.head)
  if (isStyleLoaded($head)) {
    return
  }
  const css = `
  .reporter .stats li.failed {
    /* orange */
    color: #f79109;
  }
  `

  $head.append(`<style type="text/css" id="cypress-dark">\n${css}</style>`)

  // const themeFilename = join(__dirname, 'halloween.css')
  // cy.readFile(themeFilename, { log: false }).then(css => {
  // })
})
