import React, { useContext } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext'; // ✅ import ThemeContext

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { darkMode, setDarkMode } = useContext(ThemeContext); // ✅ use the theme context

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Navbar
      bg={darkMode ? 'dark' : 'light'}          // ✅ dynamic background
      variant={darkMode ? 'dark' : 'light'}     // ✅ match text color
      expand="lg"
      className="mb-4"
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
            {/* ✅ Dark mode toggle button */}
            <Button
              variant={darkMode ? 'light' : 'dark'}
              size="sm"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
