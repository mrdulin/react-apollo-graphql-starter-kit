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

const AppRouter = () => (
  <HashRouter>
    <App>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/book-list" component={BookList} />
        <Route path="/book-detail/:id" component={BookDetail} />
        <Route path="/topics" component={Topics} />
        <Route path="/topic/:id" component={Topic} />
        <Route path="/upload" component={Upload} />
      </Switch>
    </App>
  </HashRouter>
);

export { AppRouter };
