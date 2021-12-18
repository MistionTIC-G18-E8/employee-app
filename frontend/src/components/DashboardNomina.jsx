import React, { useState, useEffect } from "react";
import { Form, Button, Table, Container, Modal, ModalBody, ModalFooter, FormGroup } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import API from "../api";

const DashboardNomina = () => {
    const [datos, setDatos] = useState();
    const [datosUsuario, setDatosUsuario] = useState();
    const [nombreEmpleado, setNombreEmpleado] =useState();
    const[apellidoEmpleado, setApellidoEmpleado] = useState();
    const[emailEmpleado, setEmailEmpleado] = useState();
    const[telefonoEmpleado, setTelefonoEmpleado] = useState();
    const[direccionEmpleado, setDireccionEmpleado] = useState();
    const[departamentoEmpleado, setDepartamentoEmpleado] = useState();
    const[generoEmpleado, setGeneroEmpleado] = useState();


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
        if (datosUsuario.id) {
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

    const crearEmpleado = async (e) => {
        e.preventDefault();
        const datosEmpleado ={
            first_name: nombreEmpleado,
            last_name: apellidoEmpleado,
            email: emailEmpleado,
            phone: telefonoEmpleado,
            address: direccionEmpleado,
            department: departamentoEmpleado,
            gender: generoEmpleado
        }
        const response = await fetch(API + "employee/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${parsedToken.token}`,
            },
            body: JSON.stringify(datosEmpleado),
        });
        const data = await response.json();
        alert(JSON.stringify(data));
        
        return window.location.reload();

    }

    return (
        <>
            <Container>
                <div style={{ height: '60px' }}></div>
                <form onSubmit={crearEmpleado}>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Telefono</th>
                                <th>Direccion</th>
                                <th>Departamento</th>
                                <th>Genero</th>
                                <th>Fecha Ingreso</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                                <td>
                                <Form.Control name="first_name" type="text" value={nombreEmpleado} placeholder="John" onChange={(e)=>{setNombreEmpleado(e.target.value)}} required/>
                                </td>

                                <td>
                                <Form.Control name="last_name" type="text" value={apellidoEmpleado} placeholder="Doe" onChange={(e)=>{setApellidoEmpleado(e.target.value)}} required />

                                </td>

                                <td>
                                <Form.Control name="email" type="text" value={emailEmpleado} placeholder="example@email.com" onChange={(e)=>{setEmailEmpleado(e.target.value)}} required />

                                </td>

                                <td>
                                <Form.Control name="phone" type="text" value={telefonoEmpleado} placeholder="+575551234567" onChange={(e)=>{setTelefonoEmpleado(e.target.value)}} required/>
                                </td>

                                <td>
                                <Form.Control name="address" type="text" value={direccionEmpleado} placeholder="123 San Jose" onChange={(e)=>{setDireccionEmpleado(e.target.value)}} required/>
                                </td>

                                <td>
                                <Form.Control name="department" type="text" value={departamentoEmpleado} placeholder="Ventas" onChange={(e)=>{setDepartamentoEmpleado(e.target.value)}} required/>
                                </td>

                                <td>
                                <Form.Control name="gender" type="text" value={generoEmpleado} placeholder="male" onChange={(e)=>{setGeneroEmpleado(e.target.value)}} required/>
                                </td>

                                <td>
                                <Button variant="success" type="submit">Ingresar</Button>
                                <Form.Control name="joined_at" type="text"  style={{display:"none"}} />

                                </td>

                            </tr>
                            {datos?.map((elemento) => (
                                <tr onClick={() => {
                                        handleShow();
                                        getUserData(elemento.id);}}>
                                    <td>{elemento.first_name}</td>
                                    <td>{elemento.last_name}</td>
                                    <td>{elemento.email}</td>
                                    <td>{elemento.phone}</td>
                                    <td>{elemento.address}</td>
                                    <td>{elemento.department}</td>
                                    <td>{elemento.gender}</td>
                                    <td>{ new Date (elemento.joined_at).toLocaleDateString("en-GB")}</td>
                                    {/* <td><Button variant="primary" onClick={() => {
                                        handleShow();
                                        getUserData(elemento.id);
                                    }}>Editar</Button></td> */}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </form>
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
                            <Form.Control name="id" type="text" readOnly value={datosUsuario?.id} onChange={handleInputChange} />

                            <Form.Label>Nombre</Form.Label>
                            <Form.Control name="first_name" type="text" placeholder={datosUsuario?.first_name} onChange={handleInputChange} />

                            <Form.Label>Apellido</Form.Label>
                            <Form.Control name="last_name" type="text" placeholder={datosUsuario?.last_name} onChange={handleInputChange} />

                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" type="text" placeholder={datosUsuario?.email} onChange={handleInputChange} />

                            <Form.Label>Telefono</Form.Label>
                            <Form.Control name="phone" type="text" placeholder={datosUsuario?.phone} onChange={handleInputChange} />

                            <Form.Label>Direccion</Form.Label>
                            <Form.Control name="address" type="text" placeholder={datosUsuario?.address} onChange={handleInputChange} />

                            <Form.Label>Departamento</Form.Label>
                            <Form.Control name="department" type="text" placeholder={datosUsuario?.department} onChange={handleInputChange} />

                            <Form.Label>Fecha Ingreso</Form.Label>
                            <Form.Control name="joined_at" type="text" placeholder= {new Date (datosUsuario?.joined_at).toLocaleDateString("en-GB")} onChange={handleInputChange} />

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
