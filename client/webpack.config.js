const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const DIST_PATH = path.resolve(__dirname, 'dist');
const ENTRY_FILE = path.resolve(__dirname, 'src', 'index.ts');
const OUTPUT_FILE = 'webpack.bundle.js';

module.exports = {
  mode: 'production',  // development production none
  entry: ENTRY_FILE,
  output: {
    path: DIST_PATH,
    filename: OUTPUT_FILE
  },
  // devtool: 'inline-source-map',
  devServer: {
    contentBase: DIST_PATH,
    compress: true,
    port: 8000
  },
  module: {
    rules: [
      {test: /\.css$/, use: ['style-loader', 'css-loader']},
      {test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2|otf)$/, use: ['file-loader', 'url-loader']},
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          // exclude: /(node_modules|bower_components)/,
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: { transpileOnly: true }
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' }
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      Promise: 'es6-promise-promise'
    }),
    new CopyWebpackPlugin([
      {from: './*.html'},
      {from: './*.ico'},
      {from: './static/*/*.png'},
      {from: './github-buttons.js'},
    ])
  ],
  watchOptions: {
    poll: 1000,
    aggregateTimeout: 500,
    ignored: /node_modules/
  }
};
