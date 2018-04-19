const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const config = require('../../webpack.config');

const app = express();
const compiler = webpack(config);

const books = [
  {
    id: '1',
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling'
  },
  {
    id: '2',
    title: 'Jurassic Park',
    author: 'Michael Crichton'
  }
];

const typeDefs = `
  type Query {
    books: [Book]
  }

  type Book {
    id: ID!,
    title: String,
    author: String
  }
`;

const resolvers = {
  Query: {
    books: () => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(books);
        }, 2000);
      });
    }
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  })
);
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(3000, function() {
  console.log('Example app listening on port 3000!\n');
});
