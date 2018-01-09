import path from 'path';
import config, { isProd } from './webpack.commons.js';

module.exports = {
  ...config,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'cauldron.js'
  },
  devtool: isProd ? 'source-map' : 'eval-source-map'
};
