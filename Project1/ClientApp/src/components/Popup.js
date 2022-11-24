import React, { Component } from 'react';
import squareLogo from '../assets/square-logo.png'

export class Popup extends Component {
    static displayName = Popup.name;

    render() {
        return (
            <div>
                <Card id="popup-container">
                    <ListGroup flush>
                        <ListGroupItem>
                            <CardImg
                                alt="cool logo icon"
                                src={squareLogo}
                                display="span"
                            />
                            <CardTitle tag="h5">
                                Writerapp
                            </CardTitle>
                            <Button>
                                Home
                            </Button>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Button>
                                Analyze this story on foreign websites
                            </Button>
                            <Button>
                                Analyze this story's popularity
                            </Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </div>
        );
    }
}
