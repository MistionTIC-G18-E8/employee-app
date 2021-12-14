import React from 'react'
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import {useState} from 'react';


const EditarPerfil = () => {

    const [datos, setDatos] = useState({
        nombresPerfil: '',
        apellidosPerfil: '',
        telefonoPerfil:'',
        // tipoDocumentoPerfil:'',
        numeroDocumento:''
    })

    const handleInputChange = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

    const enviarDatos = (event) => {
        event.preventDefault()
        console.log('enviando datos...' + datos.nombresPerfil + ' ' + datos.apellidosPerfil + ' ' + datos.telefonoPerfil + ' ' + datos.numeroDocumento)

    
    }


    return (
        <Container>
            <Row className="m-4 justify-content-center display-6">
                Editar Perfil
            </Row>
            <Row className="justify-content-center">
                <Col xs="auto" lg="4">
                    <Form onSubmit={enviarDatos}>
                        <Form.Group 
                            className="mb-3" 
                            controlId="formBasicEmail">
                            <Form.Label>
                                Nombres</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="John"  
                                onChange={handleInputChange} 
                                name="nombresPerfil" />
                            <Form.Label >Apellidos</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Doe"  
                                onChange={handleInputChange} 
                                name="apellidosPerfil" />
                            <Form.Label>
                            Teléfono</Form.Label>
                            <Form.Control 
                                type="number" 
                                placeholder="+575551234567"  
                                onChange={handleInputChange} 
                                name="telefonoPerfil"/>
                            {/* <Form.Label>Tipo de documento</Form.Label> */}
                            {/* <Form.Select aria-label="Elija"  onChange={handleInputChange} name="tipoDocumentoPerfil">

                                <option id="ciudadania" value="cedulaDeCiudadania">Cédula de ciudadanía</option>
                                <option id="extranjeria" value="cedulaDeExtranjeria">Cédula de extranjería</option>
                            </Form.Select> */}
                            <Form.Label>
                            Número de documento</Form.Label>
                            <Form.Control 
                                type="number" 
                                placeholder="12345678"  
                                onChange={handleInputChange} 
                                name="numeroDocumento"/>
                        </Form.Group>
                        <div className="text-center">
                            <Button 
                                variant="primary" 
                                type="submit">
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
