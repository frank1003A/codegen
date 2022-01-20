import React from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const Cardd = ({cardTitle, subTitle, cardText, navFunc}) => {
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{cardTitle}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {subTitle}
          </Card.Subtitle>
          <Card.Text>
            {cardText}
          </Card.Text>
          <Button onClick={navFunc}>+</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Cardd;
