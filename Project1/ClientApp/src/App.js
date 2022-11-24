import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Payment } from './components/Payment';

import './custom.css'
import { Popup } from './components/Popup';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/payment' component={Payment} />
        <Route path='/popup' component={Popup} />
      </Layout>
    );
  }
}
