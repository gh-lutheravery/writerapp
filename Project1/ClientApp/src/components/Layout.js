import React, { Component } from 'react';
import { Container, ModalFooter, NavLink, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavMenu />
        <Container>
                {this.props.children}
        <ModalFooter className="bg-dark border-bottom-5 border-primary">
            <NavItem>
                <NavLink tag={Link} className="text-light" to="/counter">Roadmap</NavLink>
            </NavItem>

            <NavItem>
                <NavLink tag={Link} className="text-light" to="/counter">Privacy Policy</NavLink>
            </NavItem>

            <NavItem>
                <NavLink tag={Link} className="text-light" to="/counter">Terms of Service</NavLink>
            </NavItem>

            <NavItem>
                <NavLink tag={Link} className="text-light" to="/counter">Contact</NavLink>
            </NavItem>
        </ModalFooter>
        </Container>
      </div>
    );
  }
}
