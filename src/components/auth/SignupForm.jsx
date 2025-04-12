import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { signup } from './authService';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const SignupForm = () => {
  const [formData, setFormData] = useState({ username: '', password: '', password_2: '', });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (formData.password !== formData.password_2) {
      setError('Passwords do not match.');
      toast.error('Passwords do not match.');
      return;
    }
    

    try {
      await signup(formData);
      setSuccess(true);
      toast.success('🎉 Signup successful!');


      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError('Signup failed. Please try a different username.');
      toast.error('Signup failed.');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="mb-4">Sign Up</h2>git 
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="signupUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Choose a username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="signupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Create a password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="signupPassword2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Create a password"
                name="password_2"
                value={formData.password_2}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100 mb-3">
              Sign Up
            </Button>

            <div className="text-center">
              <small>
                Already have an account? <Link to="/login">Login here</Link>
              </small>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupForm;
