import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, ListGroup, Spinner, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL || 'https://task-tracker-drf-e7e43a44f5b5.herokuapp.com/api/'}tasks/`, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      setTasks(response.data);
    } catch (err) {
      setError('Failed to load tasks.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Your Tasks</h2>
        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ListGroup>
          {tasks.map((task) => (
            <ListGroup.Item key={task.id}>
              <strong>{task.title}</strong><br />
              <small>{task.description}</small>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default Home;
