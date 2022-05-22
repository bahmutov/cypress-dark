const { loadTheme, stubMediaQuery } = require('../utils')

/* eslint-env mocha, browser */
before(loadTheme('dark'))
before(stubMediaQuery())
