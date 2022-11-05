import React, { Component } from 'react';
import { Container, ModalFooter } from 'reactstrap';
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
            <NavLink tag={Link} className="text-dark" to="/counter">Roadmap</NavLink>
            <NavLink tag={Link} className="text-dark" to="/counter">Privacy Policy</NavLink>
            <NavLink tag={Link} className="text-dark" to="/counter">Terms of Service</NavLink>
            <NavLink tag={Link} className="text-dark" to="/counter">Contact</NavLink>
        </ModalFooter>
        </Container>
      </div>
    );
  }
}
