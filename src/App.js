import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Payment } from './components/Payment';

import './custom.css'
import { Analytics } from './components/Analytics';

export default class App extends Component {
  static displayName = App.name;
  // route(s) don't work after putting in routes.
  render () {
    return (
      <Layout>
        <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route path='/payment' element={<Payment/>} />
        <Route path='/analyze' element={<Analytics/>} />
        </Routes>
      </Layout>
    );
  }
}
