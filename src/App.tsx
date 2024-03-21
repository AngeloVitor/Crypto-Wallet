import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <div className="App">
      <Navbar
        expand="lg"
        className="bg-body-tertiary "
        bg="dark"
        data-bs-theme="dark"
      >
        <Container className="justify-content-between">
          <Navbar.Brand href="/">Wallet Crypto</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav ">
            <Nav className="me-auto justify-content-end">
              <Nav.Link href="#">Ajuda</Nav.Link>
              <NavDropdown title="Mais Opcões" id="basic-nav-dropdown">
                <NavDropdown.Item href="#">
                 Informações
                </NavDropdown.Item>
                <NavDropdown.Item href="#">
                  configurações
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">
                  Suporte
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};
