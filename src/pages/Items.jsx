import React from 'react'
import Card from '../components/Card'
import { useNavigate } from "react-router-dom";

const Items = () => {
    let navigate = useNavigate();
    return (
        <div className='page-container'>
          <Card
          cardTitle="Search Item"
          subTitle="retrieve and filter item detail"
          cardText="item Photo is not required"
          navFunc={() => {
            navigate('/items/item');
          }}
        />
    

           <Card
          cardTitle="Add New Item"
          subTitle="create new item detail"
          cardText="item Photo is not required "
          navFunc={() => {
            navigate('/items/create-item');
          }}
        />

        <Card
          cardTitle="Update and delete Item"
          subTitle="add or delete item detail"
          cardText="item Photo is not required"
          navFunc={() => {
            navigate('/items/update-item');
          }}
        />

        </div>
    )
}

export default Items
