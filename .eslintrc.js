module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'airbnb-base',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue', 'prettier'],
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'consistent-return': 'off',
    'no-unused-vars': 'off',
    'func-names': 'off',
    'no-plusplus': 'off',
    'no-shadow': 'off',
    'global-require': 'off',
    'no-param-reassign': 'off',
    'prefer-destructuring': 'off',

    // IMPORT
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',

    'prettier/prettier': [
      'error',
      {
        bracketSameLine: true,
        trailingComma: 'all',
        singleQuote: true,
        printWidth: 80,
        semi: false,
        tabWidth: 2,
        useTabs: false,
      },
    ],
  },
}
