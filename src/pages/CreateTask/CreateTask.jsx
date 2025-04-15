/**
 * CreateTask Component
 *
 * Renders a form for creating a new task. Sends a POST request to the API
 * and displays success or error messages based on the response.
 * Optionally calls a callback (`onTaskCreated`) after successful task creation.
 */

import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import API_BASE_URL, { getAuthHeaders } from '../../api';
import axios from 'axios';
import NavBar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import TaskFormFields from '../../components/TaskFormFields/TaskFormFields';
import { toast } from 'react-toastify';

/**
 * @component
 * @param {Object} props
 * @param {Function} [props.onTaskCreated] - Optional callback triggered after task is successfully created
 */
const CreateTask = ({ onTaskCreated }) => {
  /**
   * @typedef {Object} FormData
   * @property {string} title - Title of the task
   * @property {string} description - Description of the task
   * @property {string} due_date - Due date of the task
   * @property {boolean} completed - Completion status of the task
   */

  /** @type {[FormData, Function]} */
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: '',
    completed: false,
  });

  /** @type {[string|null, Function]} */
  const [error, setError] = useState(null);

  /**
   * Handles input field changes in the form
   * @param {React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>} e - Input event
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  /**
   * Submits the form data to the API to create a new task
   * @param {React.FormEvent<HTMLFormElement>} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}tasks/`, formData, {
        headers: getAuthHeaders(),
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        due_date: '',
        completed: false,
      });

      toast.success('Task created successfully!');
      if (onTaskCreated) onTaskCreated(response.data);
    } catch (err) {
      setError('Failed to create task');
      toast.error('Failed to create the task.');
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
              <TaskFormFields
                taskData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                buttonLabel="Add Task"
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

export default CreateTask;
