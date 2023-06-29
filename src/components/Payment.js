import React, { Component } from 'react';
import { Roadmap } from './Roadmap';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Payment</h1>

        <div>
          <h2>Free</h2>
          <p>The free tier of writerapp currently includes:</p>
          <ul>
            <li>Check the previous works of an author</li>
            <li>Analyze the current top 5 genres of Royal Road and see if the selected fiction matches them</li>
            <li>Observe a detailed graph representing the consistency of the selected fiction</li>
          </ul>
        </div>

        <div>
          <h2>Plus</h2>
          <p>The plus tier of writerapp currently includes:</p>
          <ul>
            <li>See a detailed graph of how many readers engaged to a fiction overtime (using comments in each chapter)</li>
          </ul>
          <div id="popup-home">
              <Button onClick={extpay.openPaymentPage()}>
                  Pay
              </Button>
          </div>
        </div>
        
        <a href="#" id="home-link">Click here to see what tier of Writerapp you currently have.</a>
      </div>
    );
  }
}
