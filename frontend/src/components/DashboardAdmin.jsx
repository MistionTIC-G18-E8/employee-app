import React from 'react'
import { Form, Button, Table, Container } from "react-bootstrap";

const DashboardAdmin = () => {
    return (
        <Container>
            <div style={{ height: '60px' }}></div>

            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>C.C</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Usuario</th>
                        <th>Fecha Ingreso</th>
                        <th>Salario</th>
                        <th>Vacaciones</th>
                        <th>Permisos</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th><Form.Control type="number" placeholder="123" id="cedulaUsuario" required /></th>
                        <th><Form.Control type="text" placeholder="John" id="nombreUsuario" required /></th>
                        <th><Form.Control type="text" placeholder="Cena" id="apellidoUsuario" required /></th>
                        <th><Form.Control type="text" placeholder="GOAT" id="usuario" required /></th>
                        <th><Form.Control type="date" id="fechaUsuario" required /></th>
                        <th><Form.Control type="number" placeholder="235" id="salarioUsuario" required /></th>
                        <th><Button variant="primary" type="submit" href="/crearUsuario">Crear Usuario</Button></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <th>1</th>
                        <th>Raul</th>
                        <th>Lopez</th>
                        <th>rlopez</th>
                        <th>14/06/20</th>
                        <th>100000000</th>
                        <th><Button variant="primary" type="submit" href="/vacaciones/1">Ver Vacaciones</Button></th>
                        <th><Button variant="primary" type="submit" href="/permisos/1">Ver Permisos</Button></th>
                        <th><Button variant="warning" type="submit" href="/editarUsuario/1">Editar</Button></th>
                        <th><Button variant="danger" type="submit" href="/eliminarUsuario/1">Eliminar</Button></th>
                    </tr>
                    <tr>
                        <th>2</th>
                        <th>Javier</th>
                        <th>Lopez</th>
                        <th>jlopez</th>
                        <th>20/06/20</th>
                        <th>200000000</th>
                        <th><Button variant="primary" type="submit" href="/vacaciones/2">Ver Vacaciones</Button></th>
                        <th><Button variant="primary" type="submit" href="/permisos/2">Ver Permisos</Button></th>
                        <th><Button variant="warning" type="submit" href="/editarUsuario/2">Editar</Button></th>
                        <th><Button variant="danger" type="submit" href="/eliminarUsuario/2">Eliminar</Button></th>
                    </tr>
                </tbody>
            </Table>
        </Container>
    )
}

export default DashboardAdmin
