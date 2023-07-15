import React, { Component }from 'react';
import { Card, CardBody, CardText, CardTitle, Button }from 'reactstrap';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Payment</h1>
        <p>Click the Pay button for the tier you bought to see info on your subscription.</p>
        <Card
          className="my-2"
          style={{
            width: '18rem'
          }}
        >
          <CardBody>
            <CardTitle tag="h5">
              Free
            </CardTitle>
            <CardText>
              The free tier of writerapp currently includes:
            </CardText>
            <ul>
              <li>Check the previous works of an author</li>
              <li>Analyze the current top 5 genres of Royal Road and see if the selected fiction matches them</li>
              <li>Observe a detailed graph representing the consistency of the selected fiction</li>
            </ul>
          </CardBody>
        </Card>

        <Card
          className="my-2"
          style={{
            width: '18rem'
          }}
        >
          <CardBody>
            <CardTitle tag="h5">
              Plus
            </CardTitle>
            <CardText>
              The plus tier of writerapp currently includes:
            </CardText>
            <ul>
              <li>See a detailed graph of how many readers engaged to a fiction overtime (using comments in each chapter)</li>
            </ul>
            <Button onClick={extpay.openPaymentPage()}>
                  Pay
            </Button>
          </CardBody>
        </Card>

        <a href="#" id="home-link">Click here to see what tier of Writerapp you currently have.</a>
      </div>
    );
  }
}
