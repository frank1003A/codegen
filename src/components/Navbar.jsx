import React from "react";
import { Navbar, Container } from "react-bootstrap";

const NavBar = () => {
  return (
    <div>
      <Navbar id="top">
        <Container>
          <Navbar.Brand href="/">MaryBeth Cargo</Navbar.Brand>
          <Navbar.Toggle />
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
