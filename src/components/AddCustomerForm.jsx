import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormSelect } from "react-bootstrap";
import { useState, useEffect } from "react";
import ph from "../assets/svg/70.svg";
import axios from "axios";

const CustomerForm = () => {
  const [customerFullname, setcustomerFullname] = useState("");
  const [whatsappNo, setwhatsappNo] = useState("");
  const [gender, setgender] = useState("");
  const [file, setfile] = useState([]);
  const [names, setnames] = useState("");

  //initate api
  const api = axios.create({
    baseURL: "http://localhost:3000/codegen",
  });

  //add new customer to customer database
  const addCustomer = async () => {
    try {
      const formdata = new FormData();
      formdata.append("customer_fullname", customerFullname);
      formdata.append("whatsapp_number", whatsappNo.replace(/\s+/g, ""));
      formdata.append("image", file[0]);
      formdata.append("gender", gender);
      formdata.append("names[name]", names);

      await api
        .post("/customer-create", formdata, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);
          alert(res);
        });
    } catch (err) {
      console.log(err);
      alert("User already exist");
    }
  };

  const disableClick = () => {
    if (!(customerFullname && whatsappNo)) {
      return (
        <Button variant="primary" type="submit" disabled style={{width: '100%'}}>
          Add Customer
        </Button>
      );
    } else {
      return (
        <Button variant="primary" type="button" style={{width: '100%'}} onClick={() => addCustomer()}>
          Add Customer
        </Button>
      );
    }
  };

  return (
    <div className="form-container">
      <img src={ph} alt="icon" />
      <Form style={{ width: "500px" }}>
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
              setwhatsappNo(e.target.value.replace(/\s+/g, ""));
            }}
            placeholder="WhatsApp Number"
          />
          <Form.Text className="text-muted">Active whatsapp number.</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Gender</Form.Label>
          <Form.Select aria-label="Default select example" 
          value={gender} 
          onChange={(e) => setgender(e.target.value)}>
            <option value="Male">Male</option>
            <option value='Female'>Female</option>
          </Form.Select>
          <Form.Text className="text-muted">select gender</Form.Text>
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
          style={{width:'100%'}}
            type="text"
            value={names}
            placeholder="Extra Names of Customer"
            onChange={(e) => {
              setnames(e.target.value);
            }}
          />
           <Form.Text className="text-muted">add names if applicable</Form.Text>
        </Form.Group>
        <div className="btnsect">
        {disableClick()}
        </div>
      </Form>
    </div>
  );
};

export default CustomerForm;
