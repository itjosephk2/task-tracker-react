import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import API_BASE_URL, { getAuthHeaders } from '../api';
import axios from 'axios';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

const TaskForm = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: '',
    completed: false,
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        `${API_BASE_URL}tasks/`,
        formData,
        { headers: getAuthHeaders() }
      );
      setFormData({
        title: '',
        description: '',
        due_date: '',
        completed: false,
      });
      if (onTaskCreated) onTaskCreated(response.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError('Failed to create task');
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <main className="flex-fill">
        <Container className="mt-5 mb-5">
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6}>
              <h3 className="mb-4 text-center">Create Task</h3>
              <Form onSubmit={handleSubmit}>
                {error && <Alert variant="danger">{error}</Alert>}

                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="due_date"
                    value={formData.due_date}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Completed"
                    name="completed"
                    checked={formData.completed}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100">
                  Add Task
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default TaskForm;
