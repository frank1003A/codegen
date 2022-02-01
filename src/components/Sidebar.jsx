import {Navbar, Nav, NavItem, Button, Glyphicon} from 'react-bootstrap';
import Sidebar from 'react-bootstrap-sidebar';
import { useState } from 'react';
import React from 'react';

const Sidebars = () => {
    const [isVisible, setisVisible] = useState(false);

    const updateModal = (isVisible) => {
        setisVisible(isVisible);
    }
    return (
        <div>
            <Button bsStyle="primary" onClick={ () => updateModal(true) }><Glyphicon glyph="menu-hamburger"/></Button>
            <Sidebar side='left' isVisible={ this.state.isVisible } onHide={ () => updateModal(false) }>
              <Nav>
                <NavItem href="#">Link 1</NavItem>
                <NavItem href="#">Link 2</NavItem>
                <NavItem href="#">Link 3</NavItem>
                <NavItem href="#">Link 4</NavItem>
              </Nav>
            </Sidebar>
        </div>
  );
};

export default Sidebars;
