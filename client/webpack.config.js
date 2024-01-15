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
    filename: OUTPUT_FILE,
    globalObject: 'this',
  },
  // devtool: 'inline-source-map',
  devServer: {
    static: DIST_PATH,
    compress: true,
    port: 8000
  },
  module: {
    rules: [
      // {
      //   test: /\.worker\.ts$/,
      //   use: {
      //     loader: 'worker-loader',
      //     options: { inline: true }
      //   }
      // },
      {test: /\.css$/, use: ['style-loader', 'css-loader']},
      {test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2|otf)$/, use: ['file-loader', 'url-loader']},
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            exclude: [
              /node_modules[\\/]core-js/,
              /node_modules[\\/]webpack[\\/]buildin/,
            ],
            presets: ['@babel/preset-env', { targets: "defaults" }]
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
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sassOptions: {
                fiber: false
              },
            },
          },
        ],
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
    new CopyWebpackPlugin({
        'patterns': [
          {from: './*.html'},
          {from: './*.ico'},
          // {from: './static/*/*.png'},
          {from: './github-buttons.js'},
        ]
    })
  ],
  watchOptions: {
    poll: 1000,
    aggregateTimeout: 500,
    ignored: /node_modules/
  }
};
