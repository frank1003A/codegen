import React from "react";
import AddCustomerForm from "../components/AddCustomerForm";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

const Customer = () => {
  let navigate = useNavigate();
  return (
    <div>
      <div className="page-container">
        <Card
          cardTitle="Add New Customer"
          subTitle="create new customer detail"
          cardText="customer Photo is not required "
          navFunc={() => {
            navigate('/customer/create');
          }}
        />

        <Card
          cardTitle="Update/Delete Customer"
          subTitle="delete or add to customer detail"
          cardText="strictly user dependent"
          navFunc={() => {navigate("/customer/customer-update")}}
        />

        <Card
          cardTitle="Add/Delete Item"
          subTitle="delete or add to customer item"
          cardText="strictly user dependent"
          navFunc={() => {navigate('/customer/customer-item-add')}}
        />
        <Card
          cardTitle="Search Customer"
          subTitle="view customer database"
          cardText="strictly user dependent"
          navFunc={() => {
            navigate('/customer/all')
          }}
        />
      </div>
    </div>
  );
};

export default Customer;
