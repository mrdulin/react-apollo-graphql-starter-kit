import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { HttpLink, from, ApolloLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { setContext } from 'apollo-link-context';

import App from './containers/app';
import Home from './containers/home';
import About from './containers/about';
import BookList from './containers/bookList';
import BookDetail from './containers/bookDetail';

import './index.css';

const httpLink = new HttpLink({ uri: '/graphql' });
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('token') || 'default token'
    }
  });

  return forward(operation);
});
const latencyMiddleware = setContext(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('delay');
    }, 500);
  });
});
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authMiddleware, latencyMiddleware, httpLink])
});

// function test() {
//   client
//     .query({
//       query: gql`
//         {
//           books {
//             title
//           }
//         }
//       `
//     })
//     .then(result => console.log(result))
//     .catch(err => console.error(err));
// }
// test();

const render = Root => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <HashRouter>
        <Root>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/book-list" component={BookList} />
            <Route path="/book-detail/:id" component={BookDetail} />
          </Switch>
        </Root>
      </HashRouter>
    </ApolloProvider>,

    document.getElementById('app')
  );
};

render(App);
