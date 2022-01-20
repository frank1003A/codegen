import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { Form } from "react-bootstrap";

const CustomerItem = () => {
    const [custDB, setcustDB] = useState([]);
    const [itemDB, setitemDB] = useState([])
    const [CustId, setCustId] = useState('')
    const [ItemId, setItemId] = useState('')
    const [searchValue, setsearchValue] = useState('')
    const [showForm, setshowForm] = useState(false)


    //initate api
  const api = axios.create({
    baseURL: "http://localhost:3000/codegen",
  });

  //get all customers
  const fetchCustomers = async () => {
    try {
      await api.get("/customer").then((res) => {
        //console.log(res.data);
        setcustDB(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  //get all item
  const fetchItems = async () => {
    try {
        await api.get("/item").then((res) => {
         // console.log(res.data);
          setitemDB(res.data);
        });
      } catch (err) {
        console.log(err);
      }
  }

  //push item to customer
  const pushItemToCust = async () => {
    const data = {
      "customer": CustId,
      "items":[{"_id":ItemId}]
    }
    try {
      await api.post('/customer-item-add',data).then((res)=> {
        console.log(res.data);
        fetchCustomers()
        alert('item successfully added to user (' + ''+ CustId + ' '+ ')')
      })
    } catch (err) {
      console.log(err);
    }
  }

  //pull item from customer account
  const pullItemFromCust = async () => {
    const data = {
      "customer": CustId,
      "items":[{"_id":ItemId}]
    }
    try {
      await api.delete('/customer-item-delete', data).then((res) => {
        console.log(res.data);
        fetchCustomers()
      })
    } catch (err) {
      console.log(err);
    }
  }

  const Forrm = <>
      <Form>
       <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Customer Identification Number</Form.Label>
          <Form.Control
            type="text"
            value={CustId}
            onChange={(e) => setCustId(e.target.value)}
            placeholder="Customer ID"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Item ID</Form.Label>
          <Form.Control
            type="text"
            value={ItemId}
            onChange={(e) => {
              setItemId(e.target.value)
            }}
            placeholder="Item ID"
          />
        </Form.Group>

        <Button onClick={() => pushItemToCust()}>Add Item</Button>
        </Form>
  </>

const selectItem = (data, ittm) => {
  const itm = []
  let item = custDB.map(idx => {
    if (idx.whatsapp_number === data) return itm.push(idx)
  })
  setCustId(itm[0]._id)

  const itx = []
  let itmm = itemDB.map(idx => {
    if (idx._id === ittm) return itx.push(idx)
  })

  setItemId(itx[0]._id)
 
}

/*
  const showRibbon =  () => {
    const citem = custDB.map((data,index) => {
      console.log(data.items.length)
    })
    return citem
  }
  */

  const filterItems =  itemDB.map((item, index) =>{
  if (item._id.toString().includes(searchValue) || item.customerNumber.toString().includes(searchValue) || item.customerName.includes(searchValue) || item.customerName.toLocaleLowerCase().includes(searchValue)){
    return (
      <>
      <Table striped bordered hover size="sm" style={{width: '100%'}} >
        <thead>
          <tr>
            <th>Id</th>
            <th>Customer Name</th>
            <th>Customer No</th>
            <th>Agent</th>
            <th>Kilo</th>
            <th>paid</th>
            <th>paid By</th>
            <th>Collected</th>
          </tr>
        </thead>
        <tbody>
          <tr key={index}>
          <td>{item._id}</td>
          <td>{item.customerName}</td>
          <td  style={{color: 'green'}}>{item.customerNumber}</td>
          <td>{item.agent}</td>
          <td>{item.kilo}</td>
          <td>{item.paid[0]['pay'].toString()}</td>
          <td>{item.paid[0]['paidBy']}</td>
          <td>{item.collected[0]['collect'].toString()}</td>
          <td><Button variant="primary" onClick={() => {
            selectItem(item.customerNumber, item._id); 
            setshowForm(!showForm)}} 
            >Add Item</Button></td>    
          </tr>
        </tbody>
      </Table>
      </>
    )
  }
  })
  

  useEffect(() => {
      fetchCustomers()
      fetchItems()
  },[])

  /*
  const getCustItem = (id) => {
      const custItem = itemDB.map(idx => {
        if (idx._id === id) {
            return (
                <>
  <p key={idx}>{'Id : ' + idx._id+ ' ' +'Agent : ' + idx.agent + '  ' + 'Date Added : ' + idx.dateAdded}</p> 
                <Button>Add Item</Button>
                </>
            )
      }})
      return custItem
    }
    */

    return (
        <div className="center-container-down">
          <div className="fleft">
          <Form.Control
            type="search"
            onChange={(e) => setsearchValue(e.target.value)}
            placeholder="type a valid whatsApp Number or name to search customer item"
          style={{ width: '100%'}}/>
          <br />
            {filterItems}
          </div>
          <div className="formsect">
          {Forrm}
          </div>
        </div>
    )
}

export default CustomerItem
