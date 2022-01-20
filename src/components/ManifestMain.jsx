import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import { Form, Button, Row, Table} from "react-bootstrap";
import filesvg from "../assets/svg/file.svg";
import * as XLSX from "xlsx";
import ManifestView from "./ManifestView";
import { useNavigate } from "react-router-dom";

const ManifestMain = () => {
    let navigate = useNavigate();

    const [dateFrom, setdateFrom] = useState('');
    const [dateTo, setdateTo] = useState('');
    const [itemsDB, setitemsDB] = useState([]);
    const [printData, setprintData] =  useState(false)
  
  
    //initate api
    const api = axios.create({
      baseURL: "http://localhost:3000/codegen",
    });
  
  
    //get all item
    const fetchItems = async () => {
      try {
        await api.get("/item").then((res) => {
          console.log(res.data);
          setitemsDB(res.data);
        });
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      fetchItems();
    },[])
  
    //date format
    const convert = (str) => {
      let date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      //return [date.getFullYear(), mnth, day].join("-");
      return [mnth, day, date.getFullYear()].join("/");
    };
  
    // Returns an array of dates between the two dates
    const getDatesBetween = (startDate, endDate) => {
      const dates = [];
  
      // Strip hours minutes seconds etc.
      let currentDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
      );
  
      while (currentDate <= endDate) {
        dates.push(currentDate);
  
        currentDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + 1 // Will increase month if over range
        );
      }
      dates.forEach(date => convert(date))
  
      return convert(dates);
    };
  
    const dates = getDatesBetween(new Date(dateFrom), new Date(dateTo));
  
    console.log(dates)
  
  
    const showTable = (printTable) => {
      if (printTable){
        return (<>
          <div className="print-view">
             <Table id="tablegen" striped bordered hover size="sm" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Phone Number</th>
                  <td>Name</td>
                  <th>Agent</th>
                  <th>Kilo</th>
                  <th>$(rate)</th>
                  <th>#(rate)</th>
                  <th>Dollar</th>
                  <th>Naira</th>
                  <th>Total</th>
                  <th>Total Paid</th>
                  <th>Date</th>
                  <th>Balance</th>
                  <th>Remark</th>
                </tr>
              </thead>
              <tbody>
                {printTable.map((data, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{data.customerNumber}</td>
                      <td>{data.customerName}</td>
                      <td>{data.agent}</td>
                      <td>{data.kilo}</td>
                      <td>{data.dollar_rate}</td>
                      <td>{data.naira_rate}</td>
                      <td>{data.dollar}</td>
                      <td>{data.naira}</td>
                      <td>{data.Total_Naira_Amount}</td>
                      <td>{data.paid[0].amountpaid}</td>
                      <td>{convert(data.paid[0].datePaid)}</td>
                      <td></td>
                      <td></td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
      
            <div className="prtbtn">
                <Button onClick={() => writeToExcelFile('xlsx', `manifest ${convert(new Date(Date.now()))}`)} >Print (Excel)</Button>
            </div>
        </div>
          </>)
      }else {
        //do nothing
      }
      
    }
  

    //create new xlsx file and save to pc
    const writeToExcelFile = (fileExtension, fileName) => {
      const table = document.getElementById("tablegen");
      const wb = XLSX.utils.table_to_book(table, { sheet: "marybeth_sheet1"} );
      return XLSX.writeFile(wb, fileName + "." + fileExtension || "sheetname." + (fileExtension || "xlsx"));
    };
  
    const createManifest = () => {
      setprintData(!printData);
    }
  
  
  
    return (
      <div className="center-container">  
        <Form>
          <Form.Group controlId="duedate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="duedate"
              placeholder="start date"
              value={dateFrom}
              onChange={(e) => setdateFrom(e.target.value)}
            />
            <Form.Text className="text-muted">start date</Form.Text>
          </Form.Group>
  
          <Form.Group controlId="duedate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="duedate"
              placeholder="end date"
              value={dateTo}
              onChange={(e) => setdateTo(e.target.value)}
            />
            <Form.Text className="text-muted">end date</Form.Text>
          </Form.Group>
          <Button onClick={() => {createManifest()}}>Create Manifest</Button>
        </Form>
        { printData === true ?   showTable(itemsDB) : <img src={filesvg} alt="" /> }
      </div>
    );
};

export default ManifestMain;
