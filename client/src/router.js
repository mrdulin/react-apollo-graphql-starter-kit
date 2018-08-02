import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import App from './containers/app';
import Home from './containers/home';
import About from './containers/about';
import BookList from './containers/bookList';
import BookDetail from './containers/bookDetail';
import Topics from './containers/topics';
import Topic from './containers/topic';
import Upload from './containers/upload';
import Login from './containers/login';

import { PrivateRoute } from './components/PrivateRoute';

const AppRouter = () => (
  <HashRouter>
    <App>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <PrivateRoute path="/book-list" component={BookList} />
        <PrivateRoute path="/book-detail/:id" component={BookDetail} />
        <PrivateRoute path="/topics" component={Topics} />
        <PrivateRoute path="/topic/:id" component={Topic} />
        <PrivateRoute path="/upload" component={Upload} />
        <Route path="/login" component={Login} />
      </Switch>
    </App>
  </HashRouter>
);

export { AppRouter };
