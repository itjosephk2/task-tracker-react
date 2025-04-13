import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { ThemeContext } from '../../context/ThemeContext';
import './Footer.css'; 

/**
 * Footer component displayed at the bottom of the page.
 * Shows the current year and a copyright notice.
 *
 * @returns {JSX.Element} The footer element.
 */
const Footer = () => {
  const { darkMode } = useContext(ThemeContext);  

  return (
    <footer
      className={`text-center py-3 fixed-bottom ${
        darkMode ? 'footer-dark' : 'footer-light'
      }`}
    >
      <Container>
        <small>
          &copy; {new Date().getFullYear()} Task Tracker. All rights reserved.
        </small>
      </Container>
    </footer>
  );
};

export default Footer;
