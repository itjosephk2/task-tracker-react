import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import API_BASE_URL, { getAuthHeaders } from '../api';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

/**
 * EditTask component allows users to edit an existing task.
 * Fetches the task data by ID, populates the form, and allows updates.
 *
 * @returns {JSX.Element} The edit task form UI.
 */
const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '',
    description: '',
    due_date: '',
    completed: false
  });
  const [error, setError] = useState(null);

  /**
   * Fetches task data by ID from the API when the component mounts.
   */
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}tasks/${id}/`, {
          headers: getAuthHeaders()
        });
        setTask(response.data);
      } catch (err) {
        setError('Failed to load task');
      }
    };

    fetchTask();
  }, [id]);

  /**
   * Handles input changes in the form, updating the task state.
   *
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - The input change event.
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  /**
   * Submits the updated task to the API and navigates back to the task view page.
   *
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}tasks/${id}/`, task, {
        headers: getAuthHeaders()
      });
      navigate(`/tasks/${id}`);
    } catch (err) {
      setError('Failed to update task');
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <main className="flex-fill">
        <Container className="mt-5 mb-5">
          <h2>Edit Task</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={task.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={task.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                name="due_date"
                value={task.due_date || ''}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Completed"
                name="completed"
                checked={task.completed}
                onChange={handleChange}
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Form>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default EditTask;
