import React from 'react'
import { Form, Button, Container, Col, Row } from "react-bootstrap";

const SolicitarVacaciones = () => {
    return (
        <Container>
                <div style={{height:'60px'}}></div>

            <Row className="m-4 justify-content-center display-6">
                Solicitar Vacaciones
            </Row>
            <Row className="justify-content-center">
                <Col xs="auto" lg="4">
                    <Form>
                        <Form.Group className="mb-3" controlId="SV.fechaInicio">
                            <Form.Label >Seleccione fecha de inicio</Form.Label>
                            <Form.Control type="date" name="fechaInicio" required/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="SV.fechaFin">
                            <Form.Label >Seleccione fecha final</Form.Label>
                            <Form.Control type="date" name="fechaFin" required/>
                        </Form.Group>
                        
                        <div className="d-grid gap-2">
                        <Button variant="primary" type="submit" size="lg">Enviar Solicitud</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default SolicitarVacaciones
