const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const { NODE_ENV = 'development' } = process.env;
const isProd = NODE_ENV === 'production';

module.exports = {
  context: __dirname,
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? 'source-map' : 'eval-source-map',
  entry: './demo/index.js',
  output: {
    path: path.resolve(__dirname, 'demo', 'dist'),
    filename: '[name].js',
    // When deployed, the URL is http://dequelabs.github.io/cauldron-react/, so we need to use the prefix as our `publicPath`.
    publicPath: NODE_ENV === 'development' ? '/' : '/cauldron-react/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${isProd ? 'production' : 'development'}"`
      }
    }),
    new HtmlWebpackPlugin({
      template: './demo/index.html',
      favicon: './demo/assets/img/favicon.ico'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader'
      },
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
  },
  devServer: {
    port: 8000,
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
};
