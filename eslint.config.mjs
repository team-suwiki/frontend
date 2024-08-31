import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import pluginImport from 'eslint-plugin-import';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

const commonRules = {
  ...pluginJs.configs.recommended.rules,
  ...tseslint.configs.recommended.rules,
  ...pluginReact.configs.recommended.rules,
  ...pluginImport.configs.rules,
  ...pluginReactHooks.configs.recommended.rules,
  ...pluginJsxA11y.configs.recommended.rules,
  'react/jsx-uses-react': 'off',
  'react/react-in-jsx-scope': 'off',
  'import/no-unresolved': 'off',
  'react/prop-types': 'off',
  'import/no-named-as-default': 'off',
  'import/no-named-as-default-member': 'off',
  'jsx-a11y/label-has-associated-control': 'off',
  eqeqeq: 'error',
  'no-undef': 'off',
  'no-unused-vars': 'off',
  'simple-import-sort/imports': 'error',
  'simple-import-sort/exports': 'error',
};

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
      parser: parser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      import: pluginImport,
      'jsx-a11y': pluginJsxA11y,
      'simple-import-sort': pluginSimpleImportSort,
    },
    rules: {
      ...commonRules,
    },
  },
  //! ts override (지우면 ts와 충돌)
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: parser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        project: ['./tsconfig.json'],
      },
    },
    rules: {
      ...commonRules,
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
        },
      ],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
      ],
    },
  },
];
