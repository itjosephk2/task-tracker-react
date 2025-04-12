import React from 'react';
import { Container } from 'react-bootstrap';

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
