import React from "react";
import { Nav } from "react-bootstrap";

import { Link, NavLink } from "react-router-dom";
import {  HouseFill, BagFill, PersonFill, BookFill, Receipt } from "react-bootstrap-icons";

const Sidenav = () => {
  return (
    <div>
      <Nav>
      <NavLink to={"/"} className="navliks">
        <div className="navIcon">
          <HouseFill />
          </div>
          <p>Home</p>
        </NavLink>
        <NavLink to="/items" className="navliks">
          <div className="navIcon">
          <BagFill />
          </div>
          <p>Items</p>
        </NavLink>
        <NavLink to={"/customer"} className="navliks">
        <div className="navIcon">
          <PersonFill />
          </div>
          <p>Customer</p>
        </NavLink>
        <NavLink to={"/customer"} className="navliks">
        <div className="navIcon">
          <BookFill />
          </div>
          <p>Ucenter</p>
        </NavLink>
        <NavLink to={"/waybill"} className="navliks">
        <div className="navIcon">
          <Receipt />
          </div>
          <p>Waybill</p>
        </NavLink>
      </Nav>
    </div>
  );
};

export default Sidenav;
