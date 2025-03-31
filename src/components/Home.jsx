import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    navigate('/login'); // Redirect to login
  };

  return (
    <Container className="mt-5 text-center">
      <h1>Welcome to the Home Page!</h1>
      <p>You are logged in.</p>
      <Button variant="danger" onClick={handleLogout}>
        Sign Out
      </Button>
    </Container>
  );
};

export default Home;
