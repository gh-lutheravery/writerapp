import React, { Component } from 'react';
import { Card, CardImg, CardTitle, Button, CardHeader } from 'reactstrap';
import squareLogo from '../assets/square-logo.png'
import { Analytics } from './components/Analytics';
import { extpay } from './background'

function getCurrentUrl(){
    browser.tabs.query({currentWindow: true, active: true})
      .then((tabs) => {
        const url = tabs[0].url;
    })
    return url
}

export class Popup extends Component {
    static displayName = Popup.name;

    render() {
        return (
            <div>
                <Card id="popup-container">
                    
                    <CardHeader>
                        <div id="popup-header-container">
                            <div id="popup-title-container">
                                <CardImg
                                    alt="cool logo icon"
                                    src={squareLogo}
                                    display="span"
                                    id="popup-icon"
                                />
                                <CardTitle tag="h5" id="popup-title">
                                    Writerapp
                                </CardTitle>

                            </div>
                            <div id="popup-home">
                                <Button onClick={extpay.openPaymentPage()}>
                                    Upgrade
                                </Button>
                            </div>
                        </div>
                    </CardHeader>

                    <div id="popup-btn-group">
                        <Button onClick={<Analytics fictionUrl={getCurrentUrl()}/>}>
                            Analyze this story
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }
}
