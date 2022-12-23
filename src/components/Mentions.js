import React, { Component, useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, 
        ListGroup, ListGroupItem, DropdownItem, ButtonGroup, Button } from 'reactstrap';

export function Mentions() {
    // 1. make title big
    // 2. make title centered
    // 3. make sort by not activated
    // 4. make two containers in flex container
    // 5. resize list
    // 6. enlarge text
    // 10. add padding to list
    // 11. make sort by more horizontal
    // 12. put onclick and usecallback for actions and set active
    // 13. use classes to change colors
    // 14. use freaking buttongroups
    
    
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    const [cSelected, setCSelected] = useState([]);

    const onCheckboxBtnClick = (selected) => {
        const index = cSelected.indexOf(selected);
        if (index < 0) {
        cSelected.push(selected);
        } else {
        cSelected.splice(index, 1);
        }
        setCSelected([...cSelected]);
    };

    return (
        <div>
            <div style={{ width: "100%" }}>
                <h1 style={{ margin: "auto", width: "fit-content" }}>Story Mentions</h1>
            </div>
            <div id="mentions-header">
                <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
                    <DropdownToggle caret size="lg" id='sort-btn' color='dark'>
                        Sort by
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>Popularity</DropdownItem>
                        <DropdownItem>Date</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <div id='website-list-container'>
                    <ButtonGroup size='lg'>
                        <Button
                        color='dark'
                        onClick={() => onCheckboxBtnClick(1)}
                        active={cSelected.includes(1)}
                        >
                            Reddit
                        </Button>

                        <Button
                        color='dark'
                        onClick={() => onCheckboxBtnClick(2)}
                        active={cSelected.includes(2)}
                        >
                            Twitter
                        </Button>

                        <Button
                        color='dark'
                        onClick={() => onCheckboxBtnClick(3)}
                        active={cSelected.includes(3)}
                        >
                            TikTok
                        </Button>
                    </ButtonGroup>
                    
                
                </div>
            </div>
        </div>
    );
}
