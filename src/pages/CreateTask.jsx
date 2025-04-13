import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import API_BASE_URL, { getAuthHeaders } from '../api';
import axios from 'axios';
import NavBar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import TaskFormFields from '../components/TaskFormFields/TaskFormFields';
import { toast } from 'react-toastify';

const CreateTask = ({ onTaskCreated }) => {
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
      const response = await axios.post(`${API_BASE_URL}tasks/`, formData, {
        headers: getAuthHeaders(),
      });
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
