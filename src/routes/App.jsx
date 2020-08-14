import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Layout from '../components/Layout';
import Home from '../containers/Home';
import Details from '../containers/Details';
import NotFound from '../containers/NotFound';
import Upload from '../containers/Upload';
import Update from '../containers/Update';

const App = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/details/:id" component={Details}/>
          <Route exact path="/upload" component={Upload}/>
          <Route exact path="/update/:id" component={Update}/>
          <Route path="/404" component={NotFound}/>
          <Redirect from="*" to="/404"/>
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default App;

