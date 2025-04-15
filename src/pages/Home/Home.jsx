import React, { useEffect, useState, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Container, ListGroup, Spinner, Alert, Button, Badge } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import NavBar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './Home.css';

/**
 * Home component that displays the user's list of tasks.
 * Supports sorting by columns, marking tasks as done, and navigation to create/view pages.
 *
 * @component
 * @returns {JSX.Element} Rendered Home page
 */
const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'due_date', direction: 'asc' });
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);

  /**
   * Fetches all tasks from the API and updates the task list.
   * Displays error if loading fails.
   *
   * @async
   * @function
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
   * Loads tasks and any toast messages on initial render.
   */
  useEffect(() => {
    fetchTasks();
    const message = localStorage.getItem('toastMessage');
    if (message) {
      toast.success(message);
      localStorage.removeItem('toastMessage');
    }
  }, []);

  /**
   * Navigates the user to the create task form.
   */
  const goToCreateTask = () => {
    navigate('/create-task');
  };

  /**
   * Sends PATCH request to update task completion status.
   *
   * @param {number} taskId - Task ID
   * @param {boolean} isCompleted - New completion status
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

  /**
   * Updates sort configuration based on clicked column.
   *
   * @param {string} key - Field to sort by
   */
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  /**
   * Derives a user-facing status label from task properties.
   *
   * @param {Object} task - Task object
   * @returns {string} Status label
   */
  const getStatusLabel = (task) => {
    if (task.completed) return 'Done';
    const dueDate = new Date(task.due_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dueDate < today ? 'Overdue' : 'Incomplete';
  };

  /**
   * Returns tasks sorted by the active sort configuration.
   *
   * @type {Array}
   */
  const sortedTasks = [...tasks].sort((a, b) => {
    let aVal = a[sortConfig.key];
    let bVal = b[sortConfig.key];

    if (sortConfig.key === 'completed') {
      aVal = getStatusLabel(a);
      bVal = getStatusLabel(b);
    }

    if (aVal == null) return 1;
    if (bVal == null) return -1;

    if (sortConfig.key.includes('date')) {
      return sortConfig.direction === 'asc'
        ? new Date(aVal) - new Date(bVal)
        : new Date(bVal) - new Date(aVal);
    }

    if (typeof aVal === 'string') {
      return sortConfig.direction === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
  });

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

          {/* Column Headers */}
          <div className="row fw-bold px-3 py-2 d-none d-md-flex">
            <div
              className="col-md-3"
              style={{ cursor: 'pointer' }}
              onClick={() => handleSort('title')}
            >
              Title {sortConfig.key === 'title' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </div>
            <div
              className="col-md-4"
              style={{ cursor: 'pointer' }}
              onClick={() => handleSort('description')}
            >
              Description {sortConfig.key === 'description' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </div>
            <div
              className="col-md-2"
              style={{ cursor: 'pointer' }}
              onClick={() => handleSort('due_date')}
            >
              Due Date {sortConfig.key === 'due_date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </div>
            <div
              className="col-md-2"
              style={{ cursor: 'pointer' }}
              onClick={() => handleSort('completed')}
            >
              Status {sortConfig.key === 'completed' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </div>
            <div className="col-md-1 text-end pe-4">Done</div>
          </div>

          {/* Task List */}
          {loading ? (
            <Spinner animation="border" />
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : tasks.length === 0 ? (
            <p>No tasks found.</p>
          ) : (
            <ListGroup>
              {sortedTasks.map((task) => (
                <ListGroup.Item
                  key={task.id}
                  as={Link}
                  to={`/tasks/${task.id}`}
                  className={`px-3 py-2 list-group-item-action text-decoration-none d-block task-box ${
                    darkMode ? 'task-box-dark' : 'task-box-light'
                  }`}
                >
                  <div className="row align-items-center text-wrap">
                    <div className="col-6 col-md-3">
                      <span className="fw-bold">{task.title}</span>
                    </div>

                    <div className="d-none d-md-block col-md-4">
                      <small className="task-description-preview">{task.description}</small>
                    </div>

                    <div className="d-none d-md-block col-md-2">
                      {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'N/A'}
                    </div>

                    <div className="col-3 col-md-2 text-end text-md-start">
                      <Badge bg={
                        task.completed
                          ? 'success'
                          : new Date(task.due_date) < new Date().setHours(0, 0, 0, 0)
                          ? 'danger'
                          : 'warning text-dark'
                      }>
                        {getStatusLabel(task)}
                      </Badge>
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
