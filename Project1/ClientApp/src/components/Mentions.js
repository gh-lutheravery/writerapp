import React, { Component, useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { NavMenu } from './NavMenu';

export class Mentions extends Component {
    static displayName = Layout.name;

    const dropdownOpen = useState(false);
    const setDropdownOpen = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    render() {
        return (
            <div>
                <h1 style={{ margin: "auto" }}>*Story* Mentions</h1>
                <div style={{ display: "flex" }}>
                    <Dropdown isOpen={dropdownOpen} toggle={toggle} {...props}>
                        <DropdownToggle caret size="lg">
                            Sort by
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>Popularity</DropdownItem>
                            <DropdownItem>Date</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                    <ListGroup horizontal>
                        <ListGroupItem
                            action
                            active
                            tag="button"
                        >
                            Cras justo odio
                        </ListGroupItem>
                        <ListGroupItem
                            action
                            tag="button"
                        >
                            Dapibus ac facilisis in
                        </ListGroupItem>
                        <ListGroupItem
                            action
                            tag="button"
                        >
                            Morbi leo risus
                        </ListGroupItem>
                        <ListGroupItem
                            action
                            tag="button"
                        >
                            Porta ac consectetur ac
                        </ListGroupItem>
                        <ListGroupItem
                            action
                            disabled
                            tag="button"
                        >
                            Vestibulum at eros
                        </ListGroupItem>
                    </ListGroup>
                </div>
            </div>
        );
    }
}
