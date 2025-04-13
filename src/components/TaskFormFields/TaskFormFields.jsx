import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const TaskFormFields = ({ taskData, onChange, onSubmit, buttonLabel, error }) => (
  <Form onSubmit={onSubmit}>
    {error && <Alert variant="danger">{error}</Alert>}

    <Form.Group className="mb-3">
      <Form.Label>Title</Form.Label>
      <Form.Control
        type="text"
        name="title"
        value={taskData.title}
        onChange={onChange}
        required
      />
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label>Description</Form.Label>
      <Form.Control
        as="textarea"
        name="description"
        value={taskData.description}
        onChange={onChange}
      />
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label>Due Date</Form.Label>
      <Form.Control
        type="date"
        name="due_date"
        value={taskData.due_date || ''}
        onChange={onChange}
      />
    </Form.Group>

    <Form.Group className="mb-3">
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

export default TaskFormFields;
