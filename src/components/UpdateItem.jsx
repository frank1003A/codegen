import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Row, Table } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Modal } from 'react-bootstrap';
import Toast from '../components/Toast'

const UpdateItem = () => {
  const [customerName, setcustomerName] = useState("");
  const [customerNumber, setcustomerNumber] = useState("");
  const [Agent, setAgent] = useState("");
  const [Kilo, setKilo] = useState(0);
  const [datepaid, setdatepaid] = useState('');
  const [paidBy, setpaidBy] = useState("");
  const [paid, setpaid] = useState(false);
  const [amountPaid, setamountPaid] = useState(0);
  const [collected, setcollected] = useState(false);
  const [itemTable, setitemTable] = useState([]);
  const [userId, setuserId] = useState(null);
  const [searchValue, setsearchValue] = useState("");
  const [show, setShow] = useState(false);

 const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const checkPaidBox = () => {
    if (paid === false) {
      return (
        <>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Check Payment</Form.Label>
            <Form.Check
              type="checkbox"
              checked={false}
              label="Paid"
              onChange={() => {
                setpaid(true);
                setpaidBy("");
              }}
            />
          </Form.Group>
        </>
      );
    }
    if (paid === true) {
      return (
        <>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Check Payment</Form.Label>
            <Form.Check
              type="checkbox"
              checked={true}
              label="Paid"
              onChange={() => {
                setpaid(false);
                setpaidBy("");
              }}
            />
          </Form.Group>
        </>
      );
    }
  };

  const checkColBox = () => {
    if (collected === true) {
      return (
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Collected</Form.Label>
          <Form.Check
            type="checkbox"
            checked={true}
            label="Collected"
            onChange={() => setcollected(false)}
          />
        </Form.Group>
      );
    } else {
      return (
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Collected</Form.Label>
          <Form.Check
            type="checkbox"
            label="Collected"
            checked={false}
            onChange={() => setcollected(true)}
          />
        </Form.Group>
      );
    }
  };

  const showPayeeText = () => {
    if (paid === true) {
      return (
        <>
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
            <Form.Text className="text-muted">name of payer</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Amount Paid</Form.Label>
            <Form.Control
              type="text"
              value={amountPaid}
              placeholder="amount of payment"
              onChange={(e) => {
                setamountPaid(e.target.value);
              }}
            />
            <Form.Text className="text-muted">amount of payment</Form.Text>
          </Form.Group>

          <Form.Group controlId="duedate">
          <Form.Label>Date Paid</Form.Label>
          <Form.Control
            type="date"
            name="duedate"
            placeholder="start date"
            value={datepaid}
            onChange={(e) => setdatepaid(e.target.value)}
          />
          <Form.Text className="text-muted">date of payment</Form.Text>
        </Form.Group>
        </>
      );
    }
  };

  const matchpayandpayee = () => {
    if ( paid === true && paidBy === "") {
      return (
        <Button disabled>
          Update
        </Button>
      );
    }
    if (!(customerName && customerNumber && Agent && Kilo)){
     return ( 
        <Button disabled >
          Update
        </Button>
        )
    }
    if (paid === true && amountPaid === 0){
      return ( 
        <Button disabled>
          Update
        </Button>
        )
    }
    if (paid === true && datepaid === 'NaN-aN-aN') {{
      return ( 
        <Button disabled >
          Update
        </Button>
        )
    }}
     else {
      return (
        <Button onClick={() => {updateItem()}} >
          Update
        </Button>
      );
    }
  };

  const selectItem = (id) => {
    const itm = [];
    let item = itemTable.map((idx) => {
      if (idx._id === id) return itm.push(idx);
    });
    setcustomerName(itm[0].customerName);
    setcustomerNumber(itm[0].customerNumber);
    setAgent(itm[0].agent);
    setKilo(itm[0].kilo);
    setpaidBy(itm[0].paid[0]["paidBy"]);
    setpaid(itm[0].paid[0]["pay"]);
    setamountPaid(itm[0].paid[0]["amountpaid"]);
    setdatepaid(convert(itm[0].paid[0]["datePaid"]));
    setcollected(itm[0].collected[0]["collect"]);
  };

  //update item
  const updateItem = async () => {
    try {
      const item = {
        customerName: customerName,
        customerNumber: customerNumber,
        agent: Agent,
        kilo: Kilo,
        paid: [{ pay: paid, paidBy: paidBy, datePaid: datepaid, amountpaid: amountPaid }],
        collected: [{ collect: collected }],
      };

      await api
        .patch(`/update-item/${userId}`, item, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.warn(res.data);
          fetchItems();
          alert(JSON.stringify(res.data));
        });
    } catch (err) {
      console.log(err);
    }
  };

  //date format
  const convert = (str) => {
    let date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
    //return [mnth, day, date.getFullYear()].join("/");
  };

  //delete item
  const deleteItem = async (id) => {
    try {
      await api.delete(`/delete-item/${id}`).then((res) => {
        console.log(res.data);
        alert(res.data);
      });
    } catch (err) {
      console.log(err);
    }
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="u-container">
      <div className="searchit" style={{ width: "100%" }}>
        <Form.Control
          type="search"
          onChange={(e) => setsearchValue(e.target.value)}
          placeholder="type a valid whatsApp Number or name to search customer "
          style={{ width: "100%" }}
        />
        </div>
        <div className="twrap">
        <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>PHONE</th>
            <th>Agent</th>
            <th>Kilo</th>
            <th>paid</th>
            <th>paid By</th>
            <th>Date paid</th>
            <th>Amount paid</th>
            <th>Collected</th>
          </tr>
        </thead>
        <tbody>
          {itemTable.map((data, idx) => {
            return (
              <tr key={idx}>
                <td>{data.customerName}</td>
                <td>{data.customerNumber}</td>
                <td>{data.agent}</td>
                <td>{data.kilo}</td>
                <td>{data.paid[0]["pay"].toString()}</td>
                <td>{data.paid[0]["paidBy"]}</td>
                <td>{convert(data.paid[0]["datePaid"])}</td>
                <td>{data.paid[0]["amountpaid"]}</td>
                <td>{data.collected[0]["collect"].toString()}</td>
                <td>
                  <Button
                    style={{ background: "orange" }}
                    onClick={() => {
                      selectItem(data._id);
                      setuserId(data._id);
                      handleShow()
                    }}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => deleteItem(data._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

        </div>

      <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Item Update (User)</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Form className="form-wrap">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Customer Name</Form.Label>
          <Form.Control
            type="text"
            value={customerName}
            onChange={(e) => {
              setcustomerName(e.target.value);
            }}
            placeholder="customer name"
          />
          <Form.Text className="text-muted">Customer Name</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>WhatsApp Number</Form.Label>
          <Form.Control
            type="text"
            value={customerNumber}
            onChange={(e) =>
              setcustomerNumber(e.target.value.replace(/\s+/g, ""))
            }
            placeholder="customer Number"
            style={{ width: "100%" }}
          />
          <Form.Text className="text-muted">valid whatsApp Number</Form.Text>
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

        <div className="flexer" style={{ display: "flex", gap: "1rem" }}>
          {checkPaidBox()}
          {checkColBox()}
        </div>
      </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                {matchpayandpayee()}
              </Modal.Footer>
            </Modal>
    </div>
  );
};

export default UpdateItem;


/**
 
<Form className="form-wrap">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Customer Name</Form.Label>
          <Form.Control
            type="text"
            value={customerName}
            onChange={(e) => {
              setcustomerName(e.target.value);
            }}
            placeholder="customer name"
          />
          <Form.Text className="text-muted">Customer Name</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>WhatsApp Number</Form.Label>
          <Form.Control
            type="text"
            value={customerNumber}
            onChange={(e) =>
              setcustomerNumber(e.target.value.replace(/\s+/g, ""))
            }
            placeholder="customer Number"
            style={{ width: "100%" }}
          />
          <Form.Text className="text-muted">valid whatsApp Number</Form.Text>
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

        <div className="flexer" style={{ display: "flex", gap: "1rem" }}>
          {checkPaidBox()}
          {checkColBox()}
        </div>
        <div className="btnsect">{matchpayandpayee()}</div>
      </Form>

       const [showToast, setshowToast] = useState(false);
  const toggleshowToast = () => setshowToast(!showToast);


       {toggleshowToast === true ? <Toast toastHeader={<p>Success</p>} toastBody={'Item successfully updated' } /> : null}
 */
