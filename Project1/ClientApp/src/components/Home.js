import React, { Component } from 'react';
import { Roadmap } from './Roadmap';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>Hello and thank you for using the free tier of writerapp.</p>

        <Roadmap />
      </div>
    );
  }
}
