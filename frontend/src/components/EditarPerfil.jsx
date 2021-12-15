import React, { useState, useEffect } from "react";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import API from "../api";

const EditarPerfil = () => {
  const [datos, setDatos] = useState();

  const token = sessionStorage.getItem("token");
  const parsedToken = JSON.parse(token);

  useEffect(() => {
    fetch(API + "employee/" + parsedToken.employee, {
      headers: {
        authorization: `Bearer ${parsedToken.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setDatos(data));
  }, []);

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const enviarDatos = async (e) => {
    e.preventDefault();
    console.log("datos", JSON.stringify(datos));
    const response = await fetch(API + "employee/" + parsedToken.employee, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${parsedToken.token}`,
      },
      body: JSON.stringify(datos),
    });
    const data = await response.json();
    alert(JSON.stringify(data));
    //
    return window.location.reload();
  };

  return (
    <Container>
      <Row className="m-4 justify-content-center display-6">Editar Perfil</Row>
      <pre>Datos: {JSON.stringify(datos, null, 2)}</pre>
      <Row className="justify-content-center">
        <Col xs="auto" lg="4">
          <Form onSubmit={enviarDatos}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nombres</Form.Label>
              <Form.Control
                type="text"
                placeholder={datos?.first_name}
                onChange={handleInputChange}
                name="first_name"
              />
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                type="text"
                placeholder={datos?.last_name}
                onChange={handleInputChange}
                name="last_name"
              />
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder={datos?.email}
                onChange={handleInputChange}
                name="email"
              />
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="phone"
                placeholder={datos?.phone}
                onChange={handleInputChange}
                name="phone"
              />
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder={datos?.address}
                onChange={handleInputChange}
                name="address"
              />
            </Form.Group>
            <div className="text-center">
              <Button variant="primary" type="submit">
                Guardar
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditarPerfil;
