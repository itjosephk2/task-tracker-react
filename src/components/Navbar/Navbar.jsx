import React, { useContext } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import './Navbar.css';

/**
 * Navigation bar component displayed at the top of the app.
 *
 * - Dynamically styled based on dark/light theme.
 * - Shows login, logout, and task navigation based on auth state.
 * - Includes a dark mode toggle button.
 *
 * @returns {JSX.Element} The navigation bar.
 */
const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  /**
   * Logs out the user by removing the auth token from localStorage
   * and redirects to the landing page.
   */
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Navbar
      bg={darkMode ? '' : 'light'}
      variant={darkMode ? 'dark' : 'light'}
      expand="lg"
      className={`mb-4 py-3 ${darkMode ? 'navbar-dark-mode' : 'navbar-light-custom'}`}
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
          <Nav className="align-items-center gap-2 flex-wrap">
            {token && (
              <Button
                variant={darkMode ? 'outline-light' : 'outline-primary'}
                className="mb-2 mb-lg-0"
                onClick={() => navigate('/home')}
              >
                Tasks
              </Button>
            )}
            {token ? (
              <Button
                variant={darkMode ? 'outline-light' : 'outline-secondary'}
                className="mb-2 mb-lg-0"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Button
                variant={darkMode ? 'outline-light' : 'outline-primary'}
                className="mb-2 mb-lg-0"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            )}
            <Button
              variant={darkMode ? 'light' : 'dark'}
              size="sm"
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-circle d-flex justify-content-center align-items-center mb-2 mb-lg-0"
              style={{ width: '36px', height: '36px', fontSize: '1rem' }}
              aria-label="Toggle dark mode"
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
