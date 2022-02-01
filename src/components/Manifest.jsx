import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Form, Button, Table } from "react-bootstrap";
import filesvg from "../assets/svg/file.svg";
import * as XLSX from "xlsx";
import { FileExcelFill } from "react-bootstrap-icons";

const Manifest = () => {

  const [dateFrom, setdateFrom] = useState("");
  const [dateTo, setdateTo] = useState("");
  const [itemsDB, setitemsDB] = useState([]);
  const [matchedData, setmatchedData] = useState([]);
  const [printData, setprintData] = useState(false);

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
  }, []);

  //date format
  const convert = (str) => {
    let date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
    //return [mnth, day, date.getFullYear()].join("/");
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
    dates.forEach((date) => convert(date));

    return dates;
  };

  const dates = getDatesBetween(new Date(dateFrom), new Date(dateTo));

  const showTable = (printTable) => {
    if (printTable) {
      return (
        <>
          <div className="timg">
            <Table
              id="tablegen"
              striped
              bordered
              hover
              size="sm"
              style={{ width: "100%" }}
            >
              <thead>
                <tr>
                  <th>Customer Number</th>
                  <th>kilo</th>
                  <th>Total Paid</th>
                  <th>Date</th>
                  <th>Payee</th>
                  <th>Balance</th>
                  <th>Remark</th>
                </tr>
              </thead>
              <tbody>
                {printTable.map((data, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{data.customer.toString()}</td>
                      <td>{data.cilo}</td>
                      <td>{data.TotalPaid}</td>
                      <td>{convert(data.Date)}</td>
                      <td>{data.Payee}</td>
                      <td>{data.Balance}</td>
                      <td>{data.Remark}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </>
      );
    } else {
      //do nothing
    }
  };

  // function to convert excel date to normal js date
  function excelDateToJSDate(excelDate) {
    var date = new Date(Math.round((excelDate - (25567 + 1)) * 86400 * 1000));
    var converted_date = date.toISOString().split("T")[0];
    return converted_date;
  }

  //read xlsx file and return as html table
  const readExcelFile = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, {
          type: "buffer",
          cellDates: true,
          dateNF: "yyyy-mm-dd",
          raw: false,
        });

        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      const matches = itemsDB.forEach((data) => {
        for (let i = 0; i < d.length; i++) {
          let lat = d[i].Description.match(data.paid[0].paidBy);
          if (!lat || lat[1] === 0 || lat[0] === "") {
            //do nothing
          } else {
            let user = "";
            let Kilo = "";
            let dta = itemsDB.findIndex((idx) => {
              if (idx.paid[0].paidBy === lat[0]) {
                user = idx.customerNumber;
                Kilo = idx.kilo;
                idx.amountpaid = matchedData.TotalPaid;
              }
            });
            const pdata = {
              customer: user,
              cilo: Kilo,
              TotalPaid: d[i]["Amount"],
              Date: d[i]["Trans Date"],
              Payee: lat[0],
              Balance: "calc",
              Remark: `payment for (${user})`,
            };
            setmatchedData((matchedData) => [...matchedData, pdata]);
          }
        }
      });
    });
  };

  const sortDataByDate = (dtaa) => {
    const startDate = new Date(dateFrom)
    const endDate = new Date(dateTo)

    const returndata = dtaa.filter((a) => {
      const date = new Date(a.Date)
      return (date > startDate && date < endDate)
    })

    setmatchedData(returndata)
  }

  //create new xlsx file and save to pc
  const writeToExcelFile = (fileExtension, fileName) => {
    const table = document.getElementById("tablegen");
    const wb = XLSX.utils.table_to_book(table, { sheet: "marybeth_sheet1" });
    return XLSX.writeFile(
      wb,
      fileName + "." + fileExtension || "sheetname." + (fileExtension || "xlsx")
    );
  };

  const disableClick = () => {
    if (!(dateFrom && dateTo)) {
      return (
        <Button
          disabled
        >
         Create Manifest
        </Button>
      );
    } else {
      return (
        <Button
          onClick={() => {
            createManifest();
          }}
        >
          Create Manifest
        </Button>
      );
    }
  };

  const createManifest = () => {
    sortDataByDate(matchedData) //sort data by date 
    setprintData(!printData); 
  };

  return (
    <div className="center-container">
      <Form className="fff">
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

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Zenith Xlsx File</Form.Label>
          <Form.Control
            type="file"
            placeholder="upload bank xlsx"
            onChange={(e) => {
              const file = e.target.files[0];
              readExcelFile(file);
            }}
          />
          <Form.Text className="text-muted">xlsx file.</Form.Text>
        </Form.Group>
        {disableClick()}
      </Form>
      <div className="print-view">
        <div className="ttable">
          {printData === true ? (
            showTable(matchedData)
          ) : (
            <div className="timg">
              <img src={filesvg} alt="laderimg"/>
            </div>
          )}
        </div>
        <div className="prtbtn">
          <Button
            onClick={() =>
              writeToExcelFile(
                "xlsx",
                `manifest ${convert(new Date(Date.now()))}`
              )
            }
          >
            Print (Excel)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Manifest;
