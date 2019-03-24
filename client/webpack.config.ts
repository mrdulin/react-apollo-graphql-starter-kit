import webpack from 'webpack';
import path from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const cwd = process.cwd();

const src = path.resolve(cwd, 'src');
const dist = path.resolve(cwd, 'dist');
const port = 3001;

const config: webpack.Configuration = {
  entry: {
    app: src,
    vendors: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-apollo',
      'apollo-cache-inmemory',
      'apollo-client',
      'apollo-link',
      'apollo-link-context',
      'apollo-link-error',
      'apollo-link-http',
      'apollo-link-http-common',
      'apollo-link-schema',
      'apollo-link-state',
      'apollo-link-ws',
      'apollo-upload-client',
      'apollo-utilities',
      'graphql',
      'graphql-tag',
      'subscriptions-transport-ws'
    ]
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
      services: path.resolve(src, 'services'),
      types: path.resolve(src, 'types')
    },
    extensions: ['.tsx', '.ts', '.mjs', '.js']
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      },
      {
        test: /\.(ts|tsx)$/,
        include: [src],
        use: 'ts-loader'
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
    new HtmlWebpackPlugin({
      template: src + '/index.html'
    })
  ],
  devServer: {
    contentBase: dist,
    port
  }
};

export default config;
