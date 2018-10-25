const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const config = require('./webpack.config');

module.exports = {
  ...config,
  entry: {
    demo: './demo/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'demo', 'dist'),
    filename: '[name].js',
    publicPath: '/'
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
