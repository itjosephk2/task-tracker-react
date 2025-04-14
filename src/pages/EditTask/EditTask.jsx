import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import API_BASE_URL, { getAuthHeaders } from '../../api';
import NavBar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import TaskFormFields from '../../components/TaskFormFields/TaskFormFields';
import './EditTask.css'

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

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
