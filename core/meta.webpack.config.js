module.exports = {
  entry: {
    cli: './cli.js',
    wrapper: './wrapper.js',
  },
  mode: 'development',
  target: 'node',
  node: { __dirname: false }
}
