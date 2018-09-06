'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  NE_API: '"http://test-ne-admin.coohua.top"',
  PUSH_API: '"http://test-push-web.coohua.top"',
})
