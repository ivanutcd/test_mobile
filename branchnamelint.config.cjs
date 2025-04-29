module.exports = {
  pattern: ':type/:user/:month/:name',
  params: {
    type: ['feature', 'fix', 'docs', 'misc', 'improve', 'introduce'],
    user: ['[a-z0-9-]+\\.[a-z0-9-]+'],
    month: ['\\d{4}-\\d{2}'],
    name: ['[a-z0-9-]+'],
  },
  prohibited: ['ci', 'wip', 'main', 'test', 'build', 'master', 'release'],
};
