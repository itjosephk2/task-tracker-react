import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Button,
  Spinner,
  Alert,
  Card,
  Modal,
  Row,
  Col,
  Badge
} from 'react-bootstrap';
import API_BASE_URL, { getAuthHeaders } from '../../api';
import NavBar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { ThemeContext } from '../../context/ThemeContext';
import './ViewTask.css';

const ViewTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}tasks/${id}/`, {
          headers: getAuthHeaders(),
        });
        setTask(response.data);
      } catch (err) {
        setError('Failed to fetch task details.');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleEdit = () => {
    navigate(`/tasks/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}tasks/${id}/`, {
        headers: getAuthHeaders(),
      });
      navigate('/home');
    } catch (err) {
      setError('Failed to delete the task.');
    }
  };

  const isOverdue =
    task && !task.completed && task.due_date && new Date(task.due_date) < new Date();

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <main className="flex-fill fade-in">
        <Container className={`mt-5 mb-5 ${darkMode ? 'dark-card' : ''}`}>
          {loading ? (
            <Spinner animation="border" />
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <Row className="justify-content-center">
              <Col xs={12} sm={10} md={8} lg={6}>
                <Button
                  variant="secondary"
                  size="sm"
                  className="mb-3"
                  onClick={() => navigate('/home')}
                >
                  ← Back to Tasks
                </Button>

                <Card className="fade-in mb-5">
                  <Card.Body className="px-2 px-md-3 px-lg-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <Card.Title className="mb-0">{task.title}</Card.Title>
                      <Badge
                        bg={
                          task.completed
                            ? 'success'
                            : isOverdue
                            ? 'danger'
                            : 'warning'
                        }
                        pill
                      >
                        {task.completed
                          ? 'Completed'
                          : isOverdue
                          ? 'Overdue'
                          : 'In Progress'}
                      </Badge>
                    </div>

                    <hr />

                    <Card.Text className="mb-3 scroll-box">
                      <strong>✏️ Description:</strong><br />
                      {task.description || 'No description provided.'}
                    </Card.Text>

                    <Card.Text className="mb-3">
                      <strong>📅 Due Date:</strong><br />
                      {task.due_date || 'Not set'}
                    </Card.Text>

                    <Card.Text className="mb-3">
                      <strong>📌 Status:</strong><br />
                      {task.completed
                        ? '✅ Done'
                        : isOverdue
                        ? '❗ Overdue'
                        : '⏳ Not Done'}
                    </Card.Text>

                    <div className="d-flex justify-content-end gap-3 mt-4">
                      <Button variant="primary" onClick={handleEdit}>Edit</Button>
                      <Button variant="danger" onClick={() => setShowConfirm(true)}>Delete</Button>
                    </div>
                  </Card.Body>
                </Card>

                <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirm(false)}>
                      Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                      Delete
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Col>
            </Row>
          )}
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default ViewTask;
