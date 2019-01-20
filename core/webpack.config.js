const webpack = require('webpack');
module.exports = {
  context: __dirname,
  entry: './wrapper.js',
  mode: 'development',
  plugins: [new webpack.DefinePlugin({
    __CWD__: JSON.stringify(process.cwd())
  })],
  resolve: {
    alias: {
      __CWD__: process.cwd(),
    }
  },
};
