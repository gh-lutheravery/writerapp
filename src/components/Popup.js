import React, { Component } from 'react';
import { Card, ListGroup, ListGroupItem, CardImg, CardTitle, Button, CardHeader } from 'reactstrap';
import squareLogo from '../assets/square-logo.png'
// !!!!!!!!!!!!!!figure out what components to use to structure popup!!!!!!!!!!!!!!
// properly organize base flex elements
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
                                <Button>
                                    Home
                                </Button>
                            </div>
                        </div>
                    </CardHeader>

                    <div id="popup-btn-group">
                        <Button>
                            Analyze this story on foreign websites
                        </Button>
                        <Button>
                            Analyze this story's popularity
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }
}
