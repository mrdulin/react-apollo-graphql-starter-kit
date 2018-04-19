import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';

import App from './containers/app';
import Home from './containers/home';
import About from './containers/about';
import BookList from './containers/bookList';

const client = new ApolloClient({
  // uri: 'http://localhost:4000/graphql'
});

function test() {
  client
    .query({
      query: gql`
        {
          books {
            title
          }
        }
      `
    })
    .then(result => console.log(result))
    .catch(err => console.error(err));
}
// test();

const render = Root => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <HashRouter>
        <Root>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route paht="/book-list" component={BookList} />
          </Switch>
        </Root>
      </HashRouter>
    </ApolloProvider>,

    document.getElementById('app')
  );
};

render(App);
