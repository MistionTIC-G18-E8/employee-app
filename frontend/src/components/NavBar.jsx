import { Navbar, Container, Nav } from "react-bootstrap";
import React, { useState, useEffect } from "react";


import { LinkContainer } from "react-router-bootstrap";
import API from "../api";

export default function NavBar() {


  const [datos, setDatos] = useState();
  const token = sessionStorage.getItem("token");
  const parsedToken = JSON.parse(token);

  useEffect(() => {
    fetch(API + "user/" + parsedToken.user, {
      headers: {
        authorization: `Bearer ${parsedToken.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setDatos(data));
  }, [parsedToken.token, parsedToken.user]);

var permission = parseInt(datos?.permission)

  return (
    <>
      <Navbar collapseOnSelect expand="false" bg="primary" variant="dark" fixed="top">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand><strong>Facebook</strong> Payroll App</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">

            
              {/* <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer> */}
              <LinkContainer to="/editarperfil">
                <Nav.Link>Editar Perfil</Nav.Link>
              </LinkContainer>    
              <LinkContainer to="/descargarreportedepago">
                <Nav.Link>Descargar Reporte de Pago</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/solicitarpermisos">
                <Nav.Link>Solicitar Permisos</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/solicitarvacaciones" >
                <Nav.Link>Solicitar Vacaciones</Nav.Link>
              </LinkContainer>
              
              <LinkContainer to="/dashboardnomina" style={{display: permission < 5 ? 'none': 'block'}}>
                <Nav.Link>Dashboard Nomina</Nav.Link>
              </LinkContainer>



              <LinkContainer to="/dashboardadmin" style={{display: permission < 10 ? 'none': 'block'}}>
                <Nav.Link>Dashboard Admin</Nav.Link>
              </LinkContainer>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
