import React, { Component } from 'react';

export class Popup extends Component {
    static displayName = Popup.name;

    render() {
        return (
            <div>
                <div id="popup-container">

                </div>
                <h1>Dashboard</h1>
                <p>Hello and thank you for using the free tier of writerapp.</p>
                <a href="#" id="home-link">Click here to report bugs or suggest features.</a>
                <a href="#" id="home-link">Frequently asked questions.</a>
                <Roadmap />
            </div>
        );
    }
}
