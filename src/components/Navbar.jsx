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

  const goHome = () => {
    navigate('/home');
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container className="d-flex justify-content-between align-items-center">
        <div
          onClick={token ? goHome : () => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          <h1 className="m-0">Task Tracker</h1>
        </div>

        <Nav>
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
      </Container>
    </Navbar>
  );
};

export default NavBar;
