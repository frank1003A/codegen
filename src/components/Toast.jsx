import React from 'react';
import {Toast} from 'react-bootstrap'
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

const Toasts = ({toastHeader, toastBody, showToast, toggleshowToast}) => {
    return (
        <Col md={6} className="mb-2">
          <Toast show={showToast} onClose={toggleshowToast}>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">{toastHeader}</strong>
              <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>{toastBody}</Toast.Body>
          </Toast>
        </Col>
    );
};

export default Toasts;


/**
 
<Col md={6} className="mb-2">
          <Button onClick={toggleShowB} className="mb-2">
            Toggle Toast <strong>without</strong> Animation
          </Button>
          <Toast onClose={toggleShowB} show={showB} animation={false}>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Bootstrap</strong>
              <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
          </Toast>
        </Col>
 */