'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-craft.cjs.production.js');
} else {
  module.exports = require('./react-craft.cjs.development.js');
}