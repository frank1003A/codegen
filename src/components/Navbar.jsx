import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <Navbar>
        <Container>
          <Navbar.Brand href="/">MaryBeth Cargo</Navbar.Brand>
          <Navbar.Toggle />
          <Link to="/items">Items</Link>
          <Link to="/customer">customer</Link>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">Mary Beth</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
