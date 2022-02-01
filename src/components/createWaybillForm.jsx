import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { Accordion } from "react-bootstrap";

const CreateWaybillForm = () => {
  //items database
  const [itemDB, setitemDB] = useState([]);

  //sender states
  const [sName, setsName] = useState("");
  const [saddress, setsaddress] = useState("");
  const [sphone, setsphone] = useState("");
  const [semail, setsemail] = useState("");

  //reciever states
  const [rName, setrName] = useState("");
  const [raddress, setraddress] = useState("");
  const [rphone, setrphone] = useState("");
  const [remail, setremail] = useState("");

  //search
  const [searchValue, setsearchValue] = useState("");

  //item select state
  const [ItemsSelected, setItemsSelected] = useState([]);

  //signature state
  const [sign, setsign] = useState("");

  //modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //initate api
  const api = axios.create({
    baseURL: "http://localhost:3000/codegen",
  });

  //get all items
  const fetchItems = async () => {
    try {
      await api.get("/item").then((res) => {
        console.log(res.data);
        setitemDB(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  //date format
  const convert = (str) => {
    let date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
    //return [mnth, day, date.getFullYear()].join("/");
  };

  //search item
  const searchSetItem = () => {};

  //select item
  const selectItem = (item) => {
    const itemm = {
      quantity: 1,
      description: `${item.customerName}_${item.customerNumber}`,
      unitPrice: item.Total_Naira_Amount,
      amount: item.Total_Naira_Amount,
    };
    setItemsSelected((select) => [...select, itemm]);
    return itemm;
  };

  //calc waybill sum
  const getSum = () => {
    const Sum = ItemsSelected.reduce(
      (sum, item) => (sum = sum + item.amount),
      0
    );
    return Sum;
  };

  //post request to server
  const createWaybill = async () => {
    const waybill = {
      
    }
    try {
    } catch (err) {}
  };

  return (
    <>
      <div className="centralize">
        <div className="formfield">
          <Form style={{ width: "500px" }}>
            <Accordion defaultActiveKey="0" style={{ width: "100%" }}>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Reciever</Accordion.Header>
                <Accordion.Body>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      placeholder="mm/dd/yyyy"
                    />
                    <Form.Text className="text-muted">current date</Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Reciever Name</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="reciever's name"
                    value={rName}
                    onChange={(e) => setrName(e.target.value)}
                     />
                    <Form.Text className="text-muted">customer name</Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="phone number"
                    value={rphone}
                    onChange={(e) => setrphone(e.target.value)}
                     />
                    <Form.Text className="text-muted">
                      customer phone number
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="reciever's email address"
                      value={remail}
                      onChange={(e) => setremail(e.target.value)}
                    />
                    <Form.Text className="text-muted">customer email</Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="reciever's full address"
                      value={raddress}
                    onChange={(e) => setraddress(e.target.value)}
                    />
                    <Form.Text className="text-muted">full address (if any)</Form.Text>
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Accordion defaultActiveKey="1" style={{ width: "100%", marginBottom: "7.5rem" }}>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Sender</Accordion.Header>
                <Accordion.Body>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      placeholder="mm/dd/yyyy"
                    />
                    <Form.Text className="text-muted">current date</Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Sender Name</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="reciever's name" 
                    value={sName}
                      onChange={(e) => setsName(e.target.value)}
                    />
                    <Form.Text className="text-muted">name of sender</Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="phone number" 
                    value={sphone}
                    onChange={(e) => setrphone(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                      sender phone number
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="reciever's email address"
                      value={semail}
                      onChange={(e) => setsemail(e.target.value)}
                    />
                    <Form.Text className="text-muted">sender email (if any)</Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="reciever's full address"
                      value={saddress}
                      onChange={(e) => setsaddress(e.target.value)}
                    />
                    <Form.Text className="text-muted">full address (if any)</Form.Text>
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Form.Group style={{ width: "100%" }}>
              <div className="formtable">
                <Table
                  striped
                  bordered
                  hover
                  size="sm"
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th>Quantity</th>
                      <th>Description</th>
                      <th>Unit Price</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ItemsSelected.map((data, idx) => {
                      return (
                        <tr key={idx}>
                          <td>{data.quantity}</td>
                          <td>{data.description}</td>
                          <td>{data.unitPrice}</td>
                          <td>{data.amount}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </Form.Group>

            <div className="tot">
              <div className="itmcount">
                <p>Item Count: {ItemsSelected.length}</p>
              </div>
              <div className="itmtotal">
                <p style={{ color: "green" }}>Subtotal: {getSum()}</p>
              </div>
            </div>
            <div className="btnsect">
              <Button>Create waybill</Button>
              <Button onClick={() => handleShow()}>+ Add Item</Button>
            </div>
          </Form>
        </div>
        <div className="wb-table">
          <Table striped bordered hover size="sm" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date Issued</th>
                <th>Signature</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>(itemowner)(number)</td>
                <td>12000_(kilo)</td>
                <td>
                  <Button>View</Button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>(itemowner)(number)</td>
                <td>12000_(kilo)</td>
                <td>
                  <Button>View</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Select Item (User)</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
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
                {itemDB.map((data, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{data.customerName}</td>
                      <td>{data.customerNumber}</td>
                      <td>{convert(data.dateAdded)}</td>
                      <td>{data.agent}</td>
                      <td>{data.kilo}</td>
                      <td>{data.paid[0]["pay"].toString()}</td>
                      <td>{data.collected[0]["collect"].toString()}</td>
                      <td>
                        <Button onClick={() => selectItem(data)}>+</Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default CreateWaybillForm;
