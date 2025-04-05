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
      <main className="page-content">
        <Container className="mt-4 mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Your Tasks</h2>
            <Button variant="primary" onClick={goToCreateTask}>
              Create Task
            </Button>
          </div>
          <div className="row fw-bold px-3 py-2 border-bottom">
            <div className="col-md-3">Title</div>
            <div className="col-md-3">Description</div>
            <div className="col-md-2">Due Date</div>
            <div className="col-md-2">Status</div>
            <div className="col-md-2 text-end">Action</div>
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
              <ListGroup.Item
                key={task.id}
                as={Link}
                to={`/tasks/${task.id}`}
                className="px-3 py-2 list-group-item-action text-dark text-decoration-none d-block"
              >
            
                <div className="row align-items-center text-wrap">
                  <div className="col-md-3">
                    <span className="fw-bold">{task.title}</span>
                  </div>
                  <div className="col-md-3">
                    <small>{task.description}</small>
                  </div>
                  <div className="col-md-2">
                    {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'N/A'}
                  </div>
                  <div className="col-md-2">
                    {task.completed ? (
                      <Badge bg="success">Done</Badge>
                    ) : (
                      new Date(task.due_date) < new Date().setHours(0, 0, 0, 0) ? (
                        <Badge bg="danger">Overdue</Badge>
                      ) : (
                        <Badge bg="warning text-dark">Pending</Badge>
                      )
                    )}
                  </div>
                  <div className="col-md-2 text-end">
                    {!task.completed && (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          markAsDone(task.id);
                        }}
                      >
                        Mark as Done
                      </Button>
                    )}
                  </div>
                </div>
              </ListGroup.Item>
              ))}
          </ListGroup>
          )}
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
