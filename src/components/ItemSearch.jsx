import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Row, Table } from "react-bootstrap";
import { Form } from "react-bootstrap";
import CardNoButton from "./CardNoButton";

const ItemSearch = () => {
  const [itemTable, setitemTable] = useState([]);

  //initate api
  const api = axios.create({
    baseURL: "http://localhost:3000/codegen",
  });

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

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="table" > 
    <div className="ribbons">
    <CardNoButton cardTitle={'Number of items' + ' : ' + itemTable.length}/>
    </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Customer No</th>
            <th>Date Logged</th>
            <th>Agent</th>
            <th>Kilo</th>
            <th>paid</th>
            <th>Collected</th>
          </tr>
        </thead>
        <tbody>
            {itemTable.map((data, idx) => {
                return(
                
                    <tr key={idx}>
                <td>{data._id}</td>
                <td>{data.customerName}</td>
                <td>{data.customerNumber}</td>
                <td>{data.dateAdded}</td>
                <td>{data.agent}</td>
                <td>{data.kilo}</td>
                <td>{data.paid[0]['pay'].toString()}</td>
                <td>{data.collected[0]['collect'].toString()}</td>
                    </tr>
                )
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default ItemSearch;
