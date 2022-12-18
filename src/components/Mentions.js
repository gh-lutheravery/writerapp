import React, { Component, useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, 
        ListGroup, ListGroupItem, DropdownItem } from 'reactstrap';

export function Mentions() {
    // 1. make title big
    // 2. make title centered
    // 3. make sort by not activated
    // 4. make two containers in flex container
    // 5. resize list
    // 6. enlarge text
    // 7. put container for list that is dark grey
    // 8. make text white
    // 9. change active and hover colors
    // 10. add padding to list
    // 11. make sort by more horizontal
    
    
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    return (
        <div>
            <div style={{ width: "100%" }}>
                <h1 style={{ margin: "auto", width: "fit-content" }}>Story Mentions</h1>
            </div>
            <div id="mentions-header">
                <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
                    <DropdownToggle caret size="lg" className='sort-btn'>
                        Sort by
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>Popularity</DropdownItem>
                        <DropdownItem>Date</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <div id='website-list-container'>
                    <ListGroup horizontal id='website-list'>
                        <ListGroupItem
                            action
                            active
                            tag="button"
                            id='website-btn'
                        >
                            Reddit
                        </ListGroupItem>
                        <ListGroupItem
                            action
                            tag="button"
                            id='website-btn'
                        >
                            Twitter
                        </ListGroupItem>
                        <ListGroupItem
                            action
                            tag="button"
                            id='website-btn'
                        >
                            TikTok
                        </ListGroupItem>
                    </ListGroup>
                </div>
            </div>
        </div>
    );
}
