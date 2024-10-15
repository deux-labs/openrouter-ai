import antfu from '@antfu/eslint-config';

export default antfu({
  type: 'lib',
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: true,

  },
  yaml: true,
  ignores: [
    'node_modules/**/*.*',
  ],
  rules: {
    'ts/consistent-type-definitions': 'off',
  },
});
