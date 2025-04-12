import React from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

/**
 * LandingPage component that serves as the homepage of the app.
 * Introduces users to the Task Tracker with a welcome message, feature highlights,
 * and a call-to-action button that navigates to the main app.
 *
 * @returns {JSX.Element} The landing page content.
 */
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column min-vh-100 bg-light text-dark">
      <NavBar />
      <main className="flex-fill">
        <Container className="py-5">
          <Row className="justify-content-center text-center mb-4">
            <Col md={8}>
              <h1 className="display-4 fw-bold">Welcome to Task Tracker</h1>
              <p className="lead mt-3">
                A simple and efficient to-do list app that helps you stay organized and focused.
              </p>
              <Button variant="primary" size="lg" className="mt-3" onClick={() => navigate('/home')}>
                Go to App
              </Button>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col md={10}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h3 className="mb-3">Features</h3>
                  <ul className="text-start">
                    <li>Create, edit, and delete tasks</li>
                    <li>Mark tasks as completed</li>
                    <li>Set due dates to stay on track</li>
                    <li>Get dynamic feedback based on your due date</li>
                    <li>Secure login/logout system</li>
                    <li>Responsive design for mobile and desktop</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-5 text-center">
            <Col>
              <p className="text-muted">
                Built with React and Django REST Framework as part of the Code Institute Full-Stack Diploma.
              </p>
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
