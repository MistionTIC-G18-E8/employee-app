import React, { useState, useEffect } from "react";
import { Form, Button, Table, Container, Modal, ModalBody, ModalFooter, FormGroup } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import API from "../api";

const DashboardNomina = () => {
    const[datos, setDatos] = useState();
    const[datosUsuario, setDatosUsuario] = useState();

    const token = sessionStorage.getItem("token");
    const parsedToken = JSON.parse(token);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        fetch(API + "employee/", {
          headers: {
            authorization: `Bearer ${parsedToken.token}`,
            },
        })
          .then((response) => response.json())
          .then((data) => setDatos(data));
    }, [parsedToken.token]);

    const getUserData = (id) => {
        fetch(API + "employee/" + id, {
            headers: {
                authorization: `Bearer ${parsedToken.token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setDatosUsuario(data));
    }


    const handleInputChange = (event) => {
        setDatosUsuario({
          ...datosUsuario,
          [event.target.name]: event.target.value,
        });
    };

    const updateUsuario = async (e) => {
        e.preventDefault();
        console.log("datos", JSON.stringify(datosUsuario));
        const response = await fetch(API + "employee/" + datosUsuario.id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${parsedToken.token}`,
          },
          body: JSON.stringify(datosUsuario),
        });
        const data = await response.json();
        alert(JSON.stringify(data));
        //
        return window.location.reload();
    };

    const deleteUsuario = async (e) => {
        console.log("datos", JSON.stringify(datosUsuario));
        if(datosUsuario.id){
            const response = await fetch(API + "employee/" + datosUsuario.id, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${parsedToken.token}`,
                },
            });
            const data = await response.json();
            alert(JSON.stringify(data));
            return window.location.reload();
        }
    };

    return (
        <>
        <Container>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Telefono</th>
                        <th>Direccion</th>
                        <th>Departamento</th>
                        <th>Fecha Ingreso</th>
                    </tr>
                </thead>
                <tbody>
                    {datos?.map((elemento) =>(
                        <tr>
                            <td>{elemento.first_name}</td>
                            <td>{elemento.last_name}</td>
                            <td>{elemento.email}</td>
                            <td>{elemento.phone}</td>
                            <td>{elemento.address}</td>
                            <td>{elemento.department}</td>
                            <td>{elemento.joined_at}</td>
                            <td><Button variant="primary" onClick={() => {
                                handleShow(); 
                                getUserData(elemento.id);
                            }}>Editar</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>

        <Modal show={show} onHide={handleClose}>
            <ModalHeader closeButton>
                <div>
                    <h3>Editar Empleado</h3>
                </div>
            </ModalHeader>
            <Form>
                <ModalBody>
                    
                        <FormGroup>
                            <Form.Label>id</Form.Label>
                            <Form.Control name="id" type="text" readOnly value={datosUsuario?.id} onChange={handleInputChange}/>

                            <Form.Label>Nombre</Form.Label>
                            <Form.Control name="first_name" type="text" placeholder={datosUsuario?.first_name} onChange={handleInputChange}/>
                            
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control name="last_name" type="text" placeholder={datosUsuario?.last_name} onChange={handleInputChange}/>

                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" type="text" placeholder={datosUsuario?.email} onChange={handleInputChange}/>

                            <Form.Label>Telefono</Form.Label>
                            <Form.Control name="phone" type="text" placeholder={datosUsuario?.phone} onChange={handleInputChange}/>

                            <Form.Label>Direccion</Form.Label>
                            <Form.Control name="address" type="text" placeholder={datosUsuario?.address} onChange={handleInputChange}/>

                            <Form.Label>Departamento</Form.Label>
                            <Form.Control name="department" type="text" placeholder={datosUsuario?.department} onChange={handleInputChange}/>

                            <Form.Label>Fecha Ingreso</Form.Label>
                            <Form.Control name="joined_at" type="text" placeholder={datosUsuario?.joined_at} onChange={handleInputChange}/>

                        </FormGroup>
                    
                </ModalBody>

                <ModalFooter>
                    <Button variant="primary" onClick={updateUsuario}>Guardar Cambios</Button>
                    <Button variant="danger" onClick={deleteUsuario}>Eliminar</Button>
                </ModalFooter>
            </Form>
        </Modal>
        </>
    )
}

export default DashboardNomina
