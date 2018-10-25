const webpack = require('webpack');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  context: __dirname,
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? 'source-map' : 'eval-source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'cauldron-react.js',
    library: 'CauldronReact',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${isProd ? 'production' : 'development'}"`
      }
    })
  ],
  devServer: {
    port: 8000,
    historyApiFallback: true
  }
};
