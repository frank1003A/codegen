import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";

const CustomerDB = () => {
    const [custDB, setcustDB] = useState([]);

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

  useEffect(() => {
    fetchCustomers()
   }, [])

    return (
        <div>
            {custDB.map((data, index) => {
                return (
                    <>
                    <div className='cont'>
                    <p>{data._id}</p>
                    <p>{data.customer_fullname}</p>
                    <p>{data.whatsapp_number}</p>
                    </div>
                    </>
                )
            })}
        </div>
    )
}

export default CustomerDB
