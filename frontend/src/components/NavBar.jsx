import { Navbar, Container, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function NavBar() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Facebook Payroll App</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto fw-bold">
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/editarperfil">
                <Nav.Link>Editar Perfil</Nav.Link>
              </LinkContainer>    
              <LinkContainer to="/descargarreportedepago">
                <Nav.Link>Descargar Reporte de Pago</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/solicitarpermisos">
                <Nav.Link>Solicitar Permisos</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/solicitarvacaciones">
                <Nav.Link>Solicitar Vacaciones</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/dashboardnomina">
                <Nav.Link>Dashboard Nomina</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/dashboardadmin">
                <Nav.Link>Dashboard Admin</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
