import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import App from './containers/app';
import Home from './containers/home';
import Upload from './containers/upload';
import Login from './containers/login';
import { BookDetail, BookList } from './containers/library';
import { TopicDetail, TopicList } from './containers/topic';
import Cart from './containers/cart';

import { PrivateRoute } from './shared/components/PrivateRoute';

const AppRouter = () => (
  <HashRouter>
    <App>
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/book-list" component={BookList} />
        <PrivateRoute path="/book-detail/:id" component={BookDetail} />
        <PrivateRoute path="/topics" component={TopicList} />
        <PrivateRoute path="/topic/:id" component={TopicDetail} />
        <PrivateRoute path="/upload" component={Upload} />
        <PrivateRoute path="/cart" component={Cart} />
        <Route path="/login" component={Login} />
      </Switch>
    </App>
  </HashRouter>
);

export { AppRouter };
