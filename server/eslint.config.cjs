const js = require('@eslint/js')
const globals = require('globals')

module.exports = [
  {
    ignores: ['node_modules/**'],
  },
  {
    files: ['**/*.{js,cjs,mjs}'],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 2021,
      sourceType: 'commonjs',
    },
    rules: js.configs.recommended.rules,
  },
]