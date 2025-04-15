/**
 * EditTask Component
 *
 * Allows users to edit an existing task. Fetches the task by ID on mount,
 * displays a form with pre-filled values, and submits updates via PUT request.
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import API_BASE_URL, { getAuthHeaders } from '../../api';
import NavBar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import TaskFormFields from '../../components/TaskFormFields/TaskFormFields';
import './EditTask.css';

const EditTask = () => {
  // Extract task ID from URL parameters
  const { id } = useParams();

  // React Router navigation function
  const navigate = useNavigate();

  /**
   * @typedef {Object} Task
   * @property {string} title - Title of the task
   * @property {string} description - Description of the task
   * @property {string} due_date - Due date of the task
   * @property {boolean} completed - Completion status of the task
   */

  /** @type {[Task, Function]} */
  const [task, setTask] = useState({
    title: '',
    description: '',
    due_date: '',
    completed: false,
  });

  /** @type {[string|null, Function]} Error message state */
  const [error, setError] = useState(null);

  /**
   * Fetch the task details on component mount
   */
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}tasks/${id}/`, {
          headers: getAuthHeaders(),
        });
        setTask(response.data);
      } catch (err) {
        setError('Failed to load task');
      }
    };

    fetchTask();
  }, [id]);

  /**
   * Handle input changes in the form
   * @param {React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>} e - Input event
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  /**
   * Handle form submission to update the task
   * @param {React.FormEvent<HTMLFormElement>} e - Form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}tasks/${id}/`, task, {
        headers: getAuthHeaders(),
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
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6}>
              <h3 className="mb-4 text-center">Edit Task</h3>
              <TaskFormFields
                taskData={task}
                onChange={handleChange}
                onSubmit={handleSubmit}
                buttonLabel="Save Changes"
                error={error}
              />
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default EditTask;
