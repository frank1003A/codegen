import React from 'react';
import Card from '../components/Card'
import { useNavigate } from "react-router-dom";

const Waybill = () => {
    let navigate = useNavigate();

  return(
      <div className="page-container">
          <Card 
          cardTitle="Create items waybill" 
          subTitle="Create items waybill" 
          cardText="Signature is required to validate waybill"
          navFunc={() => navigate('/waybill/create-waybill')}/>

         <Card 
          cardTitle="update/delete item waybill" 
          subTitle="user defined" 
          cardText="Signature is required to edit validate waybill"
          navFunc={() => navigate('/waybill')}/>
      </div>
  )
};

export default Waybill;
