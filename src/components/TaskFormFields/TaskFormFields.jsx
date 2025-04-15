/**
 * TaskFormFields Component
 *
 * Reusable form component for creating or editing tasks.
 * Includes fields for title, description, due date, and completion status.
 * Supports light and dark theme styling based on ThemeContext.
 */

import React, { useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { ThemeContext } from '../../context/ThemeContext';
import './TaskFormFields.css';

/**
 * @component
 * @param {Object} props
 * @param {{ title: string, description: string, due_date: string, completed: boolean }} props.taskData - Task form data
 * @param {Function} props.onChange - Callback to handle input changes
 * @param {Function} props.onSubmit - Callback for form submission
 * @param {string} props.buttonLabel - Label for the submit button (e.g., "Add Task", "Save Changes")
 * @param {string|null} [props.error] - Optional error message to display
 * @returns {JSX.Element}
 */
const TaskFormFields = ({ taskData, onChange, onSubmit, buttonLabel, error }) => {
  // Access the current theme from context
  const { darkMode } = useContext(ThemeContext);

  return (
    <Form onSubmit={onSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Title Input */}
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

      {/* Description Textarea */}
      <Form.Group className={`mb-3 ${darkMode ? 'dark-input' : ''}`}>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={taskData.description}
          onChange={onChange}
        />
      </Form.Group>

      {/* Due Date Picker */}
      <Form.Group className={`mb-3 ${darkMode ? 'dark-input' : ''}`}>
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="date"
          name="due_date"
          value={taskData.due_date || ''}
          onChange={onChange}
        />
      </Form.Group>

      {/* Completed Checkbox */}
      <Form.Group className={`mb-3 ${darkMode ? 'dark-input' : ''}`}>
        <Form.Check
          type="checkbox"
          label="Completed"
          name="completed"
          checked={taskData.completed}
          onChange={onChange}
        />
      </Form.Group>

      {/* Submit Button */}
      <Button type="submit" variant="primary" className="w-100">
        {buttonLabel}
      </Button>
    </Form>
  );
};

export default TaskFormFields;
