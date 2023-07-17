import React, { Component } from 'react';
import { Card, CardImg, CardTitle, Button, CardHeader } from 'reactstrap';
import squareLogo from './assets/square-logo.png'
import { AnalyticsView } from './components/AnalyticsView.js';
import { extpay } from '../background.js'

function getCurrentUrl(){
    browser.tabs.query({currentWindow: true, active: true})
      .then((tabs) => {
        const url = tabs[0].url;
    })
    return url
}

function hideText(text, btn) {
    // hide the payment failure text
    document.getElementById(text).style.display = 'none';
    btn.style.display = 'none';
}

const failedPaymentNotice = () => {
    return (
        <div style={{ margin: "auto", width: "fit-content" }}>
            <p style={{ color: "red" }} className={props.shouldHide? 'hidden' : undefined}>Your subscription payment has failed to process correctly. The upgrade page can update 
                your card information.
            </p>
        </div>
    )
}

export function Popup() {
    const displayName = Popup.name;
    const [showResults, setShowResults] = React.useState(false)

    const onClick = () => setShowResults(true)

    return (
        <div>
            <Card id="popup-container">
                <a id="hide-btn" href="#" onclick={onClick}>Hide</a>
                { showResults ? <failedPaymentNotice /> : null }
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
                            <Button onClick={extpay.openPaymentPage}>
                                Upgrade
                            </Button>
                        </div>
                        <div id="popup-home" title="Login if you paid for a subscription">
                            <Button onClick={extpay.openLoginPage}>
                                Login
                            </Button>
                        </div>
                    </div>
                </CardHeader>

                <div id="popup-btn-group">
                    <Button onClick={<AnalyticsView fictionUrl={getCurrentUrl()}/>}>
                        Analyze this story
                    </Button>
                </div>
            </Card>
        </div>
    );
    
}
