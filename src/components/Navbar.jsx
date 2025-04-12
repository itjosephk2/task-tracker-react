import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer', fontWeight: 'bold' }}
        >
          Task Tracker
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            {token && (
              <Button
                variant="outline-primary"
                className="me-2"
                onClick={() => navigate('/home')}
              >
                Tasks
              </Button>
            )}
            {token ? (
              <Button variant="outline-secondary" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button variant="outline-primary" onClick={() => navigate('/login')}>
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
