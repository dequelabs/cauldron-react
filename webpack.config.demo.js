const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const config = require('./webpack.config');

const { NODE_ENV = 'development' } = process.env;

module.exports = {
  ...config,
  entry: {
    demo: './demo/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'demo', 'dist'),
    filename: '[name].js',
    // When deployed, the URL is http://dequelabs.github.io/cauldron-react/, so we need to use the prefix as our `publicPath`.
    publicPath: NODE_ENV === 'development' ? '/' : '/cauldron-react/'
  },
  plugins: [
    ...config.plugins,
    new HtmlWebpackPlugin({
      template: './demo/index.html',
      favicon: './demo/assets/img/favicon.ico',
      chunks: ['demo']
    })
  ],
  module: {
    ...config.module,
    rules: [
      ...config.module.rules,
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=public/fonts/[name].[ext]'
      }
    ]
  }
};
