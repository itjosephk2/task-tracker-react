import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const goHome = () => {
    navigate('/home');
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container className="d-flex justify-content-between align-items-center">
        {/* Clickable title (not nested inside a link or button) */}
        <div onClick={goHome} style={{ cursor: 'pointer' }}>
          <h1 className="m-0">Task Tracker</h1>
        </div>

        <Nav>
          <Button variant="outline-secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
