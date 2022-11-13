import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import '../custom.css'

export class Payment extends Component {
    static displayName = Payment.name;

    render() {
        return (
            <div id="auth-container">
                <Form>
                    <h2>Payment</h2>
                    <FormGroup>
                        <Label for="exampleAddress">
                            Address
                        </Label>
                        <Input
                            id="exampleAddress"
                            name="address"
                            placeholder="1234 Main St"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleAddress2">
                            Address 2
                        </Label>
                        <Input
                            id="exampleAddress2"
                            name="address2"
                            placeholder="Apartment, studio, or floor"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleCity">
                            City
                        </Label>
                        <Input
                            id="exampleCity"
                            name="city"
                        />
                    </FormGroup>
                    
                    <FormGroup>
                        <Label for="exampleState">
                            State
                        </Label>
                        <Input
                            id="exampleState"
                            name="state"
                        />
                    </FormGroup>
                    <FormGroup check>
                        <Input
                            id="exampleCheck"
                            name="check"
                            type="checkbox"
                        />
                        <Label
                            check
                            for="exampleCheck"
                        >
                            Check me out
                        </Label>
                    </FormGroup>
                    <Button>
                        Sign in
                    </Button>
                </Form>
            </div>
        );
    }
}
