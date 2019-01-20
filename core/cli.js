const webpack = require('webpack');
const config = require('./webpack.config');
console.log(config);
const compiler = webpack(config);
compiler.run((error, stats) => {
  if (error) console.error(error)
  else console.log(stats.toString());
});
