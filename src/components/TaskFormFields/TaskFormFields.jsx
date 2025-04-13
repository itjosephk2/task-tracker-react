import React, { useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { ThemeContext } from '../../context/ThemeContext';
import './TaskFormFields.css';

const TaskFormFields = ({ taskData, onChange, onSubmit, buttonLabel, error }) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <Form onSubmit={onSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group className={`mb-3 ${darkMode ? 'dark-input' : ''}`}>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={taskData.title}
          onChange={onChange}
          required
        />
      </Form.Group>

      <Form.Group className={`mb-3 ${darkMode ? 'dark-input' : ''}`}>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={taskData.description}
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group className={`mb-3 ${darkMode ? 'dark-input' : ''}`}>
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="date"
          name="due_date"
          value={taskData.due_date || ''}
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group className={`mb-3 ${darkMode ? 'dark-input' : ''}`}>
        <Form.Check
          type="checkbox"
          label="Completed"
          name="completed"
          checked={taskData.completed}
          onChange={onChange}
        />
      </Form.Group>

      <Button type="submit" variant="primary" className="w-100">
        {buttonLabel}
      </Button>
    </Form>
  );
};

export default TaskFormFields;
