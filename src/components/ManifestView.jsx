import React from 'react';
import {Table, Button} from 'react-bootstrap'

const ManifestView = ({printTable}) => {
  return (
  <div className="center-container">
       <Table striped bordered hover size="sm" style={{ width: "60%" }}>
        <thead>
          <tr>
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
                <td>{data.TotalPaid}</td>
                <td>{data.Date.toString()}</td>
                <td>{data.Payee}</td>
                <td>{data.Balance }</td>
                <td>{data.Remark}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <div className="prtbtn">
          <Button>Print (Excel)</Button>
      </div>
  </div>
  )
};

export default ManifestView;
