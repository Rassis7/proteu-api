module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'prettier/@typescript-eslint',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'eslint-plugin-prettier'],
  rules: {
    'no-undef': 'warn',
    'no-unused-vars': 'warn',
    // 'typescript/no-use-before-define': 'warn',
    // 'typescript/no-unused-vars': 'warn',
    'prettier/prettier': [
      'warn',
      {
        parser: 'typescript',
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
      },
    ],
  },
};
