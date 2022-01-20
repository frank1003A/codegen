import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import axios from "axios";

const AddItemForm = () => {
  const [customerNumber, setcustomerNumber] = useState("");
  const [Agent, setAgent] = useState("");
  const [Kilo, setKilo] = useState(0);
  const [paidBy, setpaidBy] = useState("");
  const [paid, setpaid] = useState(false);
  const [collected, setcollected] = useState(false)

  //initate api
  const api = axios.create({
    baseURL: "http://localhost:3000/codegen",
  });

  const addItem = async () => {
    try {
      const formdata = new FormData();
      formdata.append('customerNumber', customerNumber);
      formdata.append('agent', Agent);
      formdata.append('kilo', Kilo);
      formdata.append('paid[pay]', paid);
      formdata.append('paid[paidBy]', paidBy)
      formdata.append('collected[collect]', collected)

      await api.post("/create-item", formdata, {
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
    }
  };

  const showPayeeText = () => {
    if (paid === true){
      return (
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Payee Name</Form.Label>
        <Form.Control
          type="text"
          value={paidBy}
          placeholder="name of person that paid for this item"
          onChange={(e) => {
            setpaidBy(e.target.value);
          }}
        />
        <Form.Text className="text-muted">name of payee</Form.Text>
      </Form.Group>
      )
    }
  }

  const onSubmit = () => {
    setpaid(false)
    setpaidBy('')
  }

  const disableClick = () => {
    if (!(customerNumber && Agent && Kilo)) {
      return (
        <Button className="bttn" id="ubt" variant="primary" type="button" disabled>
          Add Item
        </Button>
      );
    } else {
      return (
        <Button className="bttn" id="ubt" variant="primary" type="button" onClick={() => addItem()} >
          Add Item
        </Button>
      );
    }
  };

  return (
    <div className="center-container">
      <Form className="form-item">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>WhatsApp Number</Form.Label>
          <Form.Control
            type="text"
            value={customerNumber}
            onChange={(e) =>
              setcustomerNumber(e.target.value.replace(/\s+/g, ""))
            }
            placeholder="customer Number"
          />
          <Form.Text className="text-muted">WhatsApp Number</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Agent</Form.Label>
          <Form.Control
            type="text"
            value={Agent}
            onChange={(e) => {
              setAgent(e.target.value);
            }}
            placeholder="agent name"
          />
          <Form.Text className="text-muted">Agent Name</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Kilo</Form.Label>
          <Form.Control
            type="text"
            value={Kilo}
            placeholder="item kilo"
            onChange={(e) => {
              setKilo(e.target.value);
            }}
          />
          <Form.Text className="text-muted">Kilo.</Form.Text>
        </Form.Group>

        {showPayeeText()}
        <div className="flexer" style={{display:'flex', gap: '1rem'}}>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Check Payment</Form.Label>
            <Form.Check
              type="checkbox"
              defaultChecked={paid}
              label="Paid"
              onChange={() => setpaid(!paid)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Collected</Form.Label>
            <Form.Check
              type="checkbox"
              defaultChecked={collected}
              label="Collected"
              onChange={() => setcollected(!collected)}
            />
          </Form.Group>
        </div>
        {disableClick()}
      </Form>
    </div>
  );
};

export default AddItemForm;
