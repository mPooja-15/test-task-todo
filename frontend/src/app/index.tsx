import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { hot } from 'react-hot-loader';
import { LoginPage, Register } from './components/index';
import Todo from './pages/todo/index';
import 'bootstrap/dist/css/bootstrap.min.css';

const PrivateRoute = (props: any) => {
  const storedText: any = localStorage.getItem('@auth');
  const token: any = JSON.parse(storedText);
  return token ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: '/'
      }}
    />
  );
};

export const App = hot(module)(() => (
  <Switch>
    <Route path="/" exact component={LoginPage} />
    <Route path="/register" exact component={Register} />
    {/* <PrivateRoute path="/deals" component={DealList} />
    <PrivateRoute path="/:id" component={DealData} /> */}
    <PrivateRoute path="/todo" exact component={Todo} />
  </Switch>
));
