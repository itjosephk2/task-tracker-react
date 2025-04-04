import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Button, Spinner, Alert, Card, Modal } from 'react-bootstrap';
import API_BASE_URL, { getAuthHeaders } from '../api';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer'; // Make sure the path is correct

const ViewTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const handleBack = () => {
    navigate('/home');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <main className="flex-fill">
        <Container className="mt-5 mb-5">
          {loading ? (
            <Spinner animation="border" />
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <>
              <Card>
                <Card.Body>
                  <Card.Title>{task.title}</Card.Title>
                  <Card.Text>
                    <strong>Description:</strong> {task.description || 'None'}<br />
                    <strong>Due Date:</strong> {task.due_date || 'None'}<br />
                    <strong>Completed:</strong> {task.completed ? 'Yes' : 'No'}
                  </Card.Text>
                  <div className="d-flex flex-wrap gap-2">
                    <Button variant="secondary" onClick={handleBack}>Back</Button>
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
            </>
          )}
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default ViewTask;
