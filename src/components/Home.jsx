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

    const markAsCompleted = async (taskId, isCompleted) => {
      const token = localStorage.getItem('token');
      try {
        await axios.patch(
          `${process.env.REACT_APP_API_BASE_URL || 'https://task-tracker-drf-e7e43a44f5b5.herokuapp.com/api/'}tasks/${taskId}/`,
          { completed: isCompleted },
          {
            headers: {
              Authorization: `Token ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        fetchTasks(); // Refresh tasks after toggle
      } catch (err) {
        alert('Failed to update task status');
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
            <div className="row fw-bold px-3 py-2 border-bottom d-none d-md-flex">
              <div className="col-md-3">Title</div>
              <div className="col-md-4">Description</div>
              <div className="col-md-2">Due Date</div>
              <div className="col-md-2">Status</div>
              <div className="col-md-1 text-end pe-4">Done</div>
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
                  {/* Title - always visible */}
                  <div className="col-6 col-md-3">
                    <span className="fw-bold">{task.title}</span>
                  </div>
              
                  {/* Description - hide on mobile */}
                  <div className="d-none d-md-block col-md-4">
                    <small>{task.description}</small>
                  </div>
              
                  {/* Due Date - hide on mobile */}
                  <div className="d-none d-md-block col-md-2">
                    {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'N/A'}
                  </div>
              
                  {/* Status - always visible */}
                  <div className="col-3 col-md-2 text-end text-md-start">
                    {task.completed ? (
                      <Badge bg="success">Done</Badge>
                    ) : new Date(task.due_date) < new Date().setHours(0, 0, 0, 0) ? (
                      <Badge bg="danger">Overdue</Badge>
                    ) : (
                      <Badge bg="warning text-dark">Pending</Badge>
                    )}
                  </div>
              
                  {/* Checkbox - always visible */}
                  <div className="col-3 col-md-1 text-end">
                    <div className="form-check d-flex justify-content-end align-items-center pe-2">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={task.completed}
                        style={{ transform: 'scale(1.5)' }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onChange={(e) => {
                          markAsCompleted(task.id, e.target.checked);
                        }}
                      />
                    </div>
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
