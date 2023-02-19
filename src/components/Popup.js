import React, { Component } from 'react';
import { Card, CardImg, CardTitle, Button, CardHeader } from 'reactstrap';
import squareLogo from '../assets/square-logo.png'

export class Popup extends Component {
    static displayName = Popup.name;

    openAnalyze = () => {
        window.open("file:///../pages/analyze.html")
    }

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
                                <Button onClick={browser.runtime.openOptionsPage()}>
                                    Home
                                </Button>
                            </div>
                        </div>
                    </CardHeader>

                    <div id="popup-btn-group">
                        <Button onClick={this.openAnalyze()}>
                            Analyze this story
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }
}
