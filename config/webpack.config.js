const path = require('path')

const config = require('./site.config')
const loaders = require('./webpack.loaders')
const plugins = require('./webpack.plugins')
const optimization = require('./webpack.optimization')

module.exports = {
  context: path.join(config.root, config.paths.src),
  entry: {
    [`${config.paths.js}/script`]: [
      path.join(config.root, config.paths.src, config.paths.assets, 'js/scripts.js'),
    ],
  },
  output: {
    path: path.join(config.root, config.paths.dist),
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  mode: ['production', 'development'].includes(config.env)
    ? config.env
    : 'development',
  devtool: config.env === 'production'
    ? 'hidden-source-map'
    : 'cheap-eval-source-map',
  devServer: {
    contentBase: path.join(config.root, config.paths.dist),
    open: true,
    port: config.port,
    host: config.dev_host,
  },
  module: {
    rules: loaders,
  },
  plugins,
  optimization,
}
