import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Row, Table } from "react-bootstrap";
import { Form } from "react-bootstrap";

const UpdateCustomer = () => {
    const [customerFullname, setcustomerFullname] = useState("");
    const [whatsappNo, setwhatsappNo] = useState("");
    const [file, setfile] = useState([]);
    const [names, setnames] = useState('');
    const [custDB, setcustDB] = useState([]);
    const [userId, setuserId] = useState(null)

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

  const selectCust = (id) => {
    const itm = []
    let item = custDB.map(idx => {
      if (idx._id === id) return itm.push(idx)
      return itm
    })
    setcustomerFullname(itm[0].customer_fullname)
    setwhatsappNo(itm[0].whatsapp_number)
    setnames(itm[0].names[0]['name'])
  }

  //update customer
  const updateCustomer = async () => {
      
    try {
    const Customer = {
      'customer_fullname': customerFullname,
      'whatsapp_number': whatsappNo,
      'images': [{'image': file[0]}],
      'names':[{ 'name':names}],
    }

        await api.patch(`/customer-update/${userId}`, Customer, {
          headers:{
            'Content-Type': 'application/json'
          }
        }).then((res) => {
            fetchCustomers()
            console.warn(res.data);
            alert(JSON.stringify(res.data))
          });
        } catch (err) {
          console.log(err);
        }
    }

    const deleteCust = async (id) => {
        try{
        await api.delete(`/customer-delete/${id}`).then((res) => {
          fetchCustomers()
              console.warn(res.data);
              alert(JSON.stringify(res.data))
            });
          } catch (err) {
            console.log(err);
          }
    }
  
  useEffect(() => {
    fetchCustomers()
   }, [])

    const disableClick = () => {
        if (!(customerFullname && whatsappNo)) {
          return (
            <Button variant="primary" type="submit" disabled>
              update
            </Button>
          );
        } else {
          return (
            <Button onClick={() => updateCustomer()} variant="primary" type="button">
              update
            </Button>
          );
        }
      };

    return (
        <div className="flex-container">
      <Form style={{width: '500px'}}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Customer Fullname</Form.Label>
          <Form.Control
            type="text"
            value={customerFullname}
            onChange={(e) => setcustomerFullname(e.target.value)}
            placeholder="Customer Fullname"
          />
          <Form.Text className="text-muted">
            Name of customer in manifest.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>WhatsApp Number</Form.Label>
          <Form.Control
            type="text"
            value={whatsappNo}
            onChange={(e) => {
              setwhatsappNo(e.target.value.replace(/\s+/g, ''))
            }}
            placeholder="WhatsApp Number"
          />
          <Form.Text className="text-muted">Active whatsapp number.</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Photo</Form.Label>
          <Form.Control
            type="file"
            value={file}
            placeholder="Select Photo"
            onChange={(e) => {
              setfile(e.target.files[0]);
            }}
          />
          <Form.Text className="text-muted">Png, Jpg or Jpeg.</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Names</Form.Label>
          <Form.Control
            type="text"
            value={names}
            placeholder="Extra Names of Customer"
            onChange={(e) => {
              setnames(e.target.value);
            }}
          />
        </Form.Group>
        {disableClick()}
      </Form>
      <Table striped bordered hover size="sm" style={{width: '60%'}} >
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Customer No</th>
          </tr>
        </thead>
        <tbody>
            {custDB.map((data, idx) => {
                return(
                
                    <tr key={idx}>
                <td>{data.customer_fullname}</td>
                <td>{data.whatsapp_number}</td>
                <td><Button style={{background: 'orange'}} onClick={() => {selectCust(data._id); setuserId(data._id)}}>Edit</Button></td>
                <td><Button variant="danger" onClick={() => deleteCust(data._id)} >Delete</Button></td>
                    </tr>
                )
            })}
        </tbody>
      </Table>
    </div>
    )
}

export default UpdateCustomer
