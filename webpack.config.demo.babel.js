import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import config, { isProd } from './webpack.commons.js';

const plugins = config.plugins.slice();

plugins.push(new HtmlWebpackPlugin({
  template: './demo/index.html',
  favicon: './demo/assets/img/favicon.ico'
}));

module.exports = {
  ...config,
  entry: './demo/index.js',
  output: {
    path: path.resolve(__dirname, './demo/dist/'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devtool: isProd ? 'source-map' : 'eval-source-map',
  plugins
};
