import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, ListGroup, Spinner, Alert, Button, Badge } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

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

  const goToCreateTask = () => {
    navigate('/create-task');
  };

  const markAsDone = async (taskId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL || 'https://task-tracker-drf-e7e43a44f5b5.herokuapp.com/api/'}tasks/${taskId}/`,
        { completed: true },
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      fetchTasks(); // Refresh tasks after update
    } catch (err) {
      alert('Failed to update task');
    }
  };

  return (
    <div className="page-wrapper">
      <NavBar />
      <div className="page-content">
        <Container className="mt-4 mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Your Tasks</h2>
            <Button variant="primary" onClick={goToCreateTask}>
              Create Task
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
                <ListGroup.Item key={task.id} className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>
                      <Link
                        to={`/tasks/${task.id}`}
                        className="text-decoration-none text-dark"
                      >
                        {task.title}
                      </Link>
                    </strong>{' '}
                    {task.completed && <Badge bg="success">Done</Badge>}
                    <br />
                    <small>{task.description}</small>
                  </div>
                  {!task.completed && (
                    <Button variant="success" size="sm" onClick={() => markAsDone(task.id)}>
                      Mark as Done
                    </Button>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
