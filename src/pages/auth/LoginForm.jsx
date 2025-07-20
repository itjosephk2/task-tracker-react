import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { login } from '../../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import NavBar from '../../components/Navbar/Navbar';

/**
 * LoginForm component that allows users to log into the application.
 * On successful login, stores the auth token in localStorage and redirects to /home.
 *
 * @returns {JSX.Element} The login form UI.
 */
const LoginForm = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  /**
   * Handles input changes in the login form.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /**
   * Submits the login form and authenticates the user via the API.
   * If successful, stores token and shows a toast message before redirecting.
   *
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(formData);
      const token = data.token;

      localStorage.setItem('token', token);
      localStorage.setItem('toastMessage', '🎉 Welcome back!');

      console.log('Logged in!');
      navigate('/home');
    } catch (err) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <NavBar />
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h2 className="mb-4">Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="loginUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="loginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mb-3">
                Log In
              </Button>

              <div className="text-center">
                <small>
                  Don’t have an account? <Link to="/signup">Sign up here</Link>
                </small>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginForm;
