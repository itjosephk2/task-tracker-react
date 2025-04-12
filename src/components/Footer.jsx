import React from 'react';
import { Container } from 'react-bootstrap';

/**
 * Footer component displayed at the bottom of the page.
 * Shows the current year and a copyright notice.
 *
 * @returns {JSX.Element} The footer element.
 */
const Footer = () => {
  return (
    <footer className="bg-light text-center py-3 fixed-bottom border-top">
      <Container>
        <small className="text-muted">
          &copy; {new Date().getFullYear()} Task Tracker. All rights reserved.
        </small>
      </Container>
    </footer>
  );
};

export default Footer;
