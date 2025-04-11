// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import Home from './components/Home';
import TaskForm from './components/TaskForms';
import ViewTask from './components/ViewTask';
import EditTask from './components/EditTask';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-task"
          element={
            <ProtectedRoute>
              <TaskForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks/:id"
          element={
            <ProtectedRoute>
              <ViewTask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks/:id/edit"
          element={
            <ProtectedRoute>
              <EditTask />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </Router>
  );
}

export default App;
