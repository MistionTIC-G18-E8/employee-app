import React from 'react'
import { Form, Button, Container, Col, Row } from "react-bootstrap";

const DescargarReporteDePago = () => {
    return (
        <Container>
            <Row className="m-4 justify-content-center display-6">
                Descargar reporte de pago
            </Row>
            <br></br>
            <Row className="justify-content-center">
                <Col xs="auto" lg="4">
                    <Form>
                        <Form.Group className="mb-3" controlId="report.mes">
                            <Form.Label >Seleccione el mes</Form.Label>
                            <Form.Select aria-label="Elija" id="mesReporte">
                                    <option id="1" value="Enero">Enero</option>
                                    <option id="2" value="Febrero">Febrero</option>
                                    <option id="3" value="Marzo">Marzo</option>
                                    <option id="4" value="Abril">Abril</option>
                                    <option id="5" value="Mayo">Mayo</option>
                                    <option id="6" value="Junio">Junio</option>
                                    <option id="7" value="Julio">Julio</option>
                                    <option id="8" value="Agosto">Agosto</option>
                                    <option id="9" value="Septiembre">Septiembre</option>
                                    <option id="10" value="Octubre">Octubre</option>
                                    <option id="11" value="Noviembre">Noviembre</option>
                                    <option id="12" value="Diciembre">Diciembre</option>
                            </Form.Select>
                        </Form.Group>
                        <br></br>
                        <br></br>
                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit" size="lg">Descargar Reporte</Button>
                        </div>
                        
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default DescargarReporteDePago
