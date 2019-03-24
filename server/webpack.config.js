const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const cwd = process.cwd();

const src = path.resolve(cwd, 'client/src');
const dist = path.resolve(cwd, 'client/dist');
const port = 3000;

module.exports = {
  entry: {
    app: src,
    vendors: ['react', 'react-dom', 'react-router-dom']
  },
  output: {
    path: dist,
    filename: '[name].js',
    publicPath: '/',
    pathinfo: true
  },
  resolve: {
    alias: {
      gqlMod: path.resolve(src, 'graphql'),
      services: path.resolve(src, 'services')
    }
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [src],
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: 'graphql-tag/loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(dist),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors'
    }),
    new HtmlWebpackPlugin({
      template: src + '/index.html'
    })
  ],
  devServer: {
    port,
    host: '0.0.0.0'
  }
};
