import React, { useState } from "react";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import PropTypes from 'prop-types';

async function loginUser(credentials) {
  return fetch('https://mtic.muniter.xyz/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

export default function LoginForm ({setToken}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();


  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password
    });
    setToken(token);
  }  

  return (
    <Container>
      <Row className="m-4 justify-content-center display-6">
        Login to Payroll App
      </Row>
      <Row className="justify-content-center">
        <Col xs="auto" lg="4">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" 
                controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group 
                className="mb-3" 
                controlId="formBasicCheckbox">
              {/* <Form.Check 
                  type="checkbox" 
                  label="Check me out" /> */}
            </Form.Group>
            <Button 
                variant="primary" 
                type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};


LoginForm.propTypes = {
  setToken: PropTypes.func.isRequired
}
