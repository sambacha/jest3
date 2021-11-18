
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./jest-web3.cjs.production.min.js')
} else {
  module.exports = require('./jest-web3.cjs.development.js')
}
