'use strict'

const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')

console.log(process.env.SERVER_URL || 'localhost')


module.exports = {
  devtool: 'eval',
  entry: {
    main: './index',
    vendor: ['xstream', '@cycle/run', '@cycle/dom']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: function(modules) {
        return module.context && module.context.indexOf('node_modules') !== -1
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ],
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [autoprefixer({ browsers: ['last 2 versions'] })]
              }
            }
          },
          { loader: 'stylus-loader' }
        ]
      }
    ]
  },
  devServer: {
    open: true, // to open the local server in browser
    contentBase: path.resolve(__dirname, './')
  }
}
