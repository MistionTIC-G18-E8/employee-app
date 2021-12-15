import React from 'react'
import { Form, Button, Container, Col, Row } from "react-bootstrap";

const Permisos = () => {
    return (
        <Container>
                <div style={{height:'60px'}}></div>

            <Row className="m-4 justify-content-center display-6">
                Permisos
            </Row>
            <Row className="m-4 justify-content-center">
                <Col xs="auto" lg="4">
                    <Form>
                        <Row className="mb-3"> 
                            <Col>
                                <Form.Label>Fecha de inicio</Form.Label>
                                <Form.Control type="text" size ="lg" id="fechaInicio" name="fechaInicio" required readOnly defaultValue="14/06/2001"/>
                            </Col>
                            <Col>
                                <Form.Label>Fecha fin</Form.Label>
                                <Form.Control type="text" size ="lg" id="fechaFin" name="fechaFin" required readOnly defaultValue="14/06/2001"/>
                            </Col>
                        </Row>
                        <Row className="mb-3"> 
                            <Col>
                                <Form.Label>Motivo del permiso</Form.Label>
                                <Form.Control as="textarea" rows={3} required readOnly plaintext defaultValue="No quiere ir"/>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col sm={3}>
                                <Button variant="success" type="submit" href="/aceptarVacaciones/1">Aceptar</Button>
                            </Col>
                            <Col>
                                <Button variant="danger" type="submit" href="/rechazarVacaciones/1">Rechazar</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Permisos
