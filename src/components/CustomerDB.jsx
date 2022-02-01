import React from "react";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Button, Table } from "react-bootstrap";
import axios from "axios";

const CustomerDB = () => {
  const [custDB, setcustDB] = useState([]);
  const [itemTable, setitemTable] = useState([]);
  const [searchValue, setsearchValue] = useState("");
  const [name, setname] = useState('');

  //initate api
  const api = axios.create({
    baseURL: "http://localhost:3000/codegen",
  });

  //get all customers
  const fetchCustomers = async () => {
    try {
      await api.get("/customer").then((res) => {
        console.log(res.data);
        setcustDB(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  //get all items
  const fetchItems = async () => {
    try {
      await api.get("/item").then((res) => {
        console.log(res.data);
        setitemTable(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getItemCount = (data) => {
    const count = itemTable.filter((dta) => dta.customerNumber === data);
    return count.length;
  };

  useEffect(() => {
    fetchCustomers();
    fetchItems();
  }, []);

  return (
    <div className="center-container-down">
       <div className="searchit" style={{ width: "50%" }}>
        <Form.Control
          type="search"
          onChange={(e) => setsearchValue(e.target.value)}
          placeholder="type a valid whatsApp Number or name to search customer "
          style={{ width: "100%" }}
        />
        </div>
      <div className="ctab">
      <Table striped bordered hover size="sm" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Customer Name</th>
            <th>Customer No</th>
            <th>Gender</th>
            <th>Number of items</th>
          </tr>
        </thead>
        <tbody>
          {custDB.map((data, idx) => {
            return (
              <tr key={idx}>
                <td>{data._id}</td>
                <td>{data.customer_fullname}</td>
                <td>{data.whatsapp_number}</td>
                <td>{data.gender}</td>
                <td>{getItemCount(data.whatsapp_number)}</td>
                <td><Button variant="wa">View Items</Button></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      </div>
    </div>
  );
};

export default CustomerDB;
