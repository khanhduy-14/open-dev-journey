export default {
  extends: ['@commitlint/config-conventional'],

  parserPreset: {
    parserOpts: {
      // Format: <type>/#<scope>: <subject>
      headerPattern: /^(\w+)\/#(\w+): (.*)$/,

      // Mapping group regex
      headerCorrespondence: ['type', 'scope', 'subject'],
    },
  },

  rules: {
    'type-enum': [
      2, // level 2 = error
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'revert'],
    ],

    'header-min-length': [2, 'always', 10],

    'header-max-length': [2, 'always', 160],

    'body-max-line-length': [2, 'always', 120],

    'subject-case': [
      0, // off
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
  },
};
