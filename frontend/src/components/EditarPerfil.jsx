import React from 'react'
import { Form, Button, Container, Col, Row } from "react-bootstrap";
const EditarPerfil = () => {
    return (
        <Container>
            <Row className="m-4 justify-content-center display-6">
                Editar Perfil
            </Row>
            <Row className="justify-content-center">
                <Col xs="auto" lg="4">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label >Nombres</Form.Label>
                            <Form.Control type="text" placeholder="John" id="nombresPerfil" />
                            <Form.Label >Apellidos</Form.Label>
                            <Form.Control type="text" placeholder="Doe" id="apellidosPerfil" />
                            <Form.Label >Teléfono</Form.Label>
                            <Form.Control type="number" placeholder="+575551234567" id="telefonoPerfil" />
                            <Form.Label>Tipo de documento</Form.Label>
                            <Form.Select aria-label="Elija" id="tipoDocumentoPerfil">

                                <option id="ciudadania" value="cedulaDeCiudadania">Cédula de ciudadanía</option>
                                <option id="extranjeria" value="cedulaDeExtranjeria">Cédula de extranjería</option>
                            </Form.Select>
                            <Form.Label>Número de documento</Form.Label>
                            <Form.Control type="number" placeholder="12345678" />
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
    )
}

export default EditarPerfil
