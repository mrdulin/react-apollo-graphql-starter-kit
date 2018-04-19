import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';

import App from './containers/app';
import Home from './containers/home';
import About from './containers/about';

const render = Root => {
  ReactDOM.render(
    <HashRouter>
      <Root>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </Switch>
      </Root>
    </HashRouter>,
    document.getElementById('app')
  );
};

render(App);
