module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
    project: 'tsconfig.json'
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'promise',
    'prettier',
  ],
  rules: {
    'prefer-const': 'error',
  },
  overrides: [
    /**
     * CLIENT SIDE CODE
     */
    {
      files: ['src/**/*.{ts,js,jsx,tsx}'],

      env: {
        browser: true,
        es2020: true
      },
      rules: {
        'react/prop-types': 'off',
        'react/no-children-prop': 'off',
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".tsx", ".ts"] }],
      },
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'prettier/react',
      ],
    },
    /**
     * TYPESCRIPT CODE
     */
    {
      files: ['{src,tests}/**/*.{ts,tsx}'],
      extends: [
        'prettier/@typescript-eslint',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    /**
     * TESTS
     */
    {
      files: ['tests/**/*.{js,jsx,ts,tsx}'],
      extends: [],
      env: { node: true, jest: true },
    },
  ],
};
