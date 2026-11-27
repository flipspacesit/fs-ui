'use strict'

// Shared by every Flipspaces web repo. Do not edit a copy — see README.md.

const { VERSION } = require('./formats.cjs')

module.exports = {
  meta: { name: 'eslint-plugin-fs-testid', version: VERSION },
  rules: {
    'require-test-id': require('./require-test-id.cjs'),
    'test-id-format': require('./test-id-format.cjs'),
  },
}
