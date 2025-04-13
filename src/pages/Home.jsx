import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Container, ListGroup, Spinner, Alert, Button, Badge } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import NavBar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

/**
 * Home component that displays the user's list of tasks.
 * Allows task creation, navigation to task detail pages, and marking tasks as completed.
 *
 * @returns {JSX.Element} The home page with task list.
 */
const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  /**
   * Fetches all tasks from the API and updates the task state.
   * Shows an error alert if the request fails.
   */
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL || 'https://task-tracker-drf-e7e43a44f5b5.herokuapp.com/api/'}tasks/`,
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );
      setTasks(response.data);
    } catch (err) {
      setError('Failed to load tasks.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Runs once on component mount to fetch tasks and display any stored toast messages.
   */
  useEffect(() => {
    fetchTasks();
    const message = localStorage.getItem('toastMessage');
    if (message) {
      toast.success(message);
      localStorage.removeItem('toastMessage'); // so it only shows once
    }
  }, []);

  /**
   * Navigates the user to the Create Task form page.
   */
  const goToCreateTask = () => {
    navigate('/create-task');
  };

  /**
   * Sends a PATCH request to toggle a task's completed status.
   *
   * @param {number} taskId - The ID of the task to update.
   * @param {boolean} isCompleted - The new completion status.
   */
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
          <div className="row fw-bold px-3 py-2 d-none d-md-flex">
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
                    <div className="col-6 col-md-3">
                      <span className="fw-bold">{task.title}</span>
                    </div>

                    <div className="d-none d-md-block col-md-4">
                      <small>{task.description}</small>
                    </div>

                    <div className="d-none d-md-block col-md-2">
                      {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'N/A'}
                    </div>

                    <div className="col-3 col-md-2 text-end text-md-start">
                      {task.completed ? (
                        <Badge bg="success">Done</Badge>
                      ) : new Date(task.due_date) < new Date().setHours(0, 0, 0, 0) ? (
                        <Badge bg="danger">Overdue</Badge>
                      ) : (
                        <Badge bg="warning text-dark">Pending</Badge>
                      )}
                    </div>

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
