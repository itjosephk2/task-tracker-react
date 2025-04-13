import React, { useContext } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import './Navbar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Navbar
      bg={darkMode ? '' : 'light'}
      variant={darkMode ? 'dark' : 'light'}
      expand="lg"
      className={`mb-4 py-3 ${darkMode ? 'navbar-dark-mode' : ''}`}
    >
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
                variant={darkMode ? 'outline-light' : 'outline-primary'}
                className="me-2"
                onClick={() => navigate('/home')}
              >
                Tasks
              </Button>
            )}
            {token ? (
              <Button
                variant={darkMode ? 'outline-light' : 'outline-secondary'}
                className="me-2"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Button
                variant={darkMode ? 'outline-light' : 'outline-primary'}
                className="me-2"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            )}
            {/* Dark mode toggle button */}
            <Button
              variant={darkMode ? 'light' : 'dark'}
              size="sm"
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-circle d-flex justify-content-center align-items-center"
              style={{ width: '36px', height: '36px', fontSize: '1rem' }}
            >
              {darkMode ? '☀️' : '🌙'}
            </Button>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
