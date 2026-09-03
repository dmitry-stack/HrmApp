module.exports = {
  extends: ['@commitlint/config-conventional'],
  ignores: [
    (message) =>
      message.includes('Co-authored-by: Copilot Autofix powered by AI'),
  ],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
    'subject-case': [0],
  },
};
